const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const url = 'mongodb://0.0.0.0:27017/nodeDb';
const Users = require('./models/userSchema')

const port = 3000
const hostname = 'localhost'

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.set('strictQuery', false)

// Mongo connection
mongoose.connect(url)
    .then((res) => {
        console.log('Connected to ' + res.connection._connectionString)
    })

// routes
app.get('/', (req, res) => {
    // Display all data
    Users.find({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
})

app.post('/new', (req, res) => {
    Users.create(req.body)
        .then((resp) => {
            console.log('Users created', resp)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
})

app.post('/update', (req, res) => {
    Users.findByIdAndUpdate(req.body._id, {
        $set: req.body
    }, { new: true })
        .then((emp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(emp);
        })
})

app.post('/delete', (req, res) => {
    Users.findByIdAndRemove(req.body.delId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
})

app.get('/*', (req, res) => {
    res.status(404)
    res.end("<h1>404 Error</h1>")
})

// Http connection
app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})