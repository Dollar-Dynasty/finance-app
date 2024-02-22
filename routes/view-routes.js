const express = require('express');
const viewRouter = express.Router();


/// --AUTHENICATION  ///
viewRouter.get('/login', (req, res) => {res.render('pages/auth/login-page');});
viewRouter.get('/register', (req, res) => {res.render('pages/auth/registration-page');});

// --LANDING  ///
viewRouter.get('/', (req, res) => {res.render('pages/index');});

/// --DASHBOARDS  ///
viewRouter.get('/dashboard', (req, res) => {res.render('pages/main-dashboard');});
viewRouter.get('/budget-overview', (req, res) => {res.render('pages/budget/budget-dashboard');});
viewRouter.get('/goals-overview', (req, res) => {res.render('pages/goal/goals-dashboard');});

/// --BUDGET/GOAL CREATION   /// 
viewRouter.get('/create-budget', (req, res) => {res.render('pages/budget/create-budget-page');});
viewRouter.get('/make-goal', (req, res) => {res.render('pages/goal/create-goal-page');});


module.exports = viewRouter;