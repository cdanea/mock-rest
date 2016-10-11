'use strict';

var express = require('express');
var mock = express();
if(true) {
    mock.use(function (request, response, next) {
        console.log("[" + request.method + "]   " + request.path);
    });
}

var topicRouter = require('./lib/routes/topics');
var journalRouter = require('./lib/routes/journals');

mock.use(require('./lib/routes/auth'));
mock.use(topicRouter.path, topicRouter);
mock.use(journalRouter.path, journalRouter);


module.exports = mock;