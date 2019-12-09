const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./api/routes/authentication")(app);
require("./api/routes/password")(app);
require("./api/routes/user")(app); 
require('./config/mongoose')();

app.listen(port);

console.log('Authentication API server started on: ' + port);