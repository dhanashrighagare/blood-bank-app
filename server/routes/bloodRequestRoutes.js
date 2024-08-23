const express = require("express");
const { createBloodRequestController,
    getBloodRequestsController,
    updateBloodRequestController, deleteBloodRequestController, getBloodRequestByIdController
 } = require("../controllers/bloodRequestController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Route to create a new blood request
router.post("/create-blood-request", authMiddelware, createBloodRequestController);

// Route to get blood requests by id
router.get("/requests/:id", authMiddelware, getBloodRequestByIdController);

// Route to get all blood requests
router.get("/get-blood-requests", authMiddelware, getBloodRequestsController);

// Route to update a blood request
router.put("/update-blood-request/:id", authMiddelware, updateBloodRequestController);

// Route to delete a blood request
router.delete('/delete-blood-request/:id', authMiddelware, deleteBloodRequestController);


module.exports = router;
