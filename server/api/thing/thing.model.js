'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  media: String, 
  url:  String,
  title: String,
  description: String,
  email: String, 
  mediaType: String,
  createTime: Number,
  createDate: Date,
  upVotes: Number
});

module.exports = mongoose.model('Thing', ThingSchema);