const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');

const express = require('express');
const app = express();

// Define a port number
const PORT = process.env.PORT || 3000;

// Middleware to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// Tells Express to serve the static files in the public directory.
app.use(express.static('public'));

// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});