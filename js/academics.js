function buildMetadata(sample) {
  d3.json('../data/compiled_data.json').then((data) => {
    //demographics box change. ggs lols it was the square brackets! 
    let sample_obj = data[2].demograph[sample];
    let averageSat = data[0].academics_clean[sample];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata')

    // Use `.html("") to clear any existing metadata -- so it doesn't keep adding on 
    panel.html('')

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (i in sample_obj) {
      panel.append('h6').text(`${i}: ${sample_obj[i]}`);
    }
    // Build the Gauge Chart
    let gaugey = {
      type: 'indicator',
      mode: 'number+gauge+delta',
      gauge: {shape: "bullet"},
      value: averageSat["SAT Average Overall"],
      
    };
    
    let gLayout = {
      width: 400,
      height: 200,
      title: 'SAT Average'

    };
  Plotly.newPlot('gauge', [gaugey], gLayout)
  });
}

function init() {
  // Grab a reference to the dropdown select element
  let dropdown = d3.select('#selDataset');
  // Use the list of sample names to populate the select options
  d3.json('../data/schools.json').then((data) => {
    let sampleNames = data;
    
    for (let i = 0; i < sampleNames.length; i++) {
      //append the option tag's value (hence property) to whatever university 
      dropdown.append('option').property('value', sampleNames[i]).text(sampleNames[i]);
    };
  buildMetadata(sampleNames[0]);
  })};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample)
};

// Initialize the dashboard
init();

//grab value points for graph
d3.json('../data/compiled_data.json').then((data) => {
  //data[0] = access to the academics_clean portion of the json file
  let  academicValues = data[0]; 
  //initialize empty list to hold SAT Average Scores
  let scatterXvalues =[]
  //for loop to iterate through each university and grab the sat average value
  for (let i = 0; i < academicValues.length; i++) {
    let satAverage = academicValues[i]['SAT Average Overall'];
  //push that value into the scatterXvalues list
    scatterXvalues.push(academicValues[i]['SAT Average Overall']);
    console.log(scatterXvalues);

  //data[0] = access to the academics_clean portion of the json file
  let  academicValues2 = data[0]; 
    //initialize empty list to hold SAT Average Scores
  let scatterYvalues =[]
    //for loop to iterate through each university and grab the sat average value
  for (let i = 0; i < academicValues2.length; i++) {
    let retentionRate = academicValues2[i]['Retention Rate FT Overall'];
    //push that value into the scatterXvalues list
    scatterYvalues.push(academicValues[i]['Retention Rate FT Overall']);
    console.log(scatterYvalues);
    
  };
};

  // Build Scatter 
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
  };
  
  var data = [trace1, trace2];
  
  Plotly.newPlot('scatter', data);
    
  });

  //build map
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



