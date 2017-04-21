/**
 * Created by zcRescuer on 2017/4/11.
 */

$(function () {

    var container = {};
    fnInitMap();
    fnBindButton();

    function fnInitMap() {
        // set its view to our chosen geographical coordinates and a zoom level:
        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        mymap.on("mousedown", function (e) {
            if ($('#MousePositionShowSwitch').attr('flag') == 'true') {
                console.lon(e.latlng.lng + "," + e.latlng.lat);
            }
        });
        container.mymap = mymap;

        var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        });
        baseLayer.type = "baselayer";
        baseLayer.addTo(mymap);


        //下述执行不成功，会直接导致后面的语句没法执行！！
        //感觉和解释语言不符啊！
//            L.Marker([51.5,-0.09]).addTo(mymap);
        var marker = L.marker([51.5, -0.09], {
            'draggable': true
        })
            .addTo(mymap)
            .bindPopup("<b>Hello world!</b><br/>I am a popup.")
            //                        .bindPopup("")
            .openPopup();
        container.marker = marker;

        // var circle = L.circle([51.508, -0.11], 500, {
        //     color: '#00ff00',
        //     weight: 12,
        //     fillColor: '#f03',
        //     fillOpacity: 1
        // }).addTo(mymap);
        // container.circle = circle;
        //
        // var polygon = L.polygon([
        //     [51.509, -0.08],
        //     [51.503, -0.06],
        //     [51.51, -0.047]
        // ]).addTo(mymap).bindPopup("hehee");
        // container.polygon = polygon;

    }

    function fnBindButton() {
        $('#traverse').click(function () {
            container.mymap.eachLayer(function (layer) {
                console.log(layer);
            });
        });
        $('#clear').click(function () {
            container.mymap.eachLayer(function (layer) {
                if (layer.type) {
                    if (layer.type === 'baselayer') {
                        return;
                    } else if (layer.type == 'district') {
                        return;
                    }
                }
                if (layer instanceof L.LayerGroup) {
                    layer.clearLayers();
                } else {
                    container.mymap.removeLayer(layer);
                }
            });
        });
    }

});
