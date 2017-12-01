/**
 * 展示点和点的标注
 * Created by zcRescuer on 2017/4/18.
 */
var strMapToolType = "";
window.onload = function () {
    var map = mapUtil.fnInitTdt("mapid");
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

}

function ToolPoint() {

}

function ToolLine() {
    var arrLatLng = [];
    var polyline = L.polyline(arrLatLng, {color: 'blue'}).addTo(map);

    /**
     * 开始画线
     */
    this.start = function () {
        map.on("click", mapClick);
        //map.on()方法返回的就是一个map对象！
        map.on("dblclick", mapDblClick);
    };

    /**
     * 结束画线
     */
    this.end = function () {
        map.off("click", mapClick);
        //map.on()方法返回的就是一个map对象！
        map.off("dblclick", mapDblClick);
    }

    function mapClick(e) {
        arrLatLng.push(e.latlng);
        polyline.setLatLngs(arrLatLng);
    }

    function mapDblClick(e) {
        drawLine(map);
        map.off("click", mapClick);
        map.off("dblclick", mapDblClick);
    }


    console.log("画线");
}

function ToolPolygon() {

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
    //下述语句会把地图的默认dblclick事件给屏蔽掉！！
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
