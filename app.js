const express = require('express');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.get('/', (req, res) => { res.render('index'); });
app.get('/:version', function(req, res) { res.send(req.params.version); });

app.post('/', (req, res) => {
  const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
  const hashedPassword = ""; // hash the password using bcrypt or something similar
  const newUser = new User({ firstName, lastName, userName, email, password, confirmPassword, });
  newUser.save();
  res.redirect('/dashboard');
  res.send({ newUser });
})

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });