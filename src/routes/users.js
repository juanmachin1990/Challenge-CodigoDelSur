const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.js')


router.post('/login', function (req, res) {
  userController.login(req, res)
})

router.post('/register', function (req, res) {
  userController.register(req, res)
})



module.exports = router