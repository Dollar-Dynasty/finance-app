document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("budget_form");
    console.log("Form submitted");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        // Validate each input field
        const budgetTitle = document.getElementById("budget_title").value;
        const categoryName = document.getElementById("category_name").value;
        const budgetDescription = document.getElementById("budget_description").value;
        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("end_date").value;
        const amount = document.getElementById("amount").value;
        const remainingAmount = document.getElementById("remaining_amount").value;

        if (budgetTitle === "") {
            alert("Please enter a budget title.");
            return;
        }

        if (categoryName === "") {
            alert("Please enter a category name.");
            return;
        }

        if (startDate === "" || endDate === "") {
            alert("Please enter both start and end dates.");
            return;
        }

        if (amount === "" || amount  === "") {
            alert("Please enter both total amount available and remaining amount.");
            return;
        }
        if (remainingAmount === "" || remainingAmount === "") {
            alert("Please enter both total amount available and remaining amount.");
            return;
        }
        // Additional validation can be added as per requirements

        // If all validations pass, submit the form
        form.submit();
    });
});
