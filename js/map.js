const mapBox = document.getElementById("map");
const locateButton = document.getElementById("locate-btn");
const mapStatus = document.getElementById("map-status");
 
// Shows a short message under the map
function sayAboutMap(message) {
    mapStatus.textContent = message;
    mapStatus.className = "form-status status-info";
}
 
if (mapBox) {
    if (typeof L === "undefined") {
        // Leaflet did not load (for example, no internet connection)
        mapBox.textContent = "The map could not be loaded. Please check your internet connection or use the directions button below.";
        locateButton.hidden = true;
    } else {
        const shopLocation = [-25.7759, 28.2805];      // latitude, longitude of Imperial Scents
        let youMarker = null;
 
        // Create the map and centre it on the shop
        const map = L.map("map", { scrollWheelZoom: false }).setView(shopLocation, 16);
 
        // Add the map pictures (tiles) from OpenStreetMap
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
            maxZoom: 18,
            attribution: "Tiles &copy; Esri"
        }).addTo(map);
 
        // Add a marker with a pop-up message
        L.marker(shopLocation)
            .addTo(map)
            .bindPopup("<strong>Imperial Scents</strong><br>116 Clearwater Road, Lynnwood Glen, Pretoria")
            .openPopup();
 
        // Scrolling the page should not zoom the map by accident
        // so the scroll wheel only zooms after the visitor clicks the map
        map.on("click", function () {
            map.scrollWheelZoom.enable();
        });
 
        // "Show my location" button
        locateButton.addEventListener("click", function () {
            if (!navigator.geolocation) {
                sayAboutMap("Your browser does not support finding your location.");
                return;
            }
 
            sayAboutMap("Finding your location...");
 
            navigator.geolocation.getCurrentPosition(function (position) {
                const you = [position.coords.latitude, position.coords.longitude];
 
                if (youMarker) map.removeLayer(youMarker);       // remove an older marker
                youMarker = L.circleMarker(you, { radius: 8 }).addTo(map).bindPopup("You are here");
 
                map.fitBounds([you, shopLocation], { padding: [40, 40] });   // show both places
 
                const km = (map.distance(you, shopLocation) / 1000).toFixed(1);
                sayAboutMap("You are about " + km + " km from Imperial Scents.");
            }, function () {
                sayAboutMap("We could not get your location. Please allow location access and try again.");
            });
        });
    }
}