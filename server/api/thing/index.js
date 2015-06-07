'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.create);
router.get('/getItems', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.post('/addFeeds', controller.createRss);
router.delete('/:id', controller.destroy);

module.exports = router;
