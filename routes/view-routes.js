const express = require('express');
const viewRouter = express.Router();

// Landing
viewRouter.get('/', (req, res) => {res.render('pages/index');});
viewRouter.get('/login', (req, res) => {res.render('pages/landing-links/user-login');});

// New User
viewRouter.get('/register', (req, res) => {res.render('pages/new-user/account-registration');});
viewRouter.get('/make-goal', (req, res) => {res.render('pages/new-user/first-goal');});
viewRouter.get('/create-budget', (req, res) => {res.render('pages/new-user/first-budget');});
viewRouter.get('/register', (req, res) => {res.render('pages/new-user/account-registration');});

// Logged In User
viewRouter.get('/dashboard', (req, res) => {res.render('pages/logged-in-user/user-dashboard');});
viewRouter.get('/budget-overview', (req, res) => {res.render('pages/logged-in-user/budgets-overview');});
viewRouter.get('/goals-overview', (req, res) => {res.render('pages/logged-in-user/goals-overview');});

module.exports = viewRouter;