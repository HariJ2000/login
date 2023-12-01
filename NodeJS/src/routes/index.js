const express = require('express')
const router = express.Router()
const authRouter = require('./auth')
const appRouter = require('./otherapis')

router.use('/auth',authRouter)

router.use('/contextpath',appRouter)

module.exports = router