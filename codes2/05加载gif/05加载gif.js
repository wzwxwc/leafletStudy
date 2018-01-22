/**
 * 展示点和点的标注
 * Created by zcRescuer on 2017/4/18.
 */
window.onload = function () {
    var map = mapUtil.fnInitBaseMap("mapid");
    fnShowPointAndLabel(map);
};

//显示
function fnShowPointAndLabel(argObjMap) {
    var divIcon = L.divIcon({
        className: "labelLeft",
        html: "$$$$$$"
    });
    var latLng = new L.LatLng(39.889718875996685, -243.5579681396484);
    L.marker(latLng, {icon: divIcon}).addTo(argObjMap);
    argObjMap.setView(latLng);

}