const express = require('express')
const app = express()
app.listen(4300, () => {
    console.log('Server running on port 4300')
    console.log('Click to access http:localhost:4300')
})

app.get('/', (req, res) => {
    res.send("Hello World")
})