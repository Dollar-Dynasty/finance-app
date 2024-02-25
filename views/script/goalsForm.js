const goalName = document.getElementById("goal_name").value;
const goalDescription = document.getElementById("goal_description");
goalDescription.innerText = "";
const goalAmountInput = document.getElementById("goal_amount");
const goalAmount = parseFloat(goalAmountInput.value.replace(/\$/g, '')); // remove $ sign before parsing
const endDate = document.getElementById("goal_end_date").value;


document.addEventListener("DOMContentLoaded", function() {
    const goalForm = document.getElementById("goal_form");
    // const addGoalBtn = document.getElementById("add_goal_btn");
    

    goalForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Validate goal fields

        if (goalName.trim() === "" ) {
            alert("Please enter the goal name.");
            return;
        }

        

        // if (isNaN(goalAmountInput.value) || goalAmountInput.value < 20) {
        //     alert("Goal amount must be at least $20 and in a valid currency format.");
        //     return;
        // }

        // Format goal amount to currency with $0.00 format
        //goalAmountInput.value = goalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // If all validations pass, submit the form
        goalForm.submit();
    });
    // TODO: Add functionality to add multiple goals at once
    // let goalsCount = 0;
    // addGoalBtn.addEventListener("click", function() {
    //     if (goalsCount >= 10) {
    //         alert("You can add up to 10 goals at a time.");
    //         return;
    //     }

    //     const goalDiv = document.createElement("div");
    //     goalDiv.innerHTML = `
    //         <h3>Goal ${goalsCount + 2 }</h3>
    //         <label for="goal_name_${goalsCount}">Goal Name:</label>
    //         <input type="text" name="goal_name_${goalsCount}" id="goal_name_${goalsCount}" placeholder="Goal Name" maxlength="50" required><br><br>
            
    //         <label for="goal_description_${goalsCount}">Goal Description:</label>
    //         <textarea name="goal_description_${goalsCount}" id="goal_description_${goalsCount}" placeholder="Goal Description" maxlength="150"></textarea><br><br>
            
    //         <label for="goal_amount_${goalsCount}">Goal Amount:</label>
    //         <input type="text" name="goal_amount_${goalsCount}" id="goal_amount_${goalsCount}" placeholder="$0.00" pattern="\$\d+(\.\d{2})?" required><br><br>
            
    //         <label for="goal_start_date_${goalsCount}">Start Date:</label>
    //         <input type="date" name="goal_start_date_${goalsCount}" id="goal_start_date_${goalsCount}" required><br><br>
            
    //         <label for="goal_end_date_${goalsCount}">End Date:</label>
    //         <input type="date" name="goal_end_date_${goalsCount}" id="goal_end_date_${goalsCount}" required><br><br>
    //     `;
    //     goalForm.insertBefore(goalDiv, addGoalBtn);
    //     goalsCount++;
    // });
});