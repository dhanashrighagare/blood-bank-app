const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Send notification
const sendNotification = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id; // Ensure req.user is populated

    if (!recipientId || !message) {
      return res.status(400).json({ success: false, message: 'Recipient ID and message are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
      return res.status(400).json({ success: false, message: 'Invalid recipient ID.' });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: 'Recipient not found.' });
    }

    const notification = new Notification({
      sender: senderId,
      recipient: recipientId,
      message,
    });

    await notification.save();

    res.status(201).json({ success: true, message: 'Notification sent successfully.', notification });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Error sending notification.', error: error.message });
  }
};

// Get notifications for a user
const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure req.user is populated

    const notifications = await Notification.find({ recipient: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    res.status(500).json({ success: false, message: 'Error retrieving notifications.', error: error.message });
  }
};

module.exports = { sendNotification, getNotifications };
