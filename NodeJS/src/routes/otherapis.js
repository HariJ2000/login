const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.post('/checktoken',controllers.apis.checktoken)

module.exports = router