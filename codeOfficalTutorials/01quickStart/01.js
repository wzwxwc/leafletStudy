window.onload = function () {
    var mymap=zcMap.fnInitTdt("mapid");
    mymap.setView([51.505, -0.09], 13);

    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

    L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");

    L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap).bindPopup("I am a polygon.");


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick);
};