const logger = require('./logger')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080
const routes = require('./routes')

const app = express()

const startServer = () => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use('/api',routes)
    app.listen(PORT, () => {
        logger.info(`server listening to port ${PORT}`);
    })
}

module.exports = startServer