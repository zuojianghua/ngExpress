var express = require('express');
var app = express();


app.use('/static', express.static('bower_components'));
app.use('/api_demo', express.static('api_demo'));

app.use('/', express.static('build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});