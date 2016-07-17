/**
 * Created by zcG460 on 2016/7/15.
 */
var mymap = null;
window.onload = function () {
    mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    $("#MULTIPOINT").click(function () {
        zoomToMULTIPOINT();
    });
    $("#LINESTRING").click(function () {
        zoomToLINESTRING();
    })
};

/**
 * 显示和缩放MULTIPOINT
 * @param show 是否显示points集合
 */
function zoomToMULTIPOINT(show) {
    var data = "MULTIPOINT(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
    var latLngBounds = fnParseWkt(data);
    mymap.fitBounds(latLngBounds);
}


function zoomToLINESTRING(show) {
    var data = "LINESTRING(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
    var latLngBounds = fnParseWkt(data);
    mymap.fitBounds(latLngBounds);
}

/**
 * 缩放到面集合
 */
function zoomToPolygon() {

}
/**
 * 显示所有的面
 */
function showPolygon() {

}


function fnParseWkt(strWkt) {
    if (strWkt) {
        var strType = strWkt.substr(0, strWkt.indexOf('('));
        switch (strType) {
            case 'MULTIPOINT':
                return wktUtil.getPointArrayFromMULTIPOINT(strWkt);
            case "LINESTRING":
                return wktUtil.getPointArrayFromLINESTRING(strWkt);
            default:
                break;
        }
    }
}

function fnParseLINESTRING(strWkt) {
    //LINESTRING(3 4,10 50,20 25)


}
