/**
 * 时间：2017/12/24
 * 作者：张超
 * 功能：
 */
var map = mapUtil.fnInitTdt("divMap");
map.setView([38.272688535980976, 111.97265625000001], 4);

var btnDraw = document.getElementById("btnDraw");
btnDraw.onclick = function (ev) {
    console.log(ev);
    var feature = new L.Draw.Feature();
    feature.enable();
};

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        marker: false
    }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type != 'marker') {
        layer.bindPopup('A popup!');
    }
    editableLayers.addLayer(layer);
});