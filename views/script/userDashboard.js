console.log('userDashboard.js loaded');
const userDisplayName = document.getElementById("welcomeUser");
const totalMonthlyIncome = document.getElementById("totalMonthlyIncome");
document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    userDisplayName.innerText = `Welcome, ${data.firstName} ${data.lastName}!`;
  })
  .catch(error => console.error('Error loading user:', error));

  fetch('/api/budgets')
  .then(response => response.json())
  .then(data => {
    if(data.length === 0) {
      let goalDiv = document.getElementById('goalDiv');
      goalDiv.innerHTML = '<h3>No budget to display</h3>';
      return;
    }
    console.log(data[0]);
    totalMonthlyIncome.innerText = `Total Monthly Income: ${data[0].monthly_income}`;
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

  fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.length === 0) {
        let goalDiv = document.getElementById('goalDiv');
        goalDiv.innerHTML = '<h3>No goals to display</h3>';
        return;
      }
      let goalTitle = data[0].title;
      let goalTargetAmount = data[0].targetAmount;
      let goalSavedAmount = data[0].savedAmount;
      let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

      var data = [{
        values: [goalRemainingAmount, goalSavedAmount],
        labels: ['To Save', 'Saved'],
        text: 'Goal',
        textposition: 'inside',
        domain: {column: 1},
        name: goalTitle,
        hoverinfo: 'label+percent',
        hole: .5,
        type: 'pie'
      }];
      
      var layout = {
        title: goalTitle,
        annotations: [
          {
            font: {
              size: 20
            },
            
            showarrow: false,
            text: 'Goal',
            x: 0.5,
            y: 0.5
          }
        ],
        height: 400,
        width: 700,
        showlegend: true,
        grid: {rows: 1, columns: 1}
      };
      
      Plotly.newPlot('goalDiv', data, layout);
    }
    );
});