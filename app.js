const express = require('express');
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');
const viewRouter = require('./routes/viewRoutes');
const apiRouter = require('./routes/apiRoutes');

const app = express();

// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/', viewRouter);

// makes EJS the template engine
app.set('view engine', 'ejs');

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});