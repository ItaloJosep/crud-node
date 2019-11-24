const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use('/styles', express.static('styles'));
app.use('/assets', express.static('assets'));

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.listen(4200, () => {
    console.log('Server running on port 4200')
    console.log('Click to acess http:localhost:4200')
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/show', (req, res) => {
    console.log(req.body)
})