/**
 * Map相关的封装
 * Created by zcRescuer on 2017/4/18.
 */
var zcMap = {};
zcMap.fnInitBaseMap = function (argStrMapDivId) {
    // set its view to our chosen geographical coordinates and a zoom level:
    var mymap = L.map(argStrMapDivId).setView([39.889718875996685, -243.5579681396484], 10);
    //故意把map对象暴露出来，之后在console中更容易的操作
    window.map = mymap;

    var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    });
    baseLayer.addTo(mymap);
    return mymap;
}