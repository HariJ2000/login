const express = require('express')

const app = express()

app.get('/',() => {
    console.log("listening");
})

app.listen(8080, () => {
    console.log("Application listening to port 8080");
})