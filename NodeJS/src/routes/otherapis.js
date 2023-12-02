const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const { authenticateRequest } = require('../controllers/auth.controller')

router.post('/getdata',authenticateRequest,controllers.apis.getdata)

module.exports = router