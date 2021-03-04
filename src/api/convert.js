const express = require('express');
const axios = require('axios');
const router = express.Router();
const { convertValidation } = require('../../src/validation');

const BASE_URL = `https://data.fixer.io/api/convert`;
let cacheData;
let cacheTime;


router.post('/', async (req, res) => {
  //Validate convert req body
  const { error } = convertValidation(req.body);
  if (error) return res.status(422).json({ message: error.details[0].message });
  //In memory cache 24 hours 
  if (cacheTime && cacheTime > Date.now() - 60 * 1000 * 60 * 24) {
    res.json(cacheData);
  }
  try {
    const params = new URLSearchParams({
      access_key: process.env.FIXER_API_KEY,
      from: req.body.fromCurrency,
      to: req.body.toCurrency,
      amount: req.body.amount
    })
    const { result, query } = await axios.get(`${BASE_URL}${params}`);
    cacheData = { amount: result, currency: query.to };
    cacheTime = Date.now();
    return res.json({ amount: result, currency: query.to, cacheTime: cacheTime });

  } catch (error) {
    return next(error);
  }

});

module.exports = router;
