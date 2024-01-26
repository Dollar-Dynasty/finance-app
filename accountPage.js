// USE CAMEL CASE FOR VARIABLES
console.log('accountPage.js')

let accountForm = document.forms[0];

let email = document.forms[0][3];

// console.log(email);
let submitButton = accountForm[6];

function isEmailValid() {
    let emailValue = email.value;

    if (emailValue.length === 0) {
        console.log('Email is required');
        return false;
    }
    if (emailValue.includes('@') === false) {
        console.log('Email must contain @');
        return false;
    }
    if (emailValue.includes('.') === false) {
        console.log('Email must contain .');
        return false;
    }

    email.setCustomValidity('');
    return true;
}
function isPasswordValid() {
    let password = accountForm[4].value;
    let confirmPassword = accountForm[5].value;
    // confirm if password and confirm password match
    if (password !== confirmPassword) {
        console.log('Passwords must match');
        return false;
    } 
    // confirm if password is at least 8 characters
    if(password.length < 8) {
        console.log(password.length)
        
        console.log('Password must be at least 8 characters');
        return false;
    } 
    // confirm if password has at least 1 number
    if(password.search(/[0-9]/) === -1) {
        console.log('Password must contain at least 1 number');
        return false;
    }
    // confirm if password has at least 1 capital letter
    if(password.search(/[A-Z]/) === -1) {
        console.log('Password must contain at least 1 capital letter');
        return false;
    }
    // confirm if password has at least 1 lowercase letter
    if(password.search(/[a-z]/) === -1) {
        console.log('Password must contain at least 1 lowercase letter');
        return false;
    }
    // confirm if password has at least 1 special character
    if(password.search(/[!@#$%^&*]/) === -1) {
        console.log('Password must contain at least 1 special character');
        return false;
    }
    return true;
}

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('submit button clicked');
    if (isEmailValid() && isPasswordValid()) {
        console.log('Form Valid ✅');
        accountForm.submit();
    } else{
        console.log('Form not Valid ❌');

    }

}
);