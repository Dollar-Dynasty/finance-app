const express = require('express');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// makes EJS the template engine
app.set('view engine', 'ejs');

// Load HTML pages from 'views/pages' //

app.get('/', (req, res) => { 
  res.render('pages/index'); 
});

app.get('/register', (req, res) => { 
  res.render('pages/register'); 
});

app.get('/login', (req, res) => { 
  res.render('pages/login'); 
});

app.get('/:version', function(req, res) { res.send(req.params.version); });

app.post('/register', (req, res) => {
  const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
  const hashedPassword = ""; // hash the password using bcrypt or something similar
  const newUser = new User({ firstName, lastName, userName, email, password, confirmPassword, });
  newUser.save();
  res.redirect('/home');
  res.send({ newUser });
})

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });