const User = require('../models/userModel');
const mongoose = require('mongoose');

const getAllUsersController = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().select('-password'); // Exclude password field

    return res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).send({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};


const updateUserRoleController = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
  
      // Validate role
      const validRoles = ['Admin', 'Donor', 'Hospital', 'Organization'];
      if (!role || !validRoles.includes(role)) {
        return res.status(400).send({
          success: false,
          message: `Role is required and must be one of ${validRoles.join(', ')}`,
        });
      }
  
      // Find and update user role
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true } // Return updated document and run validators
      );
  
      if (!updatedUser) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }
  
      return res.status(200).send({
        success: true,
        message: 'User role updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).send({
        success: false,
        message: 'Error updating user role',
        error: error.message,
      });
    }
  };
  
  const deleteUserByIdController = async (req, res) => {
    try {
      // Extract the userId from the request parameters
      const { userId } = req.params;
  
      // Validate that userId is provided and is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid user ID',
        });
      }
  
      // Find and delete the user
      const deletedUser = await User.findByIdAndDelete(userId);
  
      // Check if the user was found and deleted
      if (!deletedUser) {
        return res.status(404).send({
          success: false,
          message: 'User not found. Please check the ID and try again.',
        });
      }
  
      // Return success response
      return res.status(200).send({
        success: true,
        message: 'User deleted successfully',
        user: deletedUser,
      });
    } catch (error) {
      // Log the error and return a server error response
      console.error('Error deleting user:', error);
      return res.status(500).send({
        success: false,
        message: 'Error deleting user',
        error: error.message,
      });
    }
  };

  // Controller to update user by ID
  // const updateUserByIdController = async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const updateData = req.body;
  
  //     // Validate that userId is provided and is a valid MongoDB ObjectId
  //     if (!mongoose.isValidObjectId(userId)) {
  //       return res.status(400).send({
  //         success: false,
  //         message: 'Invalid user ID',
  //       });
  //     }
  
  //     // Find and update the user
  //     const updatedUser = await User.findByIdAndUpdate(
  //       userId,
  //       updateData,
  //       { new: true, runValidators: true } // Return updated document and run validators
  //     );
  
  //     if (!updatedUser) {
  //       return res.status(404).send({
  //         success: false,
  //         message: 'User not found',
  //       });
  //     }
  
  //     return res.status(200).send({
  //       success: true,
  //       message: 'User updated successfully',
  //       user: updatedUser,
  //     });
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     return res.status(500).send({
  //       success: false,
  //       message: 'Error updating user',
  //       error: error.message,
  //     });
  //   }
  // };
  

module.exports = { getAllUsersController, updateUserRoleController, deleteUserByIdController, updateUserByIdController };
