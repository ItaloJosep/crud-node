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
        console.log('Click to access http:localhost:4200')
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

// CONTACT CREATE
app.post('/contact', (req, res) => {
    db.collection('contact').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/')
    })
})

//ADMINISTRATOR
app.get('/administrator', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)

        db.collection('contact').find().toArray((err, contact) => {
            if (err) return console.log(err)
            console.log(results)
            console.log(contact)
            res.render('administrator.ejs', { data: results, contacts: contact })
        })

    })
})

// CREATE NEW CAR
app.get('/administrator/cadastro', (req, res) => {
    res.render('cadastro.ejs')
})

app.post('/administrator/cadastrar', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/administrator')
    })
})

// EDIT CAR
app.route('/edit/:id').get((req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var id = req.params.id

    db.collection('data').find({ _id: ObjectId.createFromHexString(id) }).toArray((err, result) => {
        if (err) return res.send(err)
        console.log("=========")
        console.log(result)
        console.log("=========")
        res.render('editar.ejs', { data: result })
    })

}).post((req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var id = req.params.id
    var marca = req.body.marca
    var modelo = req.body.modelo
    var cor = req.body.cor
    var ano = req.body.ano
    var preco = req.body.preco
    var descricao = req.body.descricao
    var urlfoto = req.body.urlfoto

    db.collection('data').updateOne({ _id: ObjectId.createFromHexString(id) }, {
        $set: {
            marca: marca,
            modelo: modelo,
            cor: cor,
            ano: ano,
            preco: preco,
            descricao: descricao,
            urlfoto: urlfoto
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/administrator')
    })
})

// DELETE CAR
app.route('/delete/:id').get((req, res) => {
    var ObjectId = require('mongodb').ObjectID;
    var id = req.params.id

    db.collection('data').deleteOne({ _id: ObjectId.createFromHexString(id) }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/administrator')
    })

})