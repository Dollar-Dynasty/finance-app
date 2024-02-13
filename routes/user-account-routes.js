const express = require('express');
<<<<<<< HEAD:routes/user-account-routes.js
const User = require('../models/user-model');
const Login = require('../models/login-model');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const apiRouter = express.Router();

=======
const User = require('../models/userModel');
const Login = require('../models/loginModel');
const Budget = require('../models/budgetModel');
const Goal = require('../models/goalsModel');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const apiRouter = express.Router();

let redirectToBudget = false;
apiRouter.get('/v/:version', function(req, res) { res.send(req.params.version);});
>>>>>>> develop:routes/apiRoutes.js

apiRouter.get('/v/:version', function(req, res) { 
  res.send(req.params.version);
});



///   USER REGISTRATION  ///

apiRouter.post('/registration-form', async (req, res) => {
  const auth = req.auth;
  const { firstName, lastName, userName, email, password } = req.body;
 
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
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
<<<<<<< HEAD:routes/user-account-routes.js
    res.redirect('/budget-form');
=======
    redirectToBudget = true;
    res.redirect(`/goalCreation`);

>>>>>>> develop:routes/apiRoutes.js
  }
  ).catch((error) => {
    console.log(error.code);
    console.log(error.message);
  });
  
});



///   LOGIN AUTHENTICATION  ///

apiRouter.post('/login-form', async (req, res) => {
  const auth = req.auth;
  const { userName, password } = req.body;
  const newLogin = new Login({
    userName,
    password
  });

  newLogin.save();

  signInWithEmailAndPassword(auth, userName, password).then((userCredential) => {
    const user = userCredential.user;
    console.log("Signed In: ",user.uid);
    res.redirect('/');
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);

    res.redirect('/login-form');
  });

  res.redirect('/user-dashboard');
});
<<<<<<< HEAD:routes/user-account-routes.js



///   LOGOUT FUNCTIONALITY   ///
=======
apiRouter.post('/budgetCreation', (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/login');
    return;
  }
  const { category, budgetedAmount, actualAmount, startDate, endDate } = req.body;
  console.log(req.body);
  const newBudget = new Budget({
    category,
    budgetedAmount,
    actualAmount,
    startDate,
    endDate,
    accountId: req.auth.currentUser.uid
  });
  newBudget.save();
  res.redirect('/'); // Redirect to home page
});

apiRouter.post('/goalCreation', (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/login');
    return;
  }
  const { title, description, targetAmount, savedAmount, deadline } = req.body;
  console.log(req.body);
  const newGoal = new Goal({
    title,
    description,
    targetAmount,
    savedAmount,
    deadline,
    accountId: req.auth.currentUser.uid
  });
  newGoal.save();
  if(redirectToBudget){
    redirectToBudget = false;
    res.redirect('/budgetCreation');
  }else{
    res.redirect('/'); // Redirect to home page
  }
});
>>>>>>> develop:routes/apiRoutes.js

apiRouter.get('/logout', (req, res) => {
  const auth = req.auth;
  const user = auth.currentUser;

  if (user) {
    signOut(auth).then(() => {
      console.log("User Signed Out");
    }).catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  } else {
    console.log("No User Signed In");
  }

  res.redirect('/login-form');
});



//   ROUTE FOR TESTING   ///
apiRouter.get('/temp', async (req, res) => {
  res.send('Hello');
});


module.exports = apiRouter;