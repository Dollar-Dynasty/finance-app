// USE CAMEL CASE FOR VARIABLES
console.log('accountPage.js')

let accountForm = document.forms[0];

let email = document.forms[0][3];
console.log(email);
let submitButton = accountForm[6];

function validateEmail(emailValue) {

    console.log('validateEmail()');
    // let emailValue = email.value;

    if (emailValue.length === 0) {
        email.setCustomValidity('Email is required');
        return;
    }
    if (emailValue.includes('@') === false) {
        email.setCustomValidity('Email must contain @');
        return;
    }
    if (emailValue.includes('.') === false) {
        email.setCustomValidity('Email must contain .');
        return;
    }

    email.setCustomValidity('');
}


email.addEventListener('input', function () {
    console.log('email validating');
    validateEmail(email.value);
});

submitButton.addEventListener('click', function () {
    event.preventDefault();
    console.log('submitButton.addEventListener()');
    
} );