/**
 * 时间：2017/12/26
 * 作者：张超
 * 功能：
 */
var map = mapUtil.fnInitTdt("divMap");
map.setView([51.505, -0.09], 13);
var markerOpts = {
    draggable: true
};
//下述自定义一个popup对象，然后绑定到marker上
// var popup=L.popup()
L.marker([51.505, -0.09], markerOpts).addTo(map).bindPopup("this is from manual", {
    autoClose: false
});
// L.marker([51.515, -0.10]).addTo(map);
var mymarker = new L.MyMarker([51.512, -0.10], markerOpts);
mymarker.addTo(map);

