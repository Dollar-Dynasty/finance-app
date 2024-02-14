const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String, 
    required: true
  },
  lastName: { 
    type: String, 
    required: true
  },
  userName: { 
    type: String, 
    required: true, 
    unique: true
  },
  email: { 
    type: String, 
    required: true,
  },
  accountId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', userSchema);

// User.updateMany({userName: null}, { $unset : { name : 1 }})

module.exports = User;