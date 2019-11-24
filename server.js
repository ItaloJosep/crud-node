const express = require('express')
const app = express()

app.listen(4200, () => {
    console.log('Server running on port 4200')
    console.log('Click to acess http:localhost:4200')
})