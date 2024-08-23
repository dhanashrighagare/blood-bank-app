const express = require('express');
const { getAllUsersController, updateUserRoleController, deleteUserByIdController, getAllDonorHistoriesController } = require('../controllers/userController');
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Route to get all users
router.get('/list', authMiddelware, getAllUsersController);

// Route to get all donor histories
router.get('/get-all-donor-histories', authMiddelware, getAllDonorHistoriesController);

// Route to update user role
router.put('/update-role/:userId', authMiddelware, updateUserRoleController);

// // Route to update a user by ID
// router.put('/update/:userId', authMiddelware, updateUserByIdController);

router.delete('/:userId', authMiddelware, deleteUserByIdController);

module.exports = router;
