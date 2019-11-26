const express = require('express')
const app = express()
app.listen(4200, () => {
    console.log('Server running on port 4200')
    console.log('Click to access http:localhost:4200')
})

app.get('/', (req, res) => {
    res.send("Hello World")
})