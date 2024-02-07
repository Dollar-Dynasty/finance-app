const express = require('express');
const PORT = process.env.PORT || 3000;
const bcrypt = require('bcryptjs');
const connectDB = require('./config/dbConnection');
const User = require('./models/userModel');
const Login = require('./models/loginModel');
const { initializeApp} = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');

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


// makes EJS the template engine
app.set('view engine', 'ejs');

// Load HTML pages from 'views/pages' //
app.get('/', (req, res) => {
  if(auth.currentUser) {
    
    User.findOne({accountId: auth.currentUser.uid})
    .then((user) => {
      let fetchedUser = user.toJSON();
      let displayName = fetchedUser.firstName + " " + fetchedUser.lastName;
      res.render('pages/index', { 
        user : displayName
      });
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  // res.render('pages/index', { 
  //   user : auth.currentUser 
  // });
});
app.get('/register', (req, res) => {res.render('pages/register');});
app.get('/login', (req, res) => {res.render('pages/login');});
app.get('/logout', (req, res) => {
  // Logout from Firebase
  const user = auth.currentUser;
  if (user) {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User Signed Out");
    }).catch((error) => {
      // An error happened.
      console.log("Error Signing Out");
    });
  } else {
    console.log("No User Signed In");
  }

  res.redirect('/login');
});

app.get('/:version', function(req, res) { res.send(req.params.version);});

app.post('/register', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
   
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User Created: ",user.uid);

      const newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        accountId: user.uid
      });
      newUser.save();
      res.redirect('/'); // Redirect to home page or login page

    }
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
    
});
app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    
    const newLogin = new Login({
      userName,
      password
    });
    newLogin.save();

    signInWithEmailAndPassword(auth, userName, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      console.log("Signed In: ",user.uid);
      res.redirect('/'); // Redirect to home page
    }
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.redirect('/login'); // Redirect to login page
    });

    // res.redirect('/'); // Redirect to home page 
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});