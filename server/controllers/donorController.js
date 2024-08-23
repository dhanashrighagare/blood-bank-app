const mongoose = require('mongoose');
const Donor = require('../models/donorModel');
const DonorHistory = require('../models/donorHistoryModel'); 


//add donor 
const addDonorController = async (req, res) => {
  try {
    const { name, address, phone, email } = req.body;

    // Validate input
    if (!name || !address || !phone) {
      return res.status(400).json({ message: 'Name, address, and phone are required' });
    }

    // Create a new donor
    const newDonor = new Donor({
      name,
      address,
      phone,
      email,
    });

    // Save the donor to the database
    await newDonor.save();

    // Respond with the newly created donor
    res.status(201).json({
      message: 'Donor added successfully',
      donor: newDonor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller function to get all donors
const getAllDonorsController = async (req, res) => {
  try {
    // Fetch all donors from the database
    const donors = await Donor.find();

    // Respond with the list of donors
    res.status(200).json({
      success: true,
      donors,
    });
  } catch (error) {
    // Handle any errors
    console.error('Error fetching donors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donors',
      error: error.message,
    });
  }
};


// Controller to get donor by ID
const getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).send({
        success: false,
        message: "Donor not found",
      });
    }
    res.status(200).send({
      success: true,
      donor,
    });
  } catch (error) {
    console.error("Error fetching donor: ", error);
    res.status(500).send({
      success: false,
      message: "Error fetching donor",
      error: error.message || error,
    });
  }
};


const updateDonorController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedDonor = await Donor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedDonor) {
      return res.status(404).send({
        success: false,
        message: "Donor not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Donor information updated successfully",
      donor: updatedDonor,
    });
  } catch (error) {
    console.error("Error updating donor: ", error);
    res.status(500).send({
      success: false,
      message: "Error updating donor information",
      error: error.message || error,
    });
  }
};

  //Delete Donor 
  const deleteDonorController = async (req, res) => {
    console.log("Received ID:", req.params.id); // Log the ID
    try {
      const donor = await Donor.findByIdAndDelete(req.params.id);
      if (!donor) {
        return res.status(404).send({
          success: false,
          message: "Donor not found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Donor deleted successfully",
      });
    } catch (error) {
      console.log("Error details: ", error);
      return res.status(500).send({
        success: false,
        message: "Error deleting donor",
        error: error.message || error,
      });
    }
  };  
  

// Controller to create donor history
const createDonorHistoryController = async (req, res) => {
  try {
    const { donor, donationDate, amount, notes } = req.body;

    if (!donor || !donationDate || !amount) {
      return res.status(400).send({
        success: false,
        message: 'Donor ID, donation date, and amount are required',
      });
    }

    // Ensure the donor ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(donor)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Donor ID format',
      });
    }

    const newHistory = new DonorHistory({
      donor: new mongoose.Types.ObjectId(donor),
      donationDate,
      amount,
      notes,
    });

    const savedHistory = await newHistory.save();

    return res.status(201).send({
      success: true,
      message: 'Donor history added successfully',
      history: savedHistory,
    });
  } catch (error) {
    console.error('Error creating donor history:', error);
    return res.status(500).send({
      success: false,
      message: 'Error creating donor history',
      error: error.message,
    });
  }
};

  //get donor all history
  const getAllDonorHistoriesController = async (req, res) => {
    try {
      const donorHistories = await DonorHistory.find().populate('donor');
      if (!donorHistories.length) {
        return res.status(404).json({ message: 'No donor histories found' });
      }
      res.status(200).json({ success: true, histories: donorHistories });
    } catch (error) {
      console.error('Error fetching all donor histories:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  };
  
  
  //get donor history by id 
  const getDonorHistoryByIdController = async (req, res) => {
    console.log('Received request with donorId:', req.params.donorId); // Add logging
    try {
      const { donorId } = req.params;
      const donorHistory = await DonorHistory.find({ donor: donorId }).populate('donor'); 
      if (!donorHistory.length) {
        return res.status(404).json({ message: 'Donor history not found' });
      }
      res.status(200).json({ history: donorHistory });
    } catch (error) {
      console.error('Error fetching donor history:', error);
      res.status(500).json({ message: 'Error fetching donor history', error: error.message });
    }
  };


// Update donor history by ID
const updateDonorHistoryByIdController = async (req, res) => {
  console.log('Received request with historyId:', req.params.historyId); // Add logging
  try {
    const { historyId } = req.params;
    const updateData = req.body; // Make sure to validate and sanitize this

    // Find and update the donor history
    const updatedHistory = await DonorHistory.findByIdAndUpdate(historyId, updateData, { new: true, runValidators: true });

    if (!updatedHistory) {
      return res.status(404).json({ message: 'Donor history not found' });
    }

    res.status(200).json({ message: 'Donor history updated successfully', history: updatedHistory });
  } catch (error) {
    console.error('Error updating donor history:', error);
    res.status(500).json({ message: 'Error updating donor history', error: error.message });
  }
};
  
  
// Controller function to delete a donor history by ID
const deleteDonorHistory = async (req, res) => {
  const { id } = req.params;
  
  try {
      // Find and delete the donor history by ID
      const donorHistory = await DonorHistory.findByIdAndDelete(id);
      
      // Check if donor history was found and deleted
      if (!donorHistory) {
          return res.status(404).json({
              success: false,
              message: 'Donor history not found'
          });
      }

      // Respond with success message
      return res.status(200).json({
          success: true,
          message: 'Donor history deleted successfully'
      });
  } catch (error) {
      console.error('Error deleting donor history:', error);
      return res.status(500).json({
          success: false,
          message: 'Error deleting donor history',
          error: error.message || error
      });
  }
};  

module.exports = { addDonorController, getAllDonorHistoriesController, getDonorById,  updateDonorController, getDonorHistoryByIdController,  deleteDonorController, createDonorHistoryController, deleteDonorHistory, getAllDonorsController, updateDonorHistoryByIdController};
