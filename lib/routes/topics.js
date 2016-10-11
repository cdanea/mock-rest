'use strict';
var topicData = require('../models/topics.json');
var journalData = require('../models/journals.json');
var MW = require('../middleware/auth');
var express = require('express');
var _ = require('underscore');
var TopicRoutes = new express.Router;
TopicRoutes.path = '/api/rest/v1/topic';


TopicRoutes.use(MW.authenticated);
TopicRoutes.get("/", function (request, response) {
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
        response.json(_.where(topicData, filter));
    } else {
        response.json(topicData);
    }
});
TopicRoutes.get("/:id", function (request, response) {
    var topic = _.where(topicData, {cid: Number(request.params.id)}).shift();
    if(_.isEmpty(topic)) {
        response.status(404);
    }
    response.json(topic);
});
TopicRoutes.get(["/:id/journals", "/journals/:id"], function (request, response) {
    var topicJournals = _.where(journalData, {topic: Number(request.params.id)});
    if(_.isEmpty(topicJournals)) {
        response.status(404);
    }
    response.json(topicJournals);
});

module.exports = TopicRoutes;