console.log("budgetPage.js loaded");
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/budgets')
    .then(response => response.json())
    .then(data => {
        if(data.length === 0) {
        let goalDiv = document.getElementById('goalDiv');
        goalDiv.innerHTML = '<h3>No budget to display</h3>';
        return;
        }
        console.log(data[0]);
        const categories = data[0].categories;

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
}
);