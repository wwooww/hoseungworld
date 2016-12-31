var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')

var fs = require('fs')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json


app.use(express.static(path.join(__dirname, 'public')));

app.get('/posts', function(req, res, next) {
    fs.readFile(path.join(__dirname, 'db', 'posts.json'), 'utf8', function(err, data) {
        res.json(JSON.parse(data));
    })
})

app.post('/post', function(req, res, next) {
    fs.writeFile(path.join(__dirname, 'db', 'posts.json'), JSON.stringify(req.body), 'utf8', function(data) {
        console.log(data)
        res.json(req.body)
    })
})

app.get('/admin', function(req, res, next) {
    res.render('admin')
})

app.get('/', function(req, res, next) {
    res.render('index')
})

app.listen(3030, function(e) {
    if (e) {
        console.error(e)
    } else {
        console.log('listening on 3030')
    }
})