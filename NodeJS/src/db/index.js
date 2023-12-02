const logger = require("../logger")
const { client } = require("./config")

const queryCall = (query,payload=[]) => {
    try{
        logger.info(`query called: ${query} payload ${payload}`)
        return new Promise((resolve, reject) => {
            client.query(query, payload, (err, res) => {
                if(!err){
                    logger.info(`response from db ${JSON.stringify(res)}`)
                    resolve(res)
                }else{
                    logger.info(err.message)
                    reject(err)
                }
                client.end
            })
        })
    }catch(error){
        logger.info(error)
    }
}

module.exports = queryCall