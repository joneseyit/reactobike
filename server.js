'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000))

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/materialize', express.static(path.join(__dirname, 'node_modules', 'materialize-css', 'dist')))
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

const validFrontendRoutes = ['/', '/data', '/map'];
const indexPath = path.join(__dirname, 'public', 'index.html');

validFrontendRoutes.forEach(route =>
  app.get(route, (req, res, next) => res.sendFile(indexPath))
);

app.listen(app.get('port'), function () {
  console.log('Server listening on port', 3000);
});
