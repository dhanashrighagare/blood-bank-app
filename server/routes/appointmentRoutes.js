const express = require("express");
const { createAppointmentController, getAppointmentsByUserIdController, updateAppointmentController, getAllAppointmentsController, deleteAppointmentController} = require("../controllers/appointmentController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Route to create an appointment
router.post("/create-appointment", authMiddelware, createAppointmentController);

// Route to get appointments by user ID
router.get('/user/:userId', authMiddelware, getAppointmentsByUserIdController);

// Route to update an appointment
router.put('/update/:appointmentId', authMiddelware, updateAppointmentController);

// Route to delete an appointment
router.delete('/:appointmentId', deleteAppointmentController);

// Route to get all appointments
router.get('/all', authMiddelware, getAllAppointmentsController);

module.exports = router;
