const express = require('express');
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db-connection');
const viewRouter = require('./routes/view-routes');
const apiRouter = require('./routes/api-routes');
const budgetRoutes = require('./routes/budget-routes');

const { initializeApp} = require('firebase/app');
const { getAuth } = require('firebase/auth');

const app = express();

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebase_app);

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

// Middleware to pass the auth object to the routes
app.use((req, res, next) => {
  req.auth = auth;
  
  next();
});
// makes EJS the template engine
app.set('view engine', 'ejs');

// app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('/', viewRouter);
app.use('/', budgetRoutes);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});