const express = require('express');
const User = require('../models/userModel');
const Login = require('../models/loginModel');
const viewRouter = express.Router();

// Load HTML pages from 'views/pages' //
viewRouter.get('/', (req, res) => {res.render('pages/index');});
viewRouter.get('/goalCreation', (req, res) => {res.render('pages/goalCreation');});
viewRouter.get('/welcome', (req, res) => {res.render('pages/welcome');});
viewRouter.get('/register', (req, res) => {res.render('pages/register');});
viewRouter.get('/login', (req, res) => {res.render('pages/login');});

module.exports = viewRouter;