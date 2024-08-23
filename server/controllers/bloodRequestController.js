const BloodRequest = require("../models/bloodRequestModel");
const User = require("../models/userModel");

// Controller to create a new blood request
const createBloodRequestController = async (req, res) => {
  try {
    const { requesterName, bloodGroup, quantity, notes } = req.body;

    // Validate the input
    if (!requesterName || !bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Requester name, blood group, and quantity are required",
      });
    }

    // Find the user by name
    const user = await User.findOne({ name: requesterName });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Create a new blood request
    const newBloodRequest = new BloodRequest({
      requester: user._id, // Use the user's ID
      bloodGroup,
      quantity,
      notes,
    });

    // Save the request to the database
    await newBloodRequest.save();
   
    return res.status(201).json({
      success: true,
      message: "Blood request created successfully",
      bloodRequest: newBloodRequest,
    });
  } catch (error) {
    console.error("Error creating blood request: ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating blood request",
      error: error.message,
    });
  }
};

//Get blood req by id
const getBloodRequestByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const bloodRequest = await BloodRequest.findById(id).populate('requester', 'name');
    if (!bloodRequest) {
      return res.status(404).json({ success: false, message: 'Blood request not found' });
    }
    res.status(200).json({ success: true, bloodRequest });
  } catch (error) {
    console.error('Error fetching blood request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Controller to get all blood requests
const getBloodRequestsController = async (req, res) => {
  try {
    // Fetch all blood requests from the database without the 'requester' field
    const bloodRequests = await BloodRequest.find({}, 'bloodGroup quantity notes createdAt') // Exclude 'requester'
      .exec();
    
    res.status(200).json({
      success: true,
      bloodRequests,
    });
  } catch (error) {
    console.error('Error fetching blood requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blood requests.',
      error: error.message,
    });
  }
};

  // Controller to update a blood request
  const updateBloodRequestController = async (req, res) => {
    try {
      const { id } = req.params;  // Blood request ID from the route
      const { bloodGroup, quantity, notes, status } = req.body; // Fields to update
  
      // Find the blood request by ID
      const bloodRequest = await BloodRequest.findById(id);
      
      if (!bloodRequest) {
        return res.status(404).send({
          success: false,
          message: "Blood request not found",
        });
      }
  
      // Update the blood request fields
      if (bloodGroup) bloodRequest.bloodGroup = bloodGroup;
      if (quantity) bloodRequest.quantity = quantity;
      if (notes) bloodRequest.notes = notes;
      if (status) bloodRequest.status = status;
  
      // Save the updated blood request
      await bloodRequest.save();
  
      return res.status(200).send({
        success: true,
        message: "Blood request updated successfully",
        bloodRequest,
      });
    } catch (error) {
      console.error("Error updating blood request: ", error);
      return res.status(500).send({
        success: false,
        message: "Error updating blood request",
        error: error.message,
      });
    }
  };

 // Controller to delete a blood request
const deleteBloodRequestController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the blood request by ID
    const result = await BloodRequest.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Blood request not found' });
    }

    res.status(200).json({ success: true, message: 'Blood request deleted successfully' });
  } catch (error) {
    console.error('Error deleting blood request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { createBloodRequestController, getBloodRequestByIdController,
    getBloodRequestsController, updateBloodRequestController,deleteBloodRequestController
 };