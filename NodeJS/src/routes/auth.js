const express = require('express')
const authRouter = express.Router()

const loginRequestHandler = () => {

}

authRouter.use('/login',loginRequestHandler)

module.exports = authRouter