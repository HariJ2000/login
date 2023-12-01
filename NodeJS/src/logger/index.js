const pino = require('pino')

const logger = pino({
    level: process.env.LOG_LEVEL,
    timeStamp: pino.stdTimeFunctions.isoTime
})

module.exports = logger