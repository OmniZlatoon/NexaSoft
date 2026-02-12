const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const userOTP= require('./user.verifyOTP')

router.get('/', userController.getUsers)
router.post('/VerifyOTP', userOTP.verifyOTP)// route to verify the OTP sent to the client

module.exports = router