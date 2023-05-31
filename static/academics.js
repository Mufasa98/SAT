//build metadata literally builds the information thats being shown on the webpage
function buildMetadata(sample) {
  d3.json('data/compiled.json').then((data) => {
    //demographics box change. 
    let sample_obj = data[2].demograph[sample];
    let averageSat = data[0].academics_clean[sample];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata')

    // Use `.html("") to clear any existing metadata -- so it doesn't keep adding on 
    panel.html('')

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
      width: 300,
      height: 200,
      title: 'SAT Average'
    };

  Plotly.newPlot('gauge', [gaugey], gLayout)
  
  });
}

function buildChart(sample) {

  //grab value points for graph
  d3.json('data/compiled.json').then((data) => {
    //data[0] = access to the academics_clean portion of the json file
    let academicValue = data[0].academics_clean[sample];
    //initialize empty list to hold x and y values
    let gradaution =[]
    let retention =[]

    let gradRates = academicValue['General Completion Rate'];
    let retentionRates = academicValue['Retention Rate FT'];

    //push those values into the empty lists
    gradaution.push(gradRates);
    retention.push(retentionRates);
    
    //Create the plot
    let trace1 = {
      x: ['graduation Rates'],
      y: gradaution,
      name: 'Graduation Rate',
      type: 'bar',
      text: gradaution.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: '#c7e8f3',
        opacity: 0.75,
        line: {
        color:'#000000',
        width: 1.5
        }
      }
    };

    let trace2 = {
      x: ['Retention Rates'],
      y: retention,
      name: 'Retention Rate',
      type: 'bar',
      text: retention.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: '#bf9aca',
        opacity: 0.75,
        line: {
        color: '#000000',
        width: 1.5
        }
      }
    };

  let layout = {
    title: 'Graduation & Retention Rates',
    yaxis: { title: 'Percentage Rate'}
    
  };

  Plotly.newPlot('bar', [trace1, trace2], layout);
});

};

//initialize the map variable
let map;

function createMarkers(sample) {
//REMOVE AND CREATE NEW MAP CONTAINER CODE CREATED WITH CHATGPT.
  // Remove the existing map container, if any
  const existingMapContainer = document.getElementById('map');
  if (existingMapContainer) {
    existingMapContainer.remove();
  }

  // Create a new map container element
  const newMapContainer = document.createElement('div');
  newMapContainer.id = 'map';
  newMapContainer.style.height = '400px';
  newMapContainer.style.width = '600px';

  // Append the new map container to the desired parent element in the DOM
  const parentElement = document.getElementById('map-container');
  parentElement.appendChild(newMapContainer);


  d3.json('data/compiled.json').then((data) => {
    let coordinValue = data[0].academics_clean[sample];
  //initialize empty list to hold lat/lon coordinates
    objkeys = Object.keys(coordinValue);
    let latait = coordinValue['Latitude'];
    let longit = coordinValue['Longitutde'];
  
    // variables for the pop-up information
      //school names
    let uniInfo = data[2].demograph[sample];
  
    let schoolName = uniInfo['School Name']; 

    //income information
    let studentIncome = data[6].income_clean[sample];
    let medincome = studentIncome['Median Family Income'];
    let lowIncome = studentIncome['% of Low Income that completed within 4 years']; 
    let highIncome = studentIncome['% of High Income that completed 4 years'];

    let customIcon = {
    //icon came from:
    //https://www.flaticon.com/free-icon/university_8074800?term=university&page=1&position=1&origin=search&related_id=8074800
      iconUrl:'https://cdn-icons-png.flaticon.com/128/8074/8074800.png',
      iconSize:[40,40]
     };

    let myIcon = L.icon(customIcon);
    
    let iconOption = {
      icon:myIcon
     };
    
    let uniMarkers = L.marker([latait, longit],iconOption)
      .bindPopup("<h2>" + schoolName + "<h2><h3> Median Family Income: $"  + medincome + "</h3><h3>Low income students graduated: "  + lowIncome + "%</h3><h3>High income students graduated: "  + highIncome + "%</h3>");
  
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
// Create an overlayMaps object to hold the unimarkers layer.
    let overlayMaps = {
      "Universities": uniMarkers
    };
// Create the map object with options.
    let map = L.map("map", {
      center: [45.52, -122.67],
      zoom: 13,
      layers: [streetmap,uniMarkers]
    });
    // Update the map's center to the new marker's position
    map.panTo([latait, longit]);
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
  d3.json('data/compiled.json').then((data) => {
    let sampleNames = data[7].schools;
    
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

//music source: https://www.youtube.com/watch?v=GgoDhs5lsBQ 
//Pomp and Circumstance composed by Sir Edward Elgar
function playMusic(){
  let gradMusic = new Audio('music/pomp.mp3');
  gradMusic.volume = 0.30;
  gradMusic.play();
  }











