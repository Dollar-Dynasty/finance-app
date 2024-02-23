/*
Use JavaScript to perform client-side validation. Make sure that username and password fields are not empty in the form.

Validate username format (dminimum length).
Validate password security ( minimum length, special characters)
Implement error message display for validation failures.

Place error messages near the fields thats causing them
Use JavaScript to show/hide error messages as needed
Use basic css to show error messages if needed

*/
let forms = document.forms[0].getElementsByTagName('fieldset')[0];
const username = forms.querySelector('#username');
const password = forms.querySelector('#password');
const loginButton = forms.querySelector('#loginButton');
const errorElement = forms.querySelector('#error');



loginButton.addEventListener('click', () => {
    console.log('submit');
    event.preventDefault();
    let messages = []
    let isValid = true;
    if (username.value === '' || username.value == null) {
        messages.push('Username is required');
        isValid = false;
    }
    if (username.value.length <= 6) {
        messages.push('Username must be longer than 6 characters');
        isValid = false;
    }
    if (password.value === '' || password.value == null) {
        messages.push('Password is required');
        isValid = false;
    }
    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters');
        isValid = false;
    }
    if (password.value.length >= 20) {
        messages.push('Password must be less than 20 characters');
        isValid = false;
    }

    if (messages.length > 0) {
        event.preventDefault();
        errorElement.innerText = messages.join(', ');
    }
    else {
        errorElement.innerText = '';
    }
});


