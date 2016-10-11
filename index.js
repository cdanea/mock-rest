'use strict';

var express = require('express');
var mock = express();

var topicRouter = require('./lib/routes/topics');
var journalRouter = require('./lib/routes/journals');

mock.use(require('./lib/routes/auth'));
mock.use(topicRouter.path, topicRouter);
mock.use(journalRouter.path, journalRouter);



mock.all(function (request, response) {
   response.json({
       topics: {
           root: topicRouter.path,
           apis: {
               "/" : "GET",
               "/:id": "GET",
               "/:id/journals": "GET",
               "/journals/:id": "GET"
           }
       },
       entries: {
           root: journalRouter.path,
           apis: {
               "/" : "GET",
               "/:id": "GET",
               "/download/:id": "GET",
                "/:id/download": "GET"
           }
       }
   });
});
module.exports = mock;