// user.test.js
// const connectDB = require('../config/dbConnection');
// const User = require('../models/userModel');
// const mongoose = require('mongoose');

// connectDB();

// test('Registering users work as expected', async () => {
//     const user = {
//         firstname: 'John',
//         lastname: 'Doe',
//         username: 'john.doe',
//         email: 'john.doe@example.com',
//         password: 'password123'
//     };

//     await expect(User._registerNewUser(user)).resolves.toEqual({
//         validated: true,
//         reason: 'You have successfully registered !',
//         user: {
//             password: expect.anything(),
//             username: 'jestUser'
//         }
//     });
// })
