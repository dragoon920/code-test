const express = require('express');
const router = express.Router();
const firebase = require('../models/firebase');
const _ = require('lodash');

router.post('/', async (req, res) => {
  try{
    let userRecord  = await firebase.auth().createUser(_.pick(req.body, ['email', 'password','isAdmin']));
    let token = null;
    await firebase.auth().setCustomUserClaims(userRecord.uid, { admin: req.body.isAdmin  })

    if (userRecord){
      let token = await firebase.auth().createCustomToken(userRecord.uid);

    if(token)
      res.header('x-auth-token', token).send( token );
    }
  }catch (ex) {
    res.status(403).send({error:ex.message});
  }
});

module.exports = router; 