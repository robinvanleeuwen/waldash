// @see: https://gist.github.com/branneman/8048520
require('app-module-path').addPath(__dirname + '/lib');
var cors = require("cors");

var server    = require('nodebootstrap-server')
var appConfig = require('./appConfig');
var app       = require('express')();

app = require('nodebootstrap-htmlapp').setup(app);

app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

server.setup(app, appConfig.setup);
