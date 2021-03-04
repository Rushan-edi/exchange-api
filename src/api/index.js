const express = require('express');
const convert = require('./convert');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/convert', convert);

module.exports = router;
