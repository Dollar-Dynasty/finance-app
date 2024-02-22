console.log("budgetPage.js loaded");
let budgetId = '';
const deleteBudgetBtn = document.getElementById('deleteBudget');
const budgetDescription = document.getElementById('budgetDescription');



document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //userDisplayName.innerText = `Welcome ${data.firstName}!`;
    })
    .catch(error => console.error('Error loading user:', error));
  
    fetch('/api/budgets')
    .then(response => response.json())
    .then(data => {
      if(data.length === 0) {
        let budgetDiv = document.getElementById('budgetPieChart');
        budgetDiv.innerHTML = '<h3>No budget to display</h3>';
        budgetDiv.style.textAlign = 'center';
        return;
      }
      console.log(data[0]);
      //totalMonthlyIncome.innerText = `Total Monthly Income: ${data[0].monthly_income}`;
      const categories = data[0].categories;
  
      var total_budget = 0;
      for (const category in categories) {
        total_budget += Number(categories[category].category_budget_allowance);
        console.log(categories[category].category_budget_allowance);
      }
      console.log("Total Budget: ",total_budget);
      //totalBudget.textContent = `Total Budget: ${total_budget}`; 
      
      var chart_data = [{
        values: categories.map(category => category.category_budget_allowance),
        labels: categories.map(category => category.category_name),
        type: 'pie'
      }];
      var layout = {
        title: "Budget Allocation",
        height: 450,
        width: 450
      };
  
      Plotly.newPlot('budgetPieChart', chart_data, layout);
  
    })
    .catch(error => console.error('Error loading goals:', error));
});
























// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/api/budgets')
//     .then(response => response.json())
//     .then(data => {
//         deleteBudgetBtn.disabled = (data.length === 0);
//         if(data.length === 0) {
//             let goalDiv = document.getElementById('budgetPieChart');
//             goalDiv.innerHTML = '<h3>No budget to display</h3>';
//             return;
//         }
        
//         console.log(data[0]);
//         const categories = data[0].categories;
//         budgetId = data[0]._id;
//         budgetDescription.textContent = data[0].budget_description || 'no description';

//         var chart_data = [{
//             values: categories.map(category => category.category_budget_allowance),
//             labels: categories.map(category => category.category_name),
//             type: 'pie'
//         }];

//         var layout = {
//             title: "Budget Allocation",
//             height: 500,
//             width: 800
//         };

//         Plotly.newPlot('budgetPieChart', chart_data, layout);

//     });



deleteBudgetBtn.addEventListener('click', function() {
    if(!budgetId) {
        console.error('No budget to delete');
        return;
    }
    if(!confirm('Are you sure you want to delete this budget?')) {
        return;
    }
    fetch(`/api/deleteBudget`, { method: 'DELETE', body: JSON.stringify({ budgetId: budgetId }), headers: { 'Content-Type': 'application/json' } })
        .then(response => response.text())
        .then(data => {
        console.log("Deleted:",data);
        window.location.href = '/user-dashboard';
    })
    .catch(error => console.error('Error deleting budget:', error));
});