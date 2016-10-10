/**
 * Created by zcRescuer on 2016/10/9.
 */
window.onload = function () {

    var smmap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(smmap);


    var serviceURL = "http://172.24.254.188/service/GovEMap/wfs?request=Geosearch&service=WFS&version=1.0.0&recbox=437442.469,257025.703,582446.812,414679.125&typename=L416&searchType=recsearch&MAPSERVICE=BJRMSNEW";

    jQuery.ajax({
        type: "POST",
        url: serviceURL,
        async: true,
        success: function (result) {
            var returndata = result;
            // 添加到map
            var un;
            try {
                un = returndata.features;
            } catch (e) {
                un = null;
            }
            if (un && un.length > 0) {
                var dataFields = null;
                var myStyle = {
                    "color": "#ff7800",
                    "weight": 5,
                    "opacity": 0.65
                };
                var layer = L.geoJson(returndata, {
                    style: function (feature) {
                        return {
                            color: "#2ee220"
                        };
                    },
                    coordsToLatLng: function (coords) {
                        // 需要删除
                        coords = g2.util.CRSUtil.leaflet.initEPSG4326(coords);
                        return new L.LatLng(coords[1], coords[0]);
                    },
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: "#ff7800",
                            color: "#000",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8,
                        });
                    },
                    // 绑定点击事件的数据
                    onEachFeature: function (feature, layer) {
                        var table = "<table width='93%' class='vector-data-cont mt2 infotable'>";
                        var arr = feature.properties;
                        if (dataSource != null && dataSource != "") {

                            var infomessage = {};
                            for (var key in arr) {
                                for (var l = 0; l < dataFields.length; l++) {
                                    if (dataFields[l].fieldName == key) {
                                        dataFields[l].fieldRemark;
                                        infomessage[dataFields[l].fieldRemark] = arr[key];
                                    }
                                }
                            }
                            for (var key in infomessage) {
                                var text = "";
                                if (infomessage[key] != null
                                    && infomessage[key].length > 16) {
                                    text = infomessage[key]
                                            .substring(0, 15)
                                        + "...";
                                } else {
                                    text = infomessage[key];
                                }
                                if (text === null) {
                                    text = "";
                                }
                                var t = "<tr>"
                                    + "<td width='40%'  class='tr'><font color=#303030>"
                                    + key
                                    + ":</font></td>"
                                    + "<td width='60%'  class='tl' title='"
                                    + infomessage[key]
                                    + "'><font color='#808080'>"
                                    + text + "</font></td>"
                                    + "</tr>";
                                table += t;
                            }
                        } else {
                            for (var key in arr) {
                                var text = "";
                                if (arr[key] != null
                                    && arr[key].length > 16) {
                                    text = arr[key]
                                            .substring(0, 15)
                                        + "...";
                                } else {
                                    text = arr[key];
                                }
                                if (text === null) {
                                    text = "";
                                }
                                var t = "<tr>"
                                    + "<td width='40%'  class='tr'><font color=#303030>"
                                    + key
                                    + ":</font></td>"
                                    + "<td width='60%'  class='tl' title='"
                                    + arr[key]
                                    + "'><font color='#808080'>"
                                    + text + "</font></td>"
                                    + "</tr>";

                                table += t;
                            }
                        }
                        table += "</table>";
                        var infopopup = L.popup();
                        infopopup.options.minWidth = 250;
                        infopopup.options.maxWidth = 300;
                        infopopup.options.minHeight = 150;
                        infopopup.options.className = "gsafety-popup";
                        infopopup.options.wrapperBackGround = color;
                        infopopup.options.fillColor = color;
                        infopopup.setContent(table);
                        layer.bindPopup(infopopup);
                    }
                }).addTo(smmap);
                smmap.fitBounds(layer.getBounds());
            } else if (un != null && un.length == 0) {
                alert("无数据服务！", null, "提示");
            } else {
                var msg = "获取服务数据错误,请检查服务配置！";
                alert(msg, null, "提示");
            }
        },
        error: function (e) {
            var msg = "获取服务数据错误,请检查服务配置！";
            alert(msg, null, "提示");
        }
    });

}