const { Client } = require('pg')
const logger = require('../logger')

const postgresqlConfig = {
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'1234',
    port:'5432'
}

const client = new Client(postgresqlConfig)

const connectDB = () => {
    client.connect(function(err) {
        if (err) throw err;
        logger.info("Connected!")
    })
}

module.exports = {
    connectDB,
    client
}