console.log("budgetPage.js loaded");
let budgetId = '';
const deleteBudgetBtn = document.getElementById('deleteBudget');
const budgetDescription = document.getElementById('budgetDescription');
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/budgets')
    .then(response => response.json())
    .then(data => {
        deleteBudgetBtn.disabled = (data.length === 0);
        if(data.length === 0) {
            let goalDiv = document.getElementById('pieDiv');
            goalDiv.innerHTML = '<h3>No budget to display</h3>';
            return;
        }
        
        console.log(data[0]);
        const categories = data[0].categories;
        budgetId = data[0]._id;
        budgetDescription.textContent = data[0].budget_description;
        var chart_data = {
        values: categories.map(category => category.category_budget_allowance),
        labels: categories.map(category => category.category_name),
        type: 'pie'
        };
        var layout = {
        title: "Budget Allocation",
        height: 500,
        width: 800
        };

        Plotly.newPlot('pieDiv', [chart_data], layout);

    })
    .catch(error => console.error('Error loading budgets:', error));

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
}
);