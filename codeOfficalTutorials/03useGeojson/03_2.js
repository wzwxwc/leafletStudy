var map = "";
window.onload = function () {
    map = mapUtil.fnInitTdt("mapid");
    map.panTo([42.87596410238256, -100.89843750000001]);
    map.setZoom(4);

    var states = [
        {
            "type": "Feature",
            "properties": {"party": "Republican"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-104.05, 48.99],
                    [-97.22, 48.98],
                    [-96.58, 45.94],
                    [-104.03, 45.94],
                    [-104.05, 48.99]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": {"party": "Democrat"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-109.05, 41.00],
                    [-102.06, 40.99],
                    [-102.03, 36.99],
                    [-109.04, 36.99],
                    [-109.05, 41.00]
                ]]
            }
        }];

    L.geoJSON(states, {
        style: function (feature) {
            switch (feature.properties.party) {
                case 'Republican':
                    return {color: "#ff0000"};
                case 'Democrat':
                    return {color: "#0000ff"};
            }
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.party;
    }).addTo(map);
};