require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const routes = require('./routes.js');

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', routes);

const port = 3000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
