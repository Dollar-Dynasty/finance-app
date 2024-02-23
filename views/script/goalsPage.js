console.log("goalsPage.js loaded");
let goalId = '';
const deleteGoalBtn = document.getElementById('deleteGoal');
const goalDescription = document.getElementById('goalDescription');
const daysRemainingLabel = document.getElementById("daysRemaining");
const totalDaysLabel = document.getElementById("dayDifference");
const currentSavingsLabel = document.getElementById("amountSaved");
const targetSavingsLabel = document.getElementById("targetRemain");

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
      deleteGoalBtn.disabled = (data.length === 0);
      console.log(data);
      if(data.length === 0) {
        let goalDiv = document.getElementById('goalDiv');
        goalDiv.innerHTML = '<h3>No goals to display</h3>';
        return;
      }
      goalId = data[0]._id;
      let goalTitle = data[0].title;
      goalDescription.textContent = data[0].description;
      let goalTargetAmount = data[0].targetAmount;
      let goalSavedAmount = data[0].savedAmount;
      let goalRemainingAmount = goalTargetAmount - goalSavedAmount;
      const createdAt =  new Date(data[0]["createdAt"]);
      const deadline = new Date(data[0]["deadline"]);
      const timeDifference = deadline.getTime() - createdAt.getTime();
      const currentDate = new Date();
      const timeRemaining = deadline.getTime() - currentDate.getTime();
      const daysRemaining = Math.round(timeRemaining/(1000*3600*24));
      daysRemainingLabel.innerText = `Days reamining until deadline: ${daysRemaining}`;
      const dayDifference = Math.round(timeDifference/(1000*3600*24));
      const targetRemain = data[0].targetAmount - data[0].savedAmount;
      const amountSaved = data[0].savedAmount;
      currentSavingsLabel.innerText = `Current Savings: ${amountSaved}`;
      targetSavingsLabel.innerText = `Amount needed to reach goal: ${targetRemain}`;
      totalDaysLabel.innerText = `Total Days for Goal: ${dayDifference}`;

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
    })
    .catch(error => console.error('Error loading goals:', error));

    deleteGoalBtn.addEventListener('click', function() {
      if(!confirm('Are you sure you want to delete this goal?') || !goalId) {
        return;
      }
      fetch(`/api/deleteGoal`, { method: 'DELETE', body:JSON.stringify({goalId: goalId}) ,headers: { 'Content-Type': 'application/json' } })
      .then(response => response.text())
      .then(data => {
        console.log("Deleted:",data);
        window.location.href = '/user-dashboard';
      })
      .catch(error => console.error('Error deleting goal:', error));
    });
});