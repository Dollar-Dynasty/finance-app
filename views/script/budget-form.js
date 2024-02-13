// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("budget_form");
//     form.addEventListener("submit", function(event) {
//         event.preventDefault(); // Prevent form submission

//         // Validate each input field
//         const budgetTitle = document.getElementById("budget_title").value;
//         const categoryName = document.getElementById("category_name").value;
//         const budgetDescription = document.getElementById("budget_description").value;
//         const startDate = document.getElementById("start_date").value;
//         const endDate = document.getElementById("end_date").value;
//         const totalAmountavailable = document.getElementById("totalamount_available").value;
//         const remainingAmount = document.getElementById("remaining_amount").value;

//         if (budgetTitle === "") {
//             alert("Please enter a budget title.");
//             return;
//         }

//         if (categoryName === "") {
//             alert("Please enter a category name.");
//             return;
//         }

//         if (budgetDescription === "") {
//             alert("Please enter a budget description.");
//             return;
//         }

//         if (startDate === "" || endDate === "") {
//             alert("Please enter both start and end dates.");
//             return;
//         }

//         if (amount === "" || totalAmountavailable  === "") {
//             alert("Please enter both total amount available and remaining amount.");
//             return;
//         }
//         if (amount === "" || remainingAmount === "") {
//             alert("Please enter both total amount available and remaining amount.");
//             return;
//         }
//         // Additional validation can be added as per requirements

//         // If all validations pass, submit the form
//         form.submit();
//     });
// });












document.querySelectorAll('.currencyInput').forEach(input => {
    input.addEventListener('input', function (e) {
        var value = e.target.value.replace(/[^0-9]+/g, ''); // Remove non-numeric chars
        if (!value) {
            e.target.value = '';
            return;
        }
        var currencyValue = (parseInt(value, 10) / 100).toFixed(2); // Convert to decimal
        e.target.value = `$${currencyValue}`; // Update the input field
    });
});

console.log("js file is connected");