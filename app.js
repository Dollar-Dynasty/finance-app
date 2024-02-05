const express = require('express');
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');
const Login = require('./models/loginModel');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));


// makes EJS the template engine
app.set('view engine', 'ejs');

// Load HTML pages from 'views/pages' //
app.get('/', (req, res) => {res.render('pages/index');});
app.get('/register', (req, res) => {res.render('pages/register');});
app.get('/login', (req, res) => {res.render('pages/login');});

app.get('/:version', function(req, res) { res.send(req.params.version);});

app.post('/register', async (req, res) => {
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
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    console.log(req.body);
    const newLogin = new Login({
      userName,
      password
    });
    newLogin.save();
    res.redirect('/'); // Redirect to home page or login page
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);},debug=true);