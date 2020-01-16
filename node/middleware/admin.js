const firebase = require('../models/firebase');
/**
  * @desc middleware function to check user token and admin role 
  * @param object req - the message to be displayed
  * @return bool - pass or failure (401 not an admin user, 403 unauthorized) 
*/
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (token) {
    firebase.auth().verifyIdToken(token)
      .then((claims) => {
        if(claims.admin === true){
          next()
        }else{
          res.status(401).send('not an admin user')
        }
      }).catch((error) => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}