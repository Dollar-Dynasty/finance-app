const express = require('express');
const PORT = process.env.PORT || 3000;
const path = require('path'); 
const connectDB = require('./config/db-connection');
const viewRouter = require('./routes/view-routes');
const accountRouter = require('./routes/user-account-routes');
// const budgetRouter = require('./routes/budget-routes');

const { initializeApp} = require('firebase/app');
const { getAuth } = require('firebase/auth');

const app = express();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth(firebase_app);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.auth = auth;
  next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



app.use('/api', accountRouter);
app.use('/', viewRouter);
// app.use('/', budgetRouter);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});