const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middlware');
const { route } = require('../app');

router.post('/register',[
    body('fullName.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastname').isLength({min: 3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
],
userController.loginUser);

router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

module.exports = router;

