/**
 * Created by zcRescuer on 2017/3/27.
 */
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

$.ajax({
    url: "./data/jsonfengxiang.json",
    dataType: "json",
    success: function (data) {
        var dataArr = data.data;
        for (var i = 0; i < dataArr.length; i++) {
            var oneData = dataArr[i];
            fnShowRotatedIcon(oneData.sta_exmaxwindd, [oneData.sta_weidy, oneData.sta_jingdu]);
        }
    },
    error: function (err) {
        console.error(err);
    }
});

function fnShowRotatedIcon(degree, latLngArr) {
    //var degree = "190";
    var divIconHtml = "<div style='transform: rotate(" + degree + "deg); -moz-transform: rotate(" + degree +
        "deg);-webkit-transform: rotate(" + degree + "deg);-o-transform: rotate(" + degree +
        "deg);-ms-transform: rotate(" + degree + "deg);'>F</div>";
    var myIcon = L.divIcon({html: divIconHtml, className: 'cloud-direction-icon'});
// you can set .my-div-icon styles in CSS
    L.marker(latLngArr, {icon: myIcon}).addTo(mymap);
}


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

