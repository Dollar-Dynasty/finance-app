const express = require('express');
const User = require('../models/user-model');
const Login = require('../models/login-model');
const viewRouter = express.Router();

// Load HTML pages from 'views/pages' //
viewRouter.get('/', (req, res) => {res.render('pages/index');});
viewRouter.get('/goal-form', (req, res) => {res.render('pages/goal-form');});
viewRouter.get('/budget-form', (req, res) => {res.render('pages/budget-form');});
viewRouter.get('/user-dashboard', (req, res) => {res.render('pages/user-dashboard');});
viewRouter.get('/registration-form', (req, res) => {res.render('pages/registration-form');});
viewRouter.get('/login-form', (req, res) => {res.render('pages/login-form');});

module.exports = viewRouter;