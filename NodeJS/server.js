const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(bodyParser.json())

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
                console.log(apires)
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
    res.status(200).send(response)
})

app.listen(8080, () => {
    console.log("Application listening to port 8080");
})