/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Thing = require('./thing.model');

// Save from chrome extension snapIt
exports.create = function(req, res) {
  var media, url, title, description;

  var message = new Thing();
  message.mediaType = req.query.mediaType;
  message.media = req.query.media;
  message.url = req.query.url;
  message.title = req.query.title;
  message.description = req.query.description;
  message.email = 'ratracegrad@gmail.com';
  message.createTime = Date.now();
  message.createDate = new Date();
  message.upVotes = 0;
  message.save(function () {
    res.send(req.body);
  });
};

// Get list of things
exports.index = function(req, res) {
  Thing.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Updates when somebody upVotes an item
exports.update = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.upVotes++;
    thing.save(function(err){
      if (err) { return handleError(res, err); }
      return res.json(200, thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}