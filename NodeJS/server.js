const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const secretKey = 'asjh'

const generateAccessToken = (props) => {
    const payload = {
        email: props.email,
        sub: props.sub,
        name: props.name
    }
    const options = {
        expiresIn: '30m'
    }
    console.log(jwt.sign(payload,secretKey,options));
    return jwt.sign(payload,secretKey,options)
}
const generateRefreshToken = (props) => {
    const payload = {
        email: props.email,
        sub: props.sub,
        name: props.name
    }
    const options = {
        expiresIn: '1d'
    }
    console.log(jwt.sign(payload,secretKey,options));
    return jwt.sign(payload,secretKey,options)
}

const verifyAccessToken = (token) => {
    try{
        const decoded = jwt.verify(token,secretKey)
        return {
            success: true,
            data: decoded
        }
    }catch(err){
        return {
            success: false,
            error: err.message
        }
    }
}

app.post('/login', async (req, res) => {
    const { grantType } = req.body
    console.log(req.body);
    let response = {
        accessToken: "",
        refreshToken: "",
        userName: "",
        userId: "",
        expiresIn: "1800"
    }
    switch (grantType) {
        case 'email':
            break;
        case 'gmail':
            const { access_token } = req.body
            axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }).then(apires => {
                console.log(apires.data)
                if(apires.data.email_verified){
                    response.accessToken = generateAccessToken(apires.data)
                    response.refreshToken = generateRefreshToken(apires.data)
                    response.userName = apires.data.name
                }
                console.log(response,{});
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'apple':

            break;
        case 'meta':

            break;
        default:
            break;
    }
    console.log(response);
    res.status(200).send(response)
})

app.listen(8080, () => {
    console.log("Application listening to port 8080");
})