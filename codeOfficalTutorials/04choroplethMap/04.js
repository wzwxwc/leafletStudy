var map = "";
window.onload = function () {
    map = zcMap.fnInitTdt("mapid");
    map.panTo([35.00118, -87.359296]);
    map.setZoom(10);

    L.geoJSON(statesData, {}).addTo(map);

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.density)
        };
    }
};