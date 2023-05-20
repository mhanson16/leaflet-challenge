// url from USGS of past 7 days earthquakes M4.5+
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

function createMap(earthQuakes) {

    // Create the tile layer that will be the background of our map.
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    var baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the Earth Quake location layer.
    var overlayMaps = {
      "Earth Quake Location": quakeLocation
    };
  
    // Create the map object with options.
    var map = L.map("map-id", {
      center: [40.73, -74.0059],
      zoom: 12,
      layers: [streetmap, quakeLocation]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "features" property from response.data.
    var features = response.data.features;
  
    // Initialize an array to hold bike markers.
    var quakeMarkers = [];
  
    // Loop through the stations array.
    for (var index = 0; index < features.length; index++) {
      var feature = features[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      var bikeMarker = L.marker([station.lat, station.lon])
        .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      bikeMarkers.push(bikeMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(createMarkers);