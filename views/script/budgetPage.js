console.log("budgetPage.js loaded");
let budgetId = '';
const addBudgetBtn = document.getElementById('addBudget');
const deleteBudgetBtn = document.getElementById('deleteBudget');
const budgetTitle = document.getElementById('budgetTitle');
const budgetDescription = document.getElementById('budgetDescription');
// set the addBudgetBtn to disabled by default
addBudgetBtn.disabled = true;

document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/budgets')
    .then(response => response.json())
    .then(data => {
        deleteBudgetBtn.disabled = (data.length === 0);
        if(data.length === 0) {
            let goalDiv = document.getElementById('pieDiv');
            addBudgetBtn.disabled = false;
            goalDiv.innerHTML = '<h3>No budget to display</h3>';
            return;
        }
        
        console.log(data[0]);
        const categories = data[0].categories;
        budgetId = data[0]._id;
        budgetTitle.textContent = data[0].budget_title;
        budgetDescription.textContent = data[0].budget_description;
        let chart_data = {
            values: categories.map(category => category.category_budget_allowance),
            labels: categories.map(category => category.category_name),
            type: 'pie'
        };
        let layout = {
            title: data[0].budget_title || "Budget Allocation",
            height: 500,
            width: 800,
            showlegend: false,
            grid: {rows: 1, columns: 1},
            margin: {l: 0, r: 0, b: 0, t: 0},
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
            window.location.href = '/budget-form';
        })
        .catch(error => console.error('Error deleting budget:', error));
    });
}
);