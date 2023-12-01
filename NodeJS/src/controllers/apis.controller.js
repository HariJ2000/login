const checktoken = (req, res) => {
    console.log(req.body)
    res.status(200).send({msg:'success'})
}

module.exports = {
    checktoken
}