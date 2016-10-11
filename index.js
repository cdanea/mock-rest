'use strict';

var express = require('express');
var mock = express();
var topicRouter = require('./lib/routes/topics');
var journalRouter = require('./lib/routes/journals');

mock.use(require('./lib/routes/auth'));
mock.use(topicRouter.path, topicRouter);
mock.use(journalRouter.path, journalRouter);


mock.listen(3000);