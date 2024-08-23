const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require('../controllers/sendMail');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');

const registerController = async (req, res) => {
    try {
      const { email, password, role, name, organisationName, hospitalName, address, phone } = req.body;
  
      // Validate role
      const validRoles = ["Admin", "Donor", "Hospital", "Organization"];
      if (!validRoles.includes(role)) {
        return res.status(400).send({
          success: false,
          message: "Invalid role",
        });
      }
  
      // Ensure required fields are provided based on the role
      if (!email || !password || !role || !address || !phone) {
        return res.status(400).send({
          success: false,
          message: "Email, password, role, address, and phone are required",
        });
      }
  
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create user data based on role
      const userData = {
        email,
        password: hashedPassword,
        role,
        address,
        phone
      };
  
      if (role === "Admin") {
        userData.name = name;
      } else if (role === "Organization") {
        userData.organisationName = organisationName;
      } else if (role === "Hospital") {
        userData.hospitalName = hospitalName;
      } else if (role === "Donor") {
        userData.name = name;
      }
  
      // Create and save the new user
      const user = new userModel(userData);
      await user.save();
  
      return res.status(201).send({
        success: true,
        message: `${role} registered successfully`,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Register API",
        error,
      });
    }
};
  

const loginController = async (req, res) => {
  try {
    // Validate input
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing email, password, or role in request",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check role
    if (user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Role doesn't match",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

     // Set token in cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === 'production', // Send over HTTPS in production
      sameSite: 'Strict', // Prevent CSRF
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error in loginController:', error);
    return res.status(500).json({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};


//GET CURRENT USER PROFILE
const currentUserController = async (req, res) => {
  try {
    console.log('User ID from request:', req.userId); // Log user ID for debugging
    const user = await userModel.findById(req.userId); // Use findById to query by ID

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log('Error fetching user:', error); // Log errors for debugging
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};


//Update User Profile
const updateUserController = async (req, res) => {
    try {
      const userId = req.body.userId;
      const updatedData = req.body;
  
      // Find the user by ID and update with new data
      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in updating user profile",
        error,
      });
    }
};

// DELETE USER
const deleteUserController = async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Find and delete the user by ID
      const deletedUser = await userModel.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error in deleting user",
        error,
      });
    }
  };

  // Controller for handling password reset request
  const requestPasswordResetController = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email) {
            console.log('No email provided');
            return res.status(400).json({
                success: false,
                message: 'Email is required',
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Set the reset token and its expiration on the user
        user.passwordResetToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dhanashrighagare12@gmail.com',
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        // Define mail options
        const mailOptions = {
            from: 'dhanashrighagare12@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you (or someone else) has requested a password reset. Please make a PUT request to:\n\n${req.protocol}://${req.get('host')}/api/v1/auth/reset-password?token=${resetToken}`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: ' + info.response);

        res.status(200).json({
            success: true, 
            message: 'Password reset link sent to email',
        });
    } catch (error) {
        console.error('Error requesting password reset:', error);

        // Check if 'res' is defined before using it
        if (res) {
            res.status(500).json({
                success: false,
                message: 'Error requesting password reset',
                error: error.message,
            });
        } else {
            console.error('Response object is undefined');
        }
    }
};

  // Controller for handling password reset
  const resetPasswordController = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      if (!token || !newPassword) {
        return res.status(400).send({
          success: false,
          message: 'Token and new password are required',
        });
      }
  
      // Find the user with the provided token and check if the token is still valid
      const user = await User.findOne({
        passwordResetToken: token,
      });

      // If user not found or token is invalid/expired
      if (!user) {
        console.log('User not found or token has expired');
        return res.status(400).send({
          success: false,
          message: 'Password reset token is invalid or has expired',
        });
      }
  
      // Hash the new password and update the user document
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      
      // Clear the reset token and expiration
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
  
      // Save the updated user document
      await user.save();
  
      // Send success response
      return res.status(200).send({
        success: true,
        message: 'Password has been reset successfully',
      });
  
    } catch (error) {
      console.error('Error resetting password:', error);
      return res.status(500).send({
        success: false,
        message: 'Error resetting password',
        error: error.message,
      });
    }
  };
  
  const logoutController = (req, res) => {
    try {
      // Clear the JWT cookie if it's stored in a cookie
      res.clearCookie('token'); // Adjust the cookie name if necessary
  
      res.status(200).send({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      console.error('Error in logoutController:', error);
      return res.status(500).send({
        success: false,
        message: 'Error in logout',
        error: error.message,
      });
    }
  };

module.exports = { 
    registerController, 
    loginController, 
    currentUserController, 
    updateUserController,
    deleteUserController,
    requestPasswordResetController,
    resetPasswordController,
    logoutController
};