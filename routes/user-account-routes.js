const express = require('express');
const User = require('../models/user-model');
const Login = require('../models/login-model');
const Goal = require('../models/goals-model');
const Budget = require('../models/budget-model');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const apiRouter = express.Router();


apiRouter.get('/v/:version', function(req, res) { 
  res.send(req.params.version);
});



/// USER REGISTRATION   ///

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
    res.redirect('/budget-form');
  }
  ).catch((error) => {
    console.log(error.code);
    console.log(error.message);
  });
  
});



/// LOGIN AUTHENTICATION   ///

apiRouter.post('/loginForm', async (req, res) => {
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
    res.redirect('/user-dashboard');
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);

    res.redirect('/login-form');
    });
  });



/// LOGOUT FUNCTIONALITY   ///

apiRouter.post('/budgetCreation', (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/login-form');
    return;
  }
  const { budget_title, budget_description, month_start_date, month_end_date, monthly_income, categories} = req.body;
  console.log(req.body);

  const newBudget = new Budget({
    budget_title,
    budget_description,
    monthly_income,
    month_start_date,
    month_end_date,
    categories,
    accountId: req.auth.currentUser.uid
  });
  newBudget.save();
  res.redirect('/');
});

apiRouter.delete('/deleteBudget', (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/');
    return;
  }
  const budgetId = req.body.budgetId;
  if (!budgetId) {
    console.error('No budget to delete');
    return;
  }
  Budget.where({ _id: budgetId }).findOneAndDelete().then(() => {
    console.log('Budget Deleted');
    res.send('Budget Deleted');
  }
  ).catch((error) => {
    console.log(error);
  });
});



apiRouter.post('/goalsForm', (req, res) => {
  if (!req.auth.currentUser) {
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
  res.redirect('/user-dashboard');
});

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

  res.redirect('/');
});

// Route to get user's goals
apiRouter.get('/goals', async (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/');
    return;
  }
  const goals = await Goal.find({ accountId: req.auth.currentUser.uid });
  res.send(goals);
});

// Route to get user's budget
apiRouter.get('/budgets', async (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/');
    return;
  }
  const budget = await Budget.find({ accountId: req.auth.currentUser.uid });
  res.send(budget);
});

// User information
apiRouter.get('/user', async (req, res) => {
  if (!req.auth.currentUser) {
    res.redirect('/');
    return;
  }
  const user = await User.findOne({ accountId: req.auth.currentUser.uid });
  res.send(user);
});

// ROUTE FOR TESTING   ///
apiRouter.get('/temp', async (req, res) => {
  res.send('Hello');
});


module.exports = apiRouter;