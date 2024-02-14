let userGoals = fetch('/api/goals')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let goalTitle = data[0].title;
    let goalTargetAmount = data[0].targetAmount;
    let goalSavedAmount = data[0].savedAmount;
    let goalRemainingAmount = goalTargetAmount - goalSavedAmount;

    var data = [{
      values: [goalTargetAmount, goalSavedAmount],
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
    
    Plotly.newPlot('myDiv', data, layout);
    
  }
  );