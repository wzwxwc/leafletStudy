/**
 * Created by zcG460 on 2016/7/21.
 */

require.config({
    paths: {
        leaflet: "../../deps/v0.7.7/leaflet-src.js",
        jquery: "../../deps/jquery.js"
    }
});
define(["leaflet"], function () {
    /**
     * 根据原始点和偏移、角度等参数计算出偏移点
     * @param soureLatLng   原始点：LatLng类型、eg：[23,116]
     * @param brng          角度：数值型、eg：90（代表90度）
     * @param dist          距离：数值型、eg：100（代表100米）
     * @returns {*}         偏移后的点
     */
    function fnGetDestinationLatLng(soureLatLng, brng, dist) {
        dist = dist / 6378137;
        brng = brng * Math.PI / 180;
        var lat1 = soureLatLng.lat * Math.PI / 180, lon1 = soureLatLng.lng * Math.PI / 180;
        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                Math.cos(lat1),
                Math.cos(dist) - Math.sin(lat1) *
                Math.sin(lat2));
        if (isNaN(lat2) || isNaN(lon2)) return null;
        return new L.latLng(lat2 * 180 / Math.PI, lon2 * 180 / Math.PI);
    }

    var temp = function (map, circle) {
        var htmlTemplate = '<img style="width:20px;height: 20px;border:4px solid greenyellow" src="imgs/handle.jpeg" alt=""><input type="text" style="width: 60px;" value="@@"/><label for="">米</label>';
        var disicon = L.divIcon({
            html: htmlTemplate
        });
        var markerHandle = L.marker([0, 0], {
            icon: disicon,
            draggable: true
        });
        markerHandle.on("drag", function () {
            // debugger
            var distance = this.getLatLng().distanceTo(centrePoint);
            var newHtml = htmlTemplate.replace("@@", distance);
            disicon.options.html = newHtml;
            markerHandle.setIcon(disicon);
            circle.setRadius(distance);
            // circle.update();
        });

        circle.on('dblclick', function () {
            debugger
            console.log("触发了circel的mouseover    dblclick事件");
            if (this._user_handle) {
                this._user_handle = false;
                map.removeLayer(markerHandle);
                return;
            }
            // debugger
            var latLngCircleCenter = this.getLatLng();
            var offset = this.getRadius();
            var latLngOffset = fnGetDestinationLatLng(latLngCircleCenter, 90, offset);
            //最好是设置为圆心往右偏半径的距离
            markerHandle.setLatLng(latLngOffset);
            var newHtml = htmlTemplate.replace("@@", offset);
            disicon.options.html = newHtml;
            markerHandle.setIcon(disicon);
            markerHandle.update();
            markerHandle.addTo(map);
            this._user_handle = true;
            // mymap.setView(latLngOffset);
        });

        circle.on("mouseout", function () {
            console.log("触发了circel的mouseout     out事件")
        })

    };
    return temp;


});


// map = L.map('divMap').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.streets'
// }).addTo(map);
//
// map.on("mousedown", function (e) {
//     console.log(e.latlng.lng + "," + e.latlng.lat);
// });


//画圆
//半径单位是米？a radius in meters
// var centrePoint = [51.5089561407416, -0.10419845581054688]; //圆心
// circle = L.circle(centrePoint, 1000).addTo(map);

// disicon = L.divIcon({
//     html: htmlTemplate
// });
// markerHandle = L.marker([0, 0], {
//     icon: disicon,
//     draggable: true
// });

// markerHandle.on("drag", function () {
//     // debugger
//     var distance = this.getLatLng().distanceTo(centrePoint);
//     var newHtml = htmlTemplate.replace("@@", distance);
//     disicon.options.html = newHtml;
//     markerHandle.setIcon(disicon);
//     circle.setRadius(distance);
//     // circle.update();
// });


// L.DomEvent.addListener(circle, 'mouseenter', function (e) {
//     //在调试的时候，设置断点，为什么进不来？
//     //在chrome中，可以看到，额外的生成了一些js文件
//在实际使用的时候，可能只是拿到了这个function对象，把copy给了另一个人来用而已！
//     var marker = L.marker([51.5089561407416, -0.10419845581054688]).addTo(mymap);
// });


//改变半径
// function fnChangeRadius() {
//     var oldR = this.getRadius();
//     var newR = oldR + 100;
//     this.setRadius(newR);
//     //取消事件传递
//     L.DomEvent.stopPropagation(e);
// }


/*
 在circle对象事件绑定的问题上
 1、原生js事件绑定
 2、svg的事件绑定
 3、leaflet自带的on方法
 4、leaflet自带的addListener
 想一想上述哪个方法好？哪个方便调试？

 leaflet的上述事件机制
 哪一种是添加？而不是覆盖？
 即多一种事件处理函数，而不是现在设置的事件处理函数“覆盖”之前的事件处理函数


 * */
