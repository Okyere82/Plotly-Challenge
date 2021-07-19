// Defining function that will run on page load
function init() {

  // Grabing a reference to the dropdown select element
var grab = d3.select("#selDataset");

// Using sample names to populate the select options
d3.json("samples.json").then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    grab
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Using the sample from the list to build the initial plots
  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});

}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    d3.json("samples.json").then((data) => {
        var metadata= data.metadata;
        var resultsarray= metadata.filter(sampleobject => 
          sampleobject.id == sample);
        var result= resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
          panel.append("h6").text(`${key}: ${value}`);
        });
    
    
    
    
      });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

   // Use `d3.json` to fetch the sample data for the plots
d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var result= resultsarray[0]
  
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
  
  
  
            // Building  Bubble Chart  //
  
  
  
    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
      var DataBubble = [ 
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];
  
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);
  
  
  
  
                //  Building a BAR Chart
  
  
    var bar_data =[
      {
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
  
      }
    ];
  
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
  }
   
  
  function init() {
  // Grab a reference to the dropdown select element
  var grab = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      grab
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
    
}


function optionChanged(newsample){
    // Fetch new data each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);

}

// Initialize dashboard on page load
init();
