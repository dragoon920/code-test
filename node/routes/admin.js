const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', [admin], async (req, res) => {
  //const genres = await Genre.find().sort('name');
  res.send([1,2,3]);
});

router.post('/', [admin], async (req, res) => {
  res.send([1,2,3]);
});

module.exports = router;