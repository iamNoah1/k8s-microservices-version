const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require('./routes.js');
app.use('/', routes);

var port = process.env.PORT || 3000

app.listen(port);
console.log('server started on port ' + port);