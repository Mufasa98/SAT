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

function buildChart(sample) {

  //grab value points for graph
  d3.json('../data/compiled_data.json').then((data) => {
    //data[0] = access to the academics_clean portion of the json file
    let academicValue = data[0].academics_clean[sample];
    //initialize empty list to hold x and y values
    let gradaution =[]
    let retention =[]

    let gradRates = academicValue['General Completion Rate'];
    let retentionRates = academicValue['Retention Rate FT'];

    //push that value into the scatterXvalues list
    gradaution.push(gradRates);
    retention.push(retentionRates);
    
    //Create the plot
    let trace1 = {
      x: ['graduation Rates'],
      y: gradaution,
      name: 'Graduation Rate',
      type: 'bar',
    };

    let trace2 = {
      x: ['Retention Rates'],
      y: retention,
      name: 'Retention Rate',
      type: 'bar',
    };

  let layout = {
    title: 'Graduation & Retention Rates',
    yaxis: { title: 'Percentage Rate'}
  };

  Plotly.newPlot('bar', [trace1, trace2], layout);
});

};


function createMarkers(sample) {

  d3.json('../data/compiled_data.json').then((data) => {
  // Pull the "stations" property from response.data.
  let coordinValue = data[0].academics_clean[sample];

  //initialize empty list to hold marker
    objkeys = Object.keys(coordinValue);

    let latait = coordinValue['Latitude'];
    let longit = coordinValue['Longitutde'];
  
  // //school name, student count, admission rate, demographic percentage
    let uniMarkers = L.marker([latait, longit])
      .bindPopup("<h3>" + 'test' + "<h3><h3>Capacity: " + 'test' + "</h3>");
  
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };

// Create an overlayMaps object to hold the unimarkers layer.
    let overlayMaps = {
      "Unviversities": uniMarkers
    };

// Create the map object with options.
    let map = L.map("map", {
      center: [45.52, -122.67],
      zoom: 4,
      layers: [streetmap,uniMarkers]
    });

// Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
    });
  
  };

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
  buildChart(sampleNames[0]);
  createMarkers(sampleNames[0]);



  })};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildChart(newSample);
  createMarkers(newSample)
};

// Initialize the dashboard
init();














