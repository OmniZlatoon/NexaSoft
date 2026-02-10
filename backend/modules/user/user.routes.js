const express = require('express')
const router = express.Rounter()
const userController = require('./user.controller')

router.get('/', userController.getUsers)

module.exports = router