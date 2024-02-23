// console.log("goalsPage.js loaded");
// const goalDescription = document.getElementById('goalDescription');
// const goalTitle = document.getElementById('goalTitle');
// document.addEventListener("DOMContentLoaded", function() {
//     fetch('/api/goals')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if(data.length === 0) {
//         let goalDiv = document.getElementById('goalDiv');
//         goalDiv.innerHTML = '<h3>No goals to display</h3>';
//         return;
//       }


//       goalTitle.textContent = data[0].title;
//       goalDescription.textContent = data[0].description || 'no description';
//       let goalTargetAmount = data[0].targetAmount;
//       let goalSavedAmount = data[0].savedAmount;
//       let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

//       var data = [{
//         values: [goalRemainingAmount, goalSavedAmount],
//         labels: ['To Save', 'Saved'],
//         text: '',
//         textposition: 'inside',
//         domain: {column: 1},
//         name: goalTitle,
//         hoverinfo: 'label+percent',
//         hole: .5,
//         type: 'pie'
//       }];
      
//       var layout = {
//         title: goalTitle.textContent,
//         annotations: [
//           {
//             font: {
//               size: 20
//             },
            
//             showarrow: false,
//             text: '',
//             x: 0.5,
//             y: 0.5
//           }
//         ],
//         autosize: true,
//         responsive: true,
//         showlegend: true,
//         grid: {rows: 1, columns: 1}
//       };

//       (function() {
//         var gd = document.getElementById('goalDiv');
      
//         Plotly.plot(gd, [{
//             type: 'bar',
//             x: [1, 2, 3, 4],
//             y: [5, 10, 2, 8],
//             marker: {
//                 color: '#C8A2C8',
//                 line: {
//                     width: 2.5
//                 }
//             }
//         }], {
//             title: 'Responsive Plotly Chart',
//             font: {
//                 size: 16
//             },
//             autosize: true
//         });
      
//         window.onresize = function() {
//             Plotly.Plots.resize(gd);
//         };
      
//       })();
      
//       Plotly.newPlot('goalDiv', data, layout);
//     })
//     .catch(error => console.error('Error loading goals:', error));
// });








const goalDescription = document.getElementById('goalDescription');
const goalTitle = document.getElementById('goalTitle');
const daysRemainingLabel = document.getElementById("daysRemaining");
const totalDaysLabel = document.getElementById("dayDifference");
const currentSavingsLabel = document.getElementById("amountSaved");
const targetSavingsLabel = document.getElementById("targetRemain");

// array of color sets for the goals
const colorSets = [
  ['#FF6384', '#36A2EB'], // color set 1
  ['#FFCD56', '#FF9F40'], // color set 2
  ['#4BC0C0', '#9966FF']  // color set 3
];

document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.length === 0) {
        let goalDiv = document.getElementById('goalDiv');
        goalDiv.innerHTML = '<h3>No goals to display</h3>';
        return;
      }

      // Iterate through each goal to create a pie chart for each
      data.forEach((goal, index) => {
        goalTitle.textContent = goal.title;
        goalDescription.textContent = goal.description || 'no description';
        let goalTargetAmount = goal.targetAmount;
        let goalSavedAmount = goal.savedAmount;
        let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

        // Select color set based on the goal index
        let selectedColors = colorSets[index % colorSets.length];

        var chartData = [{
          values: [goalRemainingAmount, goalSavedAmount],
          labels: ['Remaining', 'Saved'],
          text: '',
          textposition: 'inside',
          domain: {column: 1},
          name: goalTitle,
          hoverinfo: 'label',
          hole: .3,
          type: 'pie',
          marker: {
            colors: selectedColors // Use the selected color set here
          }
        }];
        
        var layout = {
          paper_bgcolor: 'grey', // Change the background color here
          plot_bgcolor: 'grey',  // And here
          annotations: [{
            showarrow: false,
            text: '',
            x: 0.5,
            y: 0.5
          }],
          autosize: true,
          responsive: true,
          showlegend: true,
          grid: {rows: 1, columns: 1}
        };

        (function() {
        var gd = document.getElementById('goalDiv');
      
        Plotly.plot(gd, [{
            type: 'bar',
            x: [1, 2, 3, 4],
            y: [5, 10, 2, 8],
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
        }], {
            title: 'Responsive Plotly Chart',
            font: {
                size: 16
            },
            autosize: true
        });
      
        window.onresize = function() {
            Plotly.Plots.resize(gd);
        };
      
      })();


      function adjustLayoutForScreenSize() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) { // Example breakpoint for "smaller" screens
          // Adjust layout for smaller screens
          Plotly.relayout('goalDiv', {
            'legend.orientation': "h", // display horizontally
            'legend.x': 0.5, // Center legend below the chart
            'legend.xanchor': 'center',
            'legend.y': -0.1, // Adjust position to be below the chart
            'legend.font.size': 18 // Increase font size
          });
        } else {
          // Reset layout for larger screens
          Plotly.relayout('goalDiv', {
            'legend.orientation': "v", // display vertically
            'legend.x': 1, // Center legend below the chart
            'legend.xanchor': 'center',
            'legend.y': 1.3, // Adjust position to be below the chart
            'legend.font.size': 16 // Increase font size
          });
        }
      }
      
      // Adjust layout initially in case the screen size starts off small
      adjustLayoutForScreenSize();
      
      // Add event listener for window resize to adjust layout as needed
      window.addEventListener('resize', adjustLayoutForScreenSize);



        Plotly.newPlot('goalDiv', chartData, layout);
      });

    })



    fetch('/api/goals')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const createdAt =  new Date(data[0]["createdAt"]);
      const deadline = new Date(data[0]["deadline"]);
      const timeDifference = deadline.getTime() - createdAt.getTime();
      const dayDifference = Math.round(timeDifference/(1000*3600*24));
      totalDaysLabel.innerText = `Total Days for Goal: ${dayDifference}`;
  
      const currentDate = new Date();
      const timeRemaining = deadline.getTime() - currentDate.getTime();
      const daysRemaining = Math.round(timeRemaining/(1000*3600*24));
      daysRemainingLabel.innerText = `Days reamining until deadline: ${daysRemaining}`;
  
      const targetRemain = data[0].targetAmount - data[0].savedAmount;
      const amountSaved = data[0].savedAmount;
      currentSavingsLabel.innerText = `Current Savings: ${amountSaved}`;
      targetSavingsLabel.innerText = `Amount needed to reach goal: ${targetRemain}`;
    })
    .catch(error => console.error('Error loading goals:', error));  
});