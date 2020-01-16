const Joi = require('joi');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const firebase = require('../models/firebase');

/**
  * @desc get API to check user token
  * @param object req - post body and header information 
  * @return res -  pass or failure (403, 400) 
*/
router.get('/', async (req, res) => {
  //get token from header
  const token = req.header('x-auth-token');
  if (token) {
    //verify id toekn by firebase auth
    firebase.auth().verifyIdToken(token)
      .then(() => {
        res.status(200).send('login success');
      }).catch((error) => {
        //return error if login faild
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(400).send('Invalid token.')
  }
});

module.exports = router; 
