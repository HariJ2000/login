const queryCall = require("../db")
const { GET_ALL_FROM_USER } = require("../db/query.constants")
const logger = require("../logger")

const getdata = async(req, res) => {
    console.log("got the req")
    let dbres = await queryCall(GET_ALL_FROM_USER)
    logger.info(dbres.rows)
    res.status(200).send({msg:'success'})
}

module.exports = {
    getdata
}