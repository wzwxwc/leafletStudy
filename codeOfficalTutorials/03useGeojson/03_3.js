var map = "";
window.onload = function () {
    map = mapUtil.fnInitTdt("mapid");
    map.panTo([39.977120098439634, 114.521484375]);
    map.setZoom(7);

    $.ajax({
        url: "data_point.json",
        dataType: "json",
        success: function (data) {
            L.geoJSON(data, {
                pointToLayer: function (geoJsonPoint, latlng) {
                    return L.circleMarker(latlng);
                }
            }).addTo(map);
        },
        error: function (e) {

        }
    })
};