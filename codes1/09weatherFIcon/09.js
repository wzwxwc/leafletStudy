/**
 * Created by zcRescuer on 2017/3/27.
 */
var mymap = L.map('mapid').setView([23.059516273509303, 109.072265625], 7);

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
            fnShowRotatedIcon(oneData.direction, oneData.speed, [oneData.lat, oneData.lng]);
        }
    },
    error: function (err) {
        console.error(err);
    }
});

//显示旋转的按钮
function fnShowRotatedIcon(degree, speed, latLngArr) {
    var level = fnGetCloundLevelBySpeed(speed);
    var divIconHtml = "<div style='transform: rotate(" + degree + "deg); -moz-transform: rotate(" + degree +
        "deg);-webkit-transform: rotate(" + degree + "deg);-o-transform: rotate(" + degree +
        "deg);-ms-transform: rotate(" + degree + "deg);'><img src='img/Lv" + level + ".png' /></div>";
    var myIcon = L.divIcon({html: divIconHtml, className: 'cloud-direction-icon'});
// you can set .my-div-icon styles in CSS
    L.marker(latLngArr, {icon: myIcon}).addTo(mymap);
}

//根据风速得到风的等级
function fnGetCloundLevelBySpeed(speed) {
    var cloudLevel = "";
    if (speed < 0) {
        cloudLevel = -1
    } else if (speed < 0.3) {
        cloudLevel = 0;
    } else if (speed < 1.6) {
        cloudLevel = 1;
    } else if (speed < 3.4) {
        cloudLevel = 2;
    } else if (speed < 5.5) {
        cloudLevel = 3;
    } else if (speed < 8.0) {
        cloudLevel = 4;
    } else if (speed < 10.8) {
        cloudLevel = 5;
    } else if (speed < 13.9) {
        cloudLevel = 6;
    } else if (speed < 17.2) {
        cloudLevel = 7;
    } else if (speed < 20.8) {
        cloudLevel = 8;
    } else if (speed < 24.5) {
        cloudLevel = 9;
    } else {
        cloudLevel = 10;
    }
    return cloudLevel;
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

