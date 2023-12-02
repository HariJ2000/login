const axios = require('axios')
const jwt = require('jsonwebtoken')
const queryCall = require('../db')
const { GET_ALL_FROM_USER, CREATE_NEW_USER } = require('../db/query.constants')
const logger = require('../logger')

const generateAccessToken = ({ email, sub, name, userId }) => {
    const payload = {
        email,
        sub,
        name
    }
    const options = {
        expiresIn: '30m'
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY+userId, options)
}
const generateRefreshToken = ({ email, sub, name, userId }) => {
    const payload = {
        email,
        sub,
        name,
        refreshId: email
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY+userId, options)
}

const verifyAccessToken = (token, userId) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY+userId)
        return {
            success: true,
            data: decoded
        }
    } catch (err) {
        return {
            success: false,
            error: err.message
        }
    }
}

// app.post('/login', async (req, res) => {
//     const { grantType } = req.body
//     console.log(req.body);
//     let response = {
//         accessToken: "",
//         refreshToken: "",
//         userName: "",
//         userId: "",
//         expiresIn: "1800"
//     }
//     switch (grantType) {
//         case 'email':
//             break;
//         case 'gmail':

//             break;
//         case 'apple':

//             break;
//         case 'meta':

//             break;
//         default:
//             break;
//     }
//     console.log(response);
// })


const signin = (req, res) => {
    let response = {
        accessToken: "",
        refreshToken: "",
        userName: "",
        userId: "",
        expiresIn: "1800"
    }
    const { access_token } = req.body
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then(async(apires) => {
        const {data} = apires
        logger.info(data)
        if (data.email_verified) {
            let query = GET_ALL_FROM_USER + ` WHERE email = '${data.email}'`
            let userExist = await queryCall(query)
            logger.info(`rowCount ${userExist.rowCount}`)
            if(!userExist){
                let createuser = await queryCall(CREATE_NEW_USER,[data.name, data.email, data.sub, 2])
                logger.info(`createuser ${createuser}`)
            }
            // response.accessToken = generateAccessToken({...data,userId:123456})
            // response.refreshToken = generateRefreshToken({...data,userId:123456})
            // response.userName = data.name
        }
        // res.status(200).send(response)
    }).catch(err => {
        console.log(err);
    })
}

const authenticateRequest = ( req, res, next) => {
    let returnData = verifyAccessToken(req?.headers['authorization']?.split(' ')[1], req.body.userId)
    if(returnData.success){
        console.log(returnData);
        next()
    }
}

module.exports = {
    signin,
    authenticateRequest
}