'use strict';
var journalData = require('../models/journals.json');
var path = require('path');
var MW = require('../middleware/auth');
var express = require('express');
var _ = require('underscore');
var JournalRoutes = new express.Router;
JournalRoutes.path = '/api/rest/v1/journal';
var filePath = path.join(__dirname, '../../data/journal');


JournalRoutes.use(MW.authenticated);

JournalRoutes.get("/", function (request, response) {
    var filter = {};
    if(request.query.hasOwnProperty('filter') && request.query.filter) {
        try {
            filter = JSON.parse(request.query.filter);
        } catch (error) {
            response.status(500);
            return response.json({
                error: 500,
                message: "Filter parse error"
            });
        }
        response.json(_.where(journalData, filter));
    } else {
        response.json(journalData);
    }
});

JournalRoutes.get("/:id", function (request, response) {
    var journal = _.where(journalData, {cid: Number(request.params.id)}).shift();
    if(_.isEmpty(journal)) {
        response.status(404);
    }
    response.json(journal);
});

JournalRoutes.get(["/download/:id", "/:id/download"], function (request, response) {
    var journal = _.where(journalData, {cid: Number(request.params.id)}).shift();
    if(_.isEmpty(journal)) {
        return response.status(404);
    }

    var options = {
        root: filePath,
        dotfiles: 'deny',
        cacheControl: false,
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'Content-type': 'application/pdf'
        }
    };
    response.sendFile(journal.filename, options, function (err) {
        if (err) {
            response.status(err.status).end();
        }
    });
});

module.exports = JournalRoutes;