console.log("budgetPage.js loaded");
let budgetId = '';
const addBudgetBtn = document.getElementById('addBudget');
const deleteBudgetBtn = document.getElementById('deleteBudget');
const budgetDetailContainer = document.getElementById('budgetDetailContainer');
// set the addBudgetBtn to disabled by default
addBudgetBtn.disabled = true;

function displayBudgetDetail(data) {
    let card = document.createElement('div');
    card.className = 'card-container';
    card.classList.add('container-small');
    let title = document.createElement('h3');
    title.innerText = data.budget_title;
    let description = document.createElement('p');
    description.innerText = data.budget_description;
    card.appendChild(title);
    card.appendChild(description);
    budgetDetailContainer.appendChild(card);
}

function displayBudgetCategoryDetail(data, container = budgetDetailContainer) {
    let card = document.createElement('div');
    card.className = 'card-container';
    let title = document.createElement('h3');
    title.innerText = data.category_name;
    let description = document.createElement('p');
    description.innerText = data.category_description;
    let allowance = document.createElement('p');
    allowance.innerText = `Allowance: ${data.category_budget_allowance}`;
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(allowance);
    container.appendChild(card);
}

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

        displayBudgetDetail(data[0]);
        budgetDetailContainer.appendChild(document.createElement('hr'));
        let categoryCard = document.createElement('div');
        categoryCard.className = 'card-container';
        categoryCard.classList.add('container-small');
        let categoryTitle = document.createElement('h3');
        categoryTitle.innerText = 'Categories';
        categoryCard.appendChild(categoryTitle);
        budgetDetailContainer.appendChild(categoryCard);
        categories.forEach(category => {
            displayBudgetCategoryDetail(category, categoryCard);
        });
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