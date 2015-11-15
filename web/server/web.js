var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, '../client/app.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Retro is listening at http://%s:%s', host, port);
});