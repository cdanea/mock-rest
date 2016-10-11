'use strict';
var mock = true;
module.exports = {
    authenticated: function (request, response, next) {
        if(mock || request.headers && request.headers.hasOwnProperty('Authorization') && request.headers['Authorization']) {
            request.user = {cid: 1, username: 'test_user', email: 'email@example.com'};
            next();
        } else {
            response.status(403);
            response.end('');
        }
    }
};