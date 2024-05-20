const map = L.map("map", {
  minZoom: 2
}).setView([40.49, -3.56], 10);

const apiKey = "AAPK135e8566c63546d9876af84b2a0995eejoUe3eUQyhQ4fUbdfA_EdkOC79JakeVXkJbrlpgwLvDLMOFHLzTlLLJAdsO9UGVj"; //Personal ArcGis Developer API key

const basemapEnum = "osm/dark-gray"; //OSM basemap layer

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);

// Add airspace INSIGNIA layer
map.createPane("airspace");

L.esri.featureLayer({
  url: "https://servais.enaire.es/insignia/rest/services/INSIGNIA_SRV/Aero_SRV_VIGOR_V1/FeatureServer/41",
  style: (feature) => {
    return {
      fillColor: "none" 
    };
  }
}).addTo(map);

// Define a custom icon for aerodromes
const aerodromeIcon = L.icon({
  iconUrl: 'static/Icons/aerodrome_icon.png',  
  iconSize: [32, 32],  
  iconAnchor: [16, 16],  
});

//Add Aerodromes INSIGNIA layer
map.createPane("aerodromes");

L.esri.featureLayer({
  url: "https://servais.enaire.es/insignia/rest/services/INSIGNIA_SRV/Aero_SRV_VIGOR_V1/FeatureServer/3",
  pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, { icon: aerodromeIcon });
  }
}).addTo(map);

// Add marker layer for planes
const planesLayer = L.layerGroup().addTo(map);

// Function to add markers for planes
function addPlaneMarkers() {
fetch('/get_aircraft_data')  // Fetch aircraft data from Flask server
.then(response => response.json())
.then(data => {
    // Clear existing markers
    planesLayer.clearLayers();

    data.aircraft_data.forEach(plane => {  // Access aircraft data from JSON response
        const latitude = plane.latitude;
        const longitude = plane.longitude;
        const callsign = plane.callsign || 'N/A'; 
        const popupContent = `<b>Callsign:</b> ${callsign}<br><b>Latitude:</b> ${latitude}<br><b>Longitude:</b> ${longitude}`;
        
        // Create custom icon for each plane
        const customIcon = L.icon({
            iconUrl: 'static/Icons/plane_icon.png',  
            iconSize: [25, 25],  
            iconAnchor: [12, 12],  
            popupAnchor: [0, -12]  
        });

        // Create marker for each plane
        const marker = L.marker([latitude, longitude], {icon: customIcon}).bindPopup(popupContent);
        planesLayer.addLayer(marker);
    });
})
.catch(error => {
    console.error('Error fetching plane data:', error);
});
}

// Call function to add plane markers initially
addPlaneMarkers();

// Function to fetch new data every ten seconds
function fetchNewData() {
planesLayer.clearLayers();
addPlaneMarkers();
}

// Fetch new data every ten seconds
setInterval(fetchNewData, 10000);  


