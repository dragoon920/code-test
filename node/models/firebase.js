const serviceAccount = require("../config/fbServiceAccountKey.json");
const firebase  = require('firebase-admin');
 firebase .initializeApp({
  credential: firebase .credential.cert(serviceAccount),
  databaseURL: "https://mapapp-1578565139331.firebaseio.com"
});

module.exports = firebase;