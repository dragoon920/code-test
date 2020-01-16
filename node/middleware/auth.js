const firebase = require('../models/firebase');
/**
  * @desc middleware function to check user token
  * @param object req - the message to be displayed
  * @return bool - 200 or 403 
*/
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (token) {
    firebase.auth().verifyIdToken(token)
      .then(() => {
        next()
      }).catch((error) => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}