const express = require('express');
const User = require('../models/user-model');
const Login = require('../models/login-model');
const viewRouter = express.Router();

// Load HTML pages from 'views/pages' //
viewRouter.get('/', (req, res) => {res.render('pages/index');});
viewRouter.get('/goals-form', (req, res) => {res.render('pages/goals-form');});
viewRouter.get('/budget-form', (req, res) => {res.render('pages/budget-form');});
viewRouter.get('/user-dashboard', (req, res) => {res.render('pages/user-dashboard');});
viewRouter.get('/registration-form', (req, res) => {res.render('pages/registration-form');});
viewRouter.get('/login-form', (req, res) => {res.render('pages/login-form');});
viewRouter.get('/budget-page', (req, res) => {res.render('pages/budget-page');});
viewRouter.get('/goals-page', (req, res) => {res.render('pages/goals-page');});
viewRouter.get('/contact-page', (req, res) => {res.render('pages/contact-page');});

module.exports = viewRouter;