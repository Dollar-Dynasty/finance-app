const express = require('express');
const User = require('../models/user-model');
const Login = require('../models/login-model');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const apiRouter = express.Router();

apiRouter.get('/v/:version', function(req, res) { res.send(req.params.version);});


apiRouter.post('/registration-form', async (req, res) => {
  const auth = req.auth;

  const { 
    firstName, 
    lastName, 
    userName, 
    email, 
    password 
  } = req.body;
 
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User Created: ",user.uid);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      accountId: user.uid
    });
    newUser.save();

    // Redirects to create a new budget after creating a new account
    res.redirect('/budget-form');
  }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
  
});


apiRouter.post('/login-form', async (req, res) => {
  const auth = req.auth;
  const { userName, password } = req.body;
  const newLogin = new Login({
    userName,
    password
  });
  newLogin.save();

  signInWithEmailAndPassword(auth, userName, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    console.log("Signed In: ",user.uid);
    // Redirect to home page and pass auth object
    res.redirect('/');
  }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error login api",errorCode);
    console.log("Error login api MSG",errorMessage);
    res.redirect('/login-form'); // Redirect to login page
  });

  // res.redirect('/'); // Redirect to home page 
});


apiRouter.get('/logout', (req, res) => {
  const auth = req.auth;
  // Logout from Firebase
  const user = auth.currentUser;
  if (user) {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User Signed Out");
    }).catch((error) => {
      // An error happened.
      console.log("Error Signing Out");
    });
  } else {
    console.log("No User Signed In");
  }

  res.redirect('/login-form');
});


apiRouter.get('/temp', async (req, res) => {res.send('Hello');});


















module.exports = apiRouter;