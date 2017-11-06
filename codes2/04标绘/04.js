/**
 * 展示点和点的标注
 * Created by zcRescuer on 2017/4/18.
 */
var strMapToolType = "";
window.onload = function () {
    var map = zcMap.fnInitTdt("mapid");
    bindEvents(map);
};

function bindEvents(map) {
    $(".btn-draw-tool button").on("click", function (e) {
        console.log(e.target.getAttribute("class"));
        //这个e并不是对应dom的jquery对象！
        var drawType = e.target.getAttribute("class");
        switchMapTool(drawType, map);
    })
}

function drawPoint(map) {
    //如何先清除所有的事件绑定？下述这个可以吗？
    // map.off();
    map.on("click ", function (e) {
        //下述这个是经纬度坐标
        // console.log(e.latlng);
        //下述这个是屏幕坐标
        // console.log(e.layerPoint);
        //方法1
        L.marker(e.latlng).addTo(map);
        //方法2——失败！
        // var latlng = L.latLng(e.layerPoint);
        // L.marker(latlng).addTo(map);
    });
    console.log("画点");
}

//改进
//1、双击结束，并且可以重新画
function drawLine(map) {
    map.off("click");
    var arrLatLng = [];
    var polyline = L.polyline(arrLatLng, {color: 'red'}).addTo(map);
    map.on("click", function (e) {
        arrLatLng.push(e.latlng);
        polyline.setLatLngs(arrLatLng);
    });
    console.log("画线");
}

//下述方法错误，并且会导致地图的放大缩小事件失效！
function drawLineBad(map) {
    var arrLatLng = [];
    map.off();
    map.on("click", function (e) {
        arrLatLng.push(e.latlng);
        L.polyline(arrLatLng, {color: 'red'}).addTo(map);
    });
    console.log("画线");
}

function drawPolygon(map) {
    var arrLatLng = [];
    var polygon = L.polygon(arrLatLng, {color: "blue"}).addTo(map);
    // map.on("click", function (e) {
    //     arrLatLng.push(e.latlng);
    //     polygon.setLatLngs(arrLatLng);
    // });
    map.on("dblclick", function (e) {
        arrLatLng = [];
        polygon = L.polygon(arrLatLng, {color: "blue"}).addTo(map);
        e.originalEvent.stopPropagation();
        return false;
    });
    console.log("画面");
}

function drawClear(map) {
    console.log("清屏");
}

//切换地图工具
function switchMapTool(toolType, map) {
    map.off("click");
    map.off("dblclick ");
    switch (toolType) {
        case "Point":
        case "Line":
        case "Polygon":
        case "Clear":
            window["draw" + toolType](map);
            break;
        default:
            break;
    }
}
