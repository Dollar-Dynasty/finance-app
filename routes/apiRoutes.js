const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/v/:version', function(req, res) { res.send(req.params.version);});

apiRouter.post('/register', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    // Check if passwords match
    // Hash the password
    
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password // will need to be hashed eventually
    });
    newUser.save();
    res.redirect('/'); // Redirect to home page or login page
});
apiRouter.get('/temp', async (req, res) => {res.send('Hello');});

module.exports = apiRouter;

