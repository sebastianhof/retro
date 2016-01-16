var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendfile('app/index.html');
});

app.get('/products', function (req, res) {
    res.sendfile('app/products.html');
});

app.get('/devices', function (req, res) {
    res.sendfile('app/devices.html');
});

app.get('/support', function (req, res) {
    res.sendFile('app/support.html');
});

app.use('/resources', express.static('app/resources'));

var port = process.env.PORT || 8080;

app.listen(port, function () {
    console.log('Retro page is listening on ' + port);
});
