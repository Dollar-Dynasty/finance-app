console.log("goalsPage.js loaded");
let goalId = '';
let data = [];
const goalSelect = document.getElementById('goalSelect');
const deleteGoalBtn = document.getElementById('deleteGoal');
const goalDescription = document.getElementById('goalDescription');
const daysRemainingLabel = document.getElementById("daysRemaining");
const totalDaysLabel = document.getElementById("dayDifference");
const currentSavingsLabel = document.getElementById("amountSaved");
const targetSavingsLabel = document.getElementById("targetRemain");
const goalDetailContainer = document.getElementById('goalDetailContainer');

function displayGoalDetail(data) {
  let card = document.createElement('div');
  card.className = 'card-container';
  let title = document.createElement('h3');
  title.innerText = data.title;
  let description = document.createElement('p');
  description.innerText = data.description;
  let createdAt = document.createElement('p');
  createdAt.innerText = `Created at: ${new Date(data.createdAt).toLocaleDateString()}`;
  let deadline = document.createElement('p');
  deadline.innerText = `Deadline: ${new Date(data.deadline).toLocaleDateString()}`;
  let targetAmount = document.createElement('p');
  targetAmount.innerText = `Target Amount: ${data.targetAmount}`;
  let savedAmount = document.createElement('p');
  savedAmount.innerText = `Saved Amount: ${data.savedAmount}`;
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(createdAt);
  card.appendChild(deadline);
  card.appendChild(targetAmount);
  card.appendChild(savedAmount);

  goalDetailContainer.appendChild(card);
}


function displayGoalAtIndex(index) {
  if(index < 0 || index >= data.length) {
    console.error("Invalid index:", index);
    return;
  }
  let goalTitle = data[index].title || "Goal";
      goalDescription.textContent = data[index].description || "No description";
      let goalTargetAmount = data[index].targetAmount;
      let goalSavedAmount = data[index].savedAmount;
      let goalRemainingAmount = goalTargetAmount - goalSavedAmount;
      const createdAt =  new Date(data[index]["createdAt"]);
      const deadline = new Date(data[index]["deadline"]);
      const timeDifference = deadline.getTime() - createdAt.getTime();
      const currentDate = new Date();
      const timeRemaining = deadline.getTime() - currentDate.getTime();
      const daysRemaining = Math.round(timeRemaining/(1000*3600*24));
      daysRemainingLabel.innerText = `Days remaining until deadline: ${daysRemaining}`;
      const dayDifference = Math.round(timeDifference/(1000*3600*24));
      const targetRemain = data[index].targetAmount - data[index].savedAmount;
      const amountSaved = data[index].savedAmount;
      currentSavingsLabel.innerText = `Current Savings: ${amountSaved}`;
      targetSavingsLabel.innerText = `Amount needed to reach goal: ${targetRemain}`;
      totalDaysLabel.innerText = `Total Days for Goal: ${dayDifference}`;
      displayGoalDetail(data[index]);
      let plotData = [{
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
      
      let layout = {
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
        showlegend: false,
        grid: {rows: 1, columns: 1},
        margin: {l: 0, r: 0, b: 0, t: 0}
      };
      
      Plotly.newPlot('goalDiv', plotData, layout);
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/goals')
    .then(response => response.json())
    .then(inData => {
      deleteGoalBtn.disabled = (inData.length === 0);
      console.log(inData);
      if(inData.length === 0) {
        let goalDiv = document.getElementById('goalDiv');
        goalDiv.innerHTML = '<h3>No goals to display</h3>';
        return;
      }
      data = inData;
      data.forEach(goal => {
        let option = document.createElement('option');
        option.value = goal._id;
        option.text = goal.title;
        goalSelect.appendChild(option);
      });
      displayGoalAtIndex(0);
    })
    .catch(error => console.error('Error loading goals:', error));

    goalSelect.addEventListener('change', function() {
      console.log("Selected goal:", goalSelect.value);
      goalId = goalSelect.value;
      goalDetailContainer.removeChild(goalDetailContainer.lastChild);
      displayGoalAtIndex(data.findIndex(goal => goal._id === goalId));
    });
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