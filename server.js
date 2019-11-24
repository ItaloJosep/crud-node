const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;

app.use('/styles', express.static('styles'));
app.use('/assets', express.static('assets'));

const uri = "mongodb+srv://admin:teste123@luxury-car-voah6.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('luxury-car')

    app.listen(4200, () => {
        console.log('Server running on port 4200')
        console.log('Click to acess http:localhost:4200')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('index.ejs', { data: results })
    })
})

app.get('/administrator/cadastro', (req, res) => {
    res.render('cadastro.ejs')
})

app.post('/cadastrar', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/')
    })
})