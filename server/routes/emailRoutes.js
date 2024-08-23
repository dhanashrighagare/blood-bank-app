// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const sendMail = require('../controllers/sendMail');

// Define route for sending email
router.post('/email', sendMail);

module.exports = router;
