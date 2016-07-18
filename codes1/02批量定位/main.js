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

require(["WKTDraw", "CustomDraw", "jquery", "leaflet"], function (WKTDraw, CustomDraw) {
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

    var wktDraw = new WKTDraw(mymap);

    $("#MULTIPOINT").click(function () {
        wktDraw.drawWktMULTIPOINT();
    });
    $("#LINESTRING").click(function () {
        wktDraw.drawWktLINESTRING();
    });
    $("#POLYGON").click(function () {
        wktDraw.drawWktPOLYGON();
    });
    $("#interface").click(function () {
        fnInvoke();
    });
    $("#btnClear").click(function () {
        wktDraw.clear();
    });

//外部接口调用
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
        var customeDraw = new CustomDraw(mymap);
        customeDraw.draw(jsonArguments);
    }


});



