const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/login', async (req, res) => {
    const { grantType } = req.body
    let id = null
    switch (grantType) {
        case 'email':
        case 'gmail':
            id = req.body.email
            break;
        case 'apple':

            break;
        case 'meta':

            break;

        default:
            break;
    }
    let response = {
        accessToken: "wertyuiop",
        refreshToken: "asdfghjkl",
        userName: "azxsw",
        userId: "edcfrgb",
        expiresIn: "1800"
    }
    res.status(200).send(response)
})

app.listen(8080, () => {
    console.log("Application listening to port 8080");
})