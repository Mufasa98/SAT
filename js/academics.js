function buildMetadata(sample) {
  d3.json('../data/compiled_data.json').then((data) => {
    //demographics box change. ggs lols it was the square brackets! 
    let sample_obj = data[2].demograph[sample];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata')

    // Use `.html("") to clear any existing metadata -- so it doesn't keep adding on 
    panel.html('')

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (i in sample_obj) {
      panel.append('h6').text(`${i}: ${sample_obj[i]}`);
    }
    // BONUS: Build the Gauge Chart
    let gaugey = {
      type: 'indicator',
      mode: 'number+gauge+delta',
      gauge: {shape: "bullet"},
      value: sample_obj['Admission Rate'],
      
    };
    
    let gLayout = {
      width: 600,
      height: 400,
      title: '% University Admission Rate'

    };
  Plotly.newPlot('gauge', [gaugey], gLayout)
  });
}


function buildCharts(sample) {
  d3.json('../data/compiled_data.json').then((data) => {

    let  xValues = data[4].gender_completion_clean[sample];
    

    // Build a Bubble Chart
    let bubbleData = {
    //
      x: xValues["School_Id"],
      
    //
      y:  xValues["% Male Students Withdrawn by 4yrs"],
      text: xValues["% Male Students Withdrawn by 4yrs"],
      mode: 'markers',
      marker: {
        size: xValues["% Male Students Withdrawn by 4yrs"]
    }};
    
    let bubbleLayout = {
      height: 500,
      width: 1000,
      xaxis: {title: {
        text: 'School v. % Male Withdrawn'

      }}
    };

    Plotly.newPlot("bubble", [bubbleData], bubbleLayout,{responsive:true});
    
    let barData = {
      //
        x: xValues["School_Id"],
        y: xValues["% Male Students Withdrawn by 4yrs"],
        text: xValues["% Male Students Withdrawn by 4yrs"],
        type: 'bar',
        orientation: 'h'
      };
      
      Plotly.newPlot("bar", [barData],{responsive:true});
    
  })

};

function init() {
  // Grab a reference to the dropdown select element
  let dropdown = d3.select('#selDataset');
  // Use the list of sample names to populate the select options
  d3.json('../data/schools.json').then((data) => {
    let sampleNames = data;
    
    for (let i = 0; i < sampleNames.length; i++) {
      //append the option tag's value (hence property) to whatever university we're currently on .text which number it is
      dropdown.append('option').property('value', sampleNames[i]).text(sampleNames[i]);
    };
  buildMetadata(sampleNames[0]);
  //buildCharts(sampleNames[0]);
  })};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  //buildCharts(newSample);
};

// Initialize the dashboard
init();



