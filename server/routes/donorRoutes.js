const express = require("express");
const { addDonorController, getDonorsController, getDonorById, updateDonorController, getDonorHistoryByIdController, createDonorHistoryController, deleteDonorController, getAllDonorHistoriesController, updateDonorHistoryByIdController, deleteDonorHistory,  getAllDonorsController} = require("../controllers/donorController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Route to add a new donor
router.post('/add-donor', authMiddelware, addDonorController);

// Route to get all donors
router.get('/get-all-donors', getAllDonorsController);

// Route to get all donors histories
router.get("/get-all-donor-histories", authMiddelware, getAllDonorHistoriesController);

// Route to get a donor by ID
router.get('/get-donor/:id', getDonorById);

// Route to update donor information
router.put("/update-donor/:id", authMiddelware, updateDonorController);

// Route to create new donor history
router.post('/history', authMiddelware, createDonorHistoryController);

// Route to get donor history
router.get('/donor/history', authMiddelware, getAllDonorHistoriesController);

// Route to get donor history by ID
router.get('/history/:historyId', authMiddelware, getDonorHistoryByIdController);

// Route to update donor history by ID
router.put('/history/:historyId', authMiddelware, updateDonorHistoryByIdController);

// Route to delete a donor by ID
router.delete('/delete-donor/:id', authMiddelware, deleteDonorController);

// Route to delete a donor history by ID
router.delete('/delete-donor-history/:id', authMiddelware, deleteDonorHistory);

module.exports = router;
