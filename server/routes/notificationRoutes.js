// routes/notificationRoutes.js
const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Route to send a notification
router.post('/send', authMiddelware, sendNotification);

// Route to get notifications for the logged-in user
router.get('/get', authMiddelware, getNotifications);

module.exports = router;
