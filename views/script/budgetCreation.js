const budgetDescription = document.getElementById('budget_description');
budgetDescription.innerText = "";

document.addEventListener("DOMContentLoaded", function() {
    console.log("Form submitted");
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('budget_form');
    submitButton.addEventListener('click', function() {
        event.preventDefault(); // Prevent form submission
        // Validate each input field
        const budgetTitle = document.getElementById("budget_title").value;
        const categorySection = document.getElementById("category-section"); 
        const startDate = document.getElementById("month_start_date").value;
        const endDate = document.getElementById("month_end_date").value;
        const amount = document.getElementById("monthly_income").value;

        if (budgetTitle === "") {
            alert("Please enter a budget title.");
            return;
        }

        if (categorySection.children.length === 0) {
            alert("Please add at least one category.");
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

        // Additional validation can be added as per requirements

        // If all validations pass, submit the form
        form.submit();
    });
});
let categoryIndex = 0;
                
function addCategory() {
    const container = document.getElementById('category-section');
    const html = `
    <br>
    <div class="form-group">
        <label>Category Name:</label>
        <input 
        type="text" 
        name="categories[${categoryIndex}][category_name]" 
        required
        >
    </div>
    <div class="form-group">
        <label>Description:</label>
        <input 
        type="text" 
        name="categories[${categoryIndex}][category_description]"
        >
    </div>
    <div class="form-group">
        <label for="category_budget">
        Allowance for Category:
        </label>
        <input 
        type="text" 
        class="form-control currencyInput"
        name="categories[${categoryIndex}][category_budget_allowance]" 
        id="category-currency-${categoryIndex}"  
        placeholder="$0.00"
        required
        >
    </div>
    <button type="button" onclick="removeCategory(this)" class="button-delete">
        Remove Category
    </button>
    <br>
    `;
    const div = document.createElement('div');
    div.innerHTML = html;
    container.appendChild(div);
    categoryIndex++; // Increment the index for each new category added
}


function removeCategory(button) {
    button.parentElement.remove();
}

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
