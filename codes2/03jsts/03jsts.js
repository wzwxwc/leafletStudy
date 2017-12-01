/**
 * 展示点和点的标注
 * Created by zcRescuer on 2017/4/18.
 */
window.onload = function () {
    var map = mapUtil.fnInitTdt("mapid");
    fnShowPointAndLabel(map);
    fnBindClickEvent(map);
};

//显示
function fnShowPointAndLabel(argObjMap) {
    var divIcon = L.divIcon({
        className: "labelLeft",
        html: "22°"
    });
    // L.marker(new L.LatLng(51.505, -0.09), {icon: divIcon}).addTo(argObjMap);
    // L.marker(new L.LatLng(51.505, -0.09)).addTo(argObjMap);
    L.circleMarker([51.505, -0.09], {
        stroke: true,
        color: '#00f',
        fill: true,
        fillColor: '#00E768',
        weight: 1,
        fillOpacity: 0.8
    }).addTo(argObjMap);
    L.circleMarker([51.50479, -0.10712], {
        stroke: true,
        color: '#00f',
        fill: true,
        fillColor: '#00E768',
        weight: 1,
        fillOpacity: 0.8
    }).addTo(argObjMap);

    var reader=new jsts.io.WKTReader();
}

function fnBindClickEvent(map) {
    map.on("click", function (e) {
        console.log(e.latlng);
    })
}
