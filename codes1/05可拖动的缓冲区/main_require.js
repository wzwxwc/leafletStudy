/**
 * Created by zcG460 on 2016/7/21.
 */
require.config({
    baseUrl: "/leafletStudy/",
    paths: {
        leaflet: "deps/v0.7.7/leaflet-src",
        BufferCircle: "commonModules/BufferCircle/BufferCircle",
        WKTDraw: "commonModules/WKTDraw"
    }
});

require(["BufferCircle", "WKTDraw", "leaflet"], function (BufferCircle, WKTDraw) {
    var centerPoint = [51.45716240204102, 0.09209632873535156];

    mymap = L.map('divMap').setView(centerPoint, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    mymap.on("mousedown", function (e) {
        console.log(e.latlng.lng + "," + e.latlng.lat);
    });

    var circleCenterLatLng = [51.505, -0.09]; //圆心
    var radius = 200;
    var fnCallBack = function (circleCenter, circleRadius, wktCirclePolygon) {
        // var wktDraw = new WKTDraw(mymap);
        // wktDraw.drawWktPOLYGON(wktCirclePolygon);
    }
    new BufferCircle(mymap, circleCenterLatLng, radius, fnCallBack);
    // mymap.setView(centerPoint, 17);
    L.marker(centerPoint).addTo(mymap);

});