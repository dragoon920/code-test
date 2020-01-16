const admin = require('./routes/admin');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();


// configure response header 
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
  next();
});
// load router
app.use('/api/admin_only', admin);
app.use('/api/users', users);
app.use('/api/auth', auth);

// load env.port  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));