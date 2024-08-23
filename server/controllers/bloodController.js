const Blood = require('../models/blood');

// Controller to add blood to inventory
const addBloodToInventoryController = async (req, res) => {
  const { bloodType, quantity, expiryDate } = req.body;

  // Validate the input
  if (!bloodType || !quantity || !expiryDate) {
    return res.status(400).json({
      success: false,
      message: 'All fields (bloodType, quantity, expiryDate) are required',
    });
  }

  try {
    // Create a new blood entry
    const blood = new Blood({
      bloodType,
      quantity,
      expiryDate,
    });

    // Save the blood entry to the database
    await blood.save();

    return res.status(201).json({
      success: true,
      message: 'Blood added to inventory successfully',
      blood,
    });
  } catch (error) {
    console.error('Error adding blood to inventory:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Controller to get all blood records
const getAllBloodRecordsController = async (req, res) => {
  try {
    // Fetch all blood records from the database
    const bloodRecords = await Blood.find();

    return res.status(200).json({
      success: true,
      bloodRecords,
    });
  } catch (error) {
    console.error('Error fetching blood records:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Controller to get a blood record by ID
const getBloodByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the blood record by ID
    const bloodRecord = await Blood.findById(id);

    if (!bloodRecord) {
      return res.status(404).json({
        success: false,
        message: 'Blood record not found',
      });
    }

    return res.status(200).json({
      success: true,
      bloodRecord,
    });
  } catch (error) {
    console.error('Error fetching blood record:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Controller to update a blood record
const updateBloodRecordController = async (req, res) => {
  const { id } = req.params;
  const { bloodType, quantity, expiryDate } = req.body;

  try {
    // Validate input
    if (!bloodType || !quantity || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields (bloodType, quantity, expiryDate) are required',
      });
    }

    // Find and update the blood record
    const bloodRecord = await Blood.findByIdAndUpdate(id, {
      bloodType,
      quantity,
      expiryDate,
    }, { new: true });

    if (!bloodRecord) {
      return res.status(404).json({
        success: false,
        message: 'Blood record not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blood record updated successfully',
      bloodRecord,
    });
  } catch (error) {
    console.error('Error updating blood record:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Controller to delete a blood record
const deleteBloodRecordController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the blood record by ID
    const result = await Blood.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Blood record not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Blood record deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blood record:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  addBloodToInventoryController,
  getAllBloodRecordsController,
  getBloodByIdController,
  updateBloodRecordController,
  deleteBloodRecordController,
};
