'use strict';

const express = require('express');
const auth = require('../auth');
var router = express.Router();

/* GET home page. */
router.get('/', auth.IsAuth, function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
