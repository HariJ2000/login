const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

const loginRequestHandler = (req,res) => {
    console.log("loginRequestHandler",req.body);
    res.status(200).send({msg:'success'})
}

router.post('/login',controllers.auth.signin)

module.exports = router