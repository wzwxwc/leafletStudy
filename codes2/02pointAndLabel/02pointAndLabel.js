/**
 * 展示点和点的标注
 * Created by zcRescuer on 2017/4/18.
 */
window.onload = function () {
    var map = zcMap.fnInitBaseMap("mapid");
    fnShowPointAndLabel(map);
};

//显示
function fnShowPointAndLabel(argObjMap) {
    var divIcon = L.divIcon({
        className: "labelLeft",
        html: "22°"
    });
    L.marker(new L.LatLng(39.889718875996685, -243.5579681396484), {icon: divIcon}).addTo(argObjMap);
    L.circleMarker([39.889718875996685, -243.5579681396484], {
        stroke: true,
        color: '#00f',
        fill: true,
        fillColor: '#00E768',
        weight: 1,
        radius: getMarkerScale(argObjMap.getZoom()),
        fillOpacity: 0.8
    }).addTo(argObjMap);

}

function getMarkerScale(zoom) {
    if (zoom < 3) {
        zoom = 3;
    } else if (zoom > 15) {
        zoom = 15;
    }
    var scale = 12 * zoom / 15;
    return scale;
}