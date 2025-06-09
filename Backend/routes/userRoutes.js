const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Signup
router.post('/signup', userController.signupUser );

// Login
router.post('/login', userController.loginUser );

// Refresh Token Endpoint
router.get('/refresh-token', userController.getRefreshToken );

// Logout
router.post('/logout', userController.logoutUser );

router.get('/all-users', userController.getAllUsers);

router.delete('/delete/:id', userController.deleteUser);


module.exports = router;