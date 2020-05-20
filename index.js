const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const ShortUrl = require('./models/shortUrl');
const Clicks = require('./models/clicks');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to mongodb');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', {shortUrls: shortUrls});
});

app.post('/urlshortener', async (req, res) => {
    await ShortUrl.create({fullURL: req.body.fullURL});
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({shortURL: req.params.shortUrl});
    if(shortUrl == null) return res.sendStatus('404');
    shortUrl.clicks++;
    shortUrl.save();
    await Clicks.create({shortURL: shortUrl.shortURL});
    res.redirect(shortUrl.fullURL);
});

app.get('/display/graph/:shortUrl', async (req, res) => {
    const clicks = await Clicks.find({shortURL: req.params.shortUrl});
    res.render('clicks', {clicks: clicks})
});

app.listen(3000, () => {
    console.log("app listening on port 3000");
});