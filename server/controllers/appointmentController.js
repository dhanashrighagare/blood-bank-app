const Appointment = require("../models/appointmentModel"); 

// Create an appointment
const createAppointmentController = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    return res.status(201).json({
      success: true,
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all appointments
const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Retrieve all appointments from the database
    return res.status(200).json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get appointments by user ID
const getAppointmentsByUserIdController = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.params.userId });
    return res.status(200).json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

  const updateAppointmentController = async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const { date, time, notes, status } = req.body;
  
      // Find the appointment by ID and update it with the new data
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { date, time, notes, status },
        { new: true, runValidators: true }
      );
  
      if (!appointment) {
        return res.status(404).send({
          success: false,
          message: "Appointment not found",
        });
      }
  
      return res.status(200).send({
        success: true,
        message: "Appointment updated successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error updating appointment:", error);
      return res.status(500).send({
        success: false,
        message: "Error updating appointment",
        error: error.message,
      });
    }
  };

  // Delete an appointment by ID
const deleteAppointmentController = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find the appointment by ID and delete it
    const appointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

  
  
module.exports = { createAppointmentController, getAllAppointmentsController, getAppointmentsByUserIdController, updateAppointmentController, deleteAppointmentController };

