/**
 * Created by zcG460 on 2016/7/15.
 */
require.config({
    paths: {
        jquery: "../../deps/jquery",
        leaflet: "../../deps/v0.7.7/leaflet-src"
    }
});

var mymap = null;
var elementContainer = [];

require(["wktUtil", "dataValueUtil", "jquery", "leaflet"], function (wktUtil, dataValueUtil, domReady) {
    //按理说，下述的操作要等到dom加载完毕了，才可以执行
    //但是，一旦放到domReady中绑定事件，又不会执行，这个该怎么办？
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
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

    $("#MULTIPOINT").click(function () {
        zoomToMULTIPOINT();
    });
    $("#LINESTRING").click(function () {
        zoomToLINESTRING();
    });
    $("#POLYGON").click(function () {
        zoomToPOLYGON();
    });
    $("#interface").click(function () {
        fnInvoke();
    });
    $("#btnClear").click(function () {
        for (var i = 0; i < elementContainer.length; i++) {
            mymap.removeLayer(elementContainer[i]);
        }
        elementContainer = [];
    });

    function zoomToPOINT(strWkt) {
        var latLng = fnParseWkt(strWkt);
        elementContainer.push(L.marker(latLng).addTo(mymap));
    }

    /**
     * 显示和缩放MULTIPOINT
     * @param show 是否显示points集合
     */
    function zoomToMULTIPOINT(strWkt) {
        // var strWkt = "MULTIPOINT(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
        var latLngBounds = fnParseWkt(strWkt);
        for (var i = 0; i < latLngBounds.length; i++) {
            elementContainer.push(L.marker(latLngBounds[i]).addTo(mymap));
        }
        mymap.fitBounds(latLngBounds);
    }

    /**
     * 缩放到线集合
     * @param show
     */
    function zoomToLINESTRING(strWkt) {
        // var strWkt = "LINESTRING(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
        var latLngBounds = fnParseWkt(strWkt);
        elementContainer.push(L.polyline(latLngBounds, {
            color: "red"
        }).addTo(mymap));
        mymap.fitBounds(latLngBounds);
    }

    /**
     * 缩放到面集合
     */
    function zoomToPOLYGON(strWkt) {
        // var data = "POLYGON((-0.14574050903320312 51.51376371940495,-0.12531280517578122 51.50649873794456,-0.12342453002929686 51.49624032118747,-0.160675048828125 51.498270816123465))";
        // var strWkt = "POLYGON(" +
        //     "(-0.14574050903320312 51.51376371940495,-0.12531280517578122 51.50649873794456,-0.12342453002929686 51.49624032118747,-0.160675048828125 51.498270816123465)," +
        //     "(-0.13269424438476562 51.51718213334982,-0.11295318603515625 51.5072466571743,-0.11243820190429688 51.49057583090478,-0.13338088989257812 51.48865188163204," +
        //     "-0.16204833984375 51.491110246849814,-0.17337799072265625 51.50307952226442,-0.16565322875976562 51.512588580360244,-0.15552520751953125 51.51760941705477))";
        var dataParsed = fnParseWkt(strWkt);
        elementContainer.push(L.polygon(dataParsed, {
            color: "red"
        }).addTo(mymap));
        var bounds = [];
        for (var i = 0; i < dataParsed.length; i++) {
            bounds = bounds.concat(dataParsed[i]);
        }
        if (bounds.length != 0) {
            mymap.fitBounds(bounds)
        }
    }

    function fnParseWkt(strWkt) {
        if (strWkt) {
            var strType = strWkt.substr(0, strWkt.indexOf('('));
            switch (strType) {
                case 'POINT':
                    return wktUtil.getLatLngFromPOINT(strWkt);
                case 'MULTIPOINT':
                    return wktUtil.getLatLngArrFromMULTIPOINT(strWkt);
                case "LINESTRING":
                    return wktUtil.getLatLngArrFromLINESTRING(strWkt);
                case "POLYGON":
                    return wktUtil.getLatLngArrFromPOLYGON(strWkt);
                default:
                    break;
            }
        }
    }

//定义的接口
    function myInterface(jsonArguments) {
        var recordList = dataValueUtil.deal(jsonArguments.value);
        for (var recordid in recordList) {
            var record = recordList[recordid];
            //开始生成Geometry，并绑定相关的属性
            if (jsonArguments.geotype) {
                if (jsonArguments.geotype.indexOf(record.geotype) > -1) {
                    fnDrawWkt(record);
                } else {
                    continue;
                }
            } else {
                fnDrawWkt(record);
            }
        }
    }

//把wkt画出来
    function fnDrawWkt(record) {
        switch (record.geotype) {
            case "1":
                zoomToPOINT(record.wkt);
                break;
            case "2":
                zoomToLINESTRING(record.wkt);
                break;
            case "3":
                zoomToPOLYGON(record.wkt);
                break;
            default:
                break;
        }
    }

//外部接口调用1
    function fnInvoke() {
        var type = "mark";
        var value = "赤城县专业森林消防队※※CC_LQQ_5※※-0.11295318603515625※※51.50446860957782※※救援队伍名称：赤城县专业森林消防队\n救援队伍类型：公安消防应急队伍\n总人数：10\n负责人电话：6415153\n队伍地址：剪子岭林场@@赤城县专业森林消防队※※CC_LQQ_6※※LINESTRING(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)※※救援队伍名称：赤城县专业森林消防队\n救援队伍类型：公安消防应急队伍\n总人数：10\n负责人电话：6415153\n队伍地址：11111111111";
        var layid = "";
        var geotype = "1,2";
        var iconurl = "http：//192.168.1.194：8080/ gsafetygis/1.gif";
        var level = 2;
        var jsonArguments = {
            type: type,
            value: value,
            layid: layid,
            geotype: geotype,
            iconurl: iconurl,
            level: level
        };
        myInterface(jsonArguments);
        // myInterface(type, value, layid, geotype, iconurl, level);
    }


});



