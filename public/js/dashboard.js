// console.log('userDashboard.js loaded');
const userDisplayName = document.getElementById("welcomeUser");
// const totalBudget = document.getElementById("budgetTotal");
// const totalMonthlyIncome = document.getElementById("monthlyIncome");


// document.addEventListener('DOMContentLoaded', function() {
  // fetch('/api/user')
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data);
  //   userDisplayName.innerText = `${data.firstName} ${data.lastName}`;
  // })
  // .catch(error => console.error('Error loading user:', error));

  // fetch('/api/budgets')
  // .then(response => response.json())
  // .then(data => {
  //   if(data.length === 0) {
  //     let budgetDiv = document.getElementById('pieDiv');
  //     budgetDiv.innerHTML = '<h3>No budget to display</h3>';
  //     budgetDiv.style.textAlign = 'center';
  //     return;
  //   }
  //   console.log(data[0]);
  //   totalMonthlyIncome.innerText = `Total Monthly Income: ${data[0].monthly_income}`;
  //   const categories = data[0].categories;

  //   var total_budget = 0;
  //   for (const category in categories) {
  //     total_budget += Number(categories[category].category_budget_allowance);
  //     console.log(categories[category].category_budget_allowance);
  //   }
  //   console.log("Total Budget: ",total_budget);
  //   totalBudget.textContent = `Total Budget: ${total_budget}`; 
    
  //   var chart_data = [{
  //     values: categories.map(category => category.category_budget_allowance),
  //     labels: categories.map(category => category.category_name),
  //     type: 'pie'
  //   }];
  //   var layout = {
  //     title: "Budget Allocation",
  //     height: 450,
  //     width: 450
  //   };

  //   Plotly.newPlot('pieDiv', chart_data, layout);

  // }
  // )
  // .catch(error => console.error('Error loading budgets:', error));




//   fetch('/api/goals')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if(data.length === 0) {
//         let goalDiv = document.getElementById('goalDiv');
//         goalDiv.innerHTML = '<h3>No goals to display</h3>';
//         goalDiv.style.textAlign = 'center';
//         return;
//       }
//       let goalTitle = data[0].title;
//       let goalTargetAmount = data[0].targetAmount;
//       let goalSavedAmount = data[0].savedAmount;
//       let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

//       var data = [{
//         values: [goalRemainingAmount, goalSavedAmount],
//         labels: ['To Save', 'Saved'],
//         text: 'Goal',
//         textposition: 'inside',
//         domain: {column: 1},
//         name: goalTitle,
//         hoverinfo: 'label+percent',
//         hole: .6,
//         type: 'pie'
//       }];
      
//       var layout = {
//         title: goalTitle,
//         annotations: [
//           {
//             font: {
//               size: 12
//             },
            
//             showarrow: false,
//             text: 'Goal',
//             x: 0.5,
//             y: 0.5
//           }
//         ],
//         height: 450,
//         width: 280,
//         showlegend: true,
//         grid: {rows: 1, columns: 1}
//       };
      
//       Plotly.newPlot('goalDiv', data, layout);
//     }
//     );
// });

// console.log('userDashboard.js loaded');

// // Helper function for error handling
// function handleError(error, source) {
//   console.error(`Error from ${source}:`, error); // TO-DO: update UI telling user error occurred
// }

// // Check response validity
// function checkResponseStatus(response) {
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response;
// }


document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/user')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      userDisplayName.innerText = `Welcome, ${data.firstName}!`;
    })
    .catch(error => handleError(error, 'loading user'));

  fetch('/api/budgets')
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => handleError(error, 'loading budgets'));

  fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => handleError(error, 'loading goals'));
});