const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
	firstName: { // should match name= in html form
		type: String, 
		required: true, 
	},
	lastName: { 
		type: String, 
		required: true, 
	},
    userName: { 
		type: String, 
		required: true, 
		unique: true 
	},
    email: { 
		type: String, 
		required: true, 
		unique: true 
	},
    password: { 
		type: String, 
		required: true 
	},
	confirmPassword: { 
		type: String, 
		required: true 
	},
    createdAt: {
		type: Date, 
		default: Date.now 
	}
});

userSchema.index({ userName: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;