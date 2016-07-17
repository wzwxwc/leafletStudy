/**
 * Created by zcG460 on 2016/7/15.
 */
var mymap = null;
var elementContainer = [];
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
    });

    $("#btn3").click(function () {
        // var arrLatLng = [
        //     [51.49869827721546, -0.19002914428710938],
        //     [51.51301590715673, -0.1560401916503906],
        //     [51.50810140697543, -0.12805938720703125]
        // ];
        var arrLatLng = [];
        arrLatLng.push([51.49869827721546, -0.19002914428710938]);
        arrLatLng.push([51.51301590715673, -0.1560401916503906]);
        arrLatLng.push([51.50810140697543, -0.12805938720703125]);
        elementContainer.push(L.polyline(arrLatLng, {
            color: "red"
        }).addTo(mymap));
        mymap.fitBounds(arrLatLng);
    });

    $("#btnClear").click(function () {
        for (var i = 0; i < elementContainer.length; i++) {
            mymap.removeLayer(elementContainer[i]);
        }
        elementContainer = [];
    });
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
    elementContainer.push(L.polyline(latLngBounds, {
        color: "red"
    }).addTo(mymap));
    mymap.fitBounds(latLngBounds);
}

/**
 * 缩放到面集合
 */
function zoomToPOLYGON() {
    var data = "POLYGON((-0.14574050903320312 51.51376371940495,-0.12531280517578122 51.50649873794456,-0.12342453002929686 51.49624032118747,-0.160675048828125 51.498270816123465))";
    var dataParsed = fnParseWkt(data);
    elementContainer.push(L.polygon(dataParsed));


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

function fnParseLINESTRING(strWkt) {
    //LINESTRING(3 4,10 50,20 25)


}
