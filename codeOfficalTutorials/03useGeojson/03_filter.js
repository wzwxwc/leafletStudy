var map = "";
window.onload = function () {
    map = mapUtil.fnInitTdt("mapid");
    map.panTo([39.75621, -104.99404]);
    map.setZoom(8);

    var someFeatures = [{
        "type": "Feature",
        "properties": {
            "name": "Coors Field",
            "show_on_map": true
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-104.99404, 39.75621]
        }
    }, {
        "type": "Feature",
        "properties": {
            "name": "Busch Field",
            "show_on_map": false
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-104.98404, 39.74621]
        }
    }];

    L.geoJSON(someFeatures, {
        filter: function (feature, layer) {
            return feature.properties.show_on_map;
            // return true;
        }
    }).addTo(map);
};