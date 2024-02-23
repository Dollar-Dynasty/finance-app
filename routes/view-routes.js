const express = require('express');
const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {res.render('pages/index');});
viewRouter.get('/signup', (req, res) => {res.render('pages/auth/signup');});
viewRouter.get('/create-budget', (req, res) => {res.render('pages/budgets/setup');});
viewRouter.get('/set-goal', (req, res) => {res.render('pages/goals/setup');});
viewRouter.get('/dashboard', (req, res) => {res.render('pages/dashboard');});
viewRouter.get('/budgets', (req, res) => {res.render('pages/budgets/dashboard');});
viewRouter.get('/goals', (req, res) => {res.render('pages/goals/dashboard');}); 
viewRouter.get('/login', (req, res) => {res.render('pages/auth/login');});

module.exports = viewRouter;