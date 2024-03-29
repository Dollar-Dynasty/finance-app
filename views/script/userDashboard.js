console.log('userDashboard.js loaded');
const userDisplayName = document.getElementById("welcomeUser");
const totalBudgetLabel = document.getElementById("budgetTotal");
const totalMonthlyIncome = document.getElementById("totalMonthlyIncome");
const goalContainer = document.getElementById("goalContainer");

function displayGoals(data){
  if(data.title === undefined) {
    return;
  }

  let goalTitle = data.title;
  let goalTargetAmount = data.targetAmount;
  let goalSavedAmount = data.savedAmount;
  let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

  let goalCard = document.createElement('div');
  goalCard.className = 'card-container';
  goalCard.innerHTML = `
  <h2 class="card-title">${goalTitle}</h2>
  <div id="${data._id}"></div>
  `;
  goalContainer.appendChild(goalCard);


  var chart_data = [{
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
    height: 350,
    width: 350,
    showlegend: true,
    grid: {rows: 1, columns: 1}
  };
  
  Plotly.newPlot(`${data._id}`, chart_data, layout);
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    userDisplayName.innerText = `Welcome, ${data.firstName} ${data.lastName}!`;
  })
  .catch(error => console.error('Error loading user:', error));

  fetch('/api/goals')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.length === 0) {
      goalContainer.innerHTML = '<h3>No goals to display</h3>';
      return;
    }
    for (let goal = 0; goal < data.length; goal++) {
      displayGoals(data[goal]);
    }
  })
  .catch(error => console.error('Error loading goals:', error));
  

  fetch('/api/budgets')
  .then(response => response.json())
  .then(data => {
    if(data.length === 0) {
      let budgetDiv = document.getElementById('pieDiv');
      budgetDiv.innerHTML = '<h3>No budget to display</h3>';
      budgetDiv.style.textAlign = 'center';
      return;
    }
    console.log(data[0]);
    totalMonthlyIncome.innerText = `Total Monthly Income: ${data[0].monthly_income}`;
    const categories = data[0].categories;

    var total_budget = 0;
    for (const category in categories) {
      total_budget += Number(categories[category].category_budget_allowance);
      console.log(categories[category].category_budget_allowance);
    }
    console.log("Total Budget: ",total_budget);
    totalBudgetLabel.textContent = `Total Budget: $${total_budget}`; 
    
    var chart_data = {
      values: categories.map(category => category.category_budget_allowance),
      labels: categories.map(category => category.category_name),
      type: 'pie'
    };
    var layout = {
      title: data[0].budget_title,
      height: 550,
      width: 720
    };

    Plotly.newPlot('pieDiv', [chart_data], layout);

  })
  .catch(error => console.error('Error loading budgets:', error));

  fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayGoals(data);
    }
    );
});