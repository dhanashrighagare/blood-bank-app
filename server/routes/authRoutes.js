const express = require("express");
const {
    registerController, 
    loginController, 
    currentUserController,
    updateUserController,
    deleteUserController,
    requestPasswordResetController,
    resetPasswordController,
    logoutController
} = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

//routes
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//LOGOUT || POST
router.post('/logout', logoutController);

//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController);

// Update User Profile || PUT
router.put("/update-profile", authMiddelware, updateUserController);

// Delete User Profile || Delete
router.delete("/delete-user", authMiddelware, deleteUserController);

// Route to request a password reset
router.post('/request-password-reset',   requestPasswordResetController);

// Route to reset password
router.post('/reset-password', resetPasswordController);

module.exports = router;
 