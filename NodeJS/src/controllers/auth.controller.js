const axios = require('axios')
const jwt = require('jsonwebtoken')

const generateAccessToken = ({ email, sub, name }) => {
    const payload = {
        email,
        sub,
        name
    }
    const options = {
        expiresIn: '30m'
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, options)
}
const generateRefreshToken = ({ email, sub, name }) => {
    const payload = {
        email,
        sub,
        name,
        refreshId: email
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, options)
}

const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey)
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
    }).then(apires => {
        console.log(apires.data)
        if (apires.data.email_verified) {
            response.accessToken = generateAccessToken(apires.data)
            response.refreshToken = generateRefreshToken(apires.data)
            response.userName = apires.data.name
        }
        res.status(200).send(response)
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {
    signin
}