const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.set('view engine', 'ejs');

mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('urlshortner', (req, res) => {

});

app.listen(3000, () => {
    console.log("app listening on port 3000");
});