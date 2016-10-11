'use strict';
var express = require('express');
var MW = require('../middleware/auth');

var AuthRoutes = new express.Router;
AuthRoutes.get('/auth/check', MW.authenticated, function (request, response) {
    response.json(request.user);
});
AuthRoutes.get('/auth/renew', MW.authenticated, function (request, response) {
    response.set('Authorization', "Bearer " + Buffer.from(String(Date.now())).toString('base64'));
    response.json({cid: 1, username: 'test-username', email: 'email@example.com'});
});
AuthRoutes.all('/auth/login', function (request, response) {
    if(request.query.fail) {
        response.status(403);
        response.json({error: 403});
    } else {
        response.set('Authorization', "Bearer " + Buffer.from(String(Date.now())).toString('base64'));
        response.json({cid: 1, username: 'test-username', email: 'email@example.com'});
    }
});
AuthRoutes.all('/auth/logout', function (request, response) {
    response.end('');
});

module.exports = AuthRoutes;