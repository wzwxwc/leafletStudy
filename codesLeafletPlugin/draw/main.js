/**
 * 时间：2017/12/22
 * 作者：张超
 * 功能：基本使用  addControl
 */
var map = mapUtil.fnInitTdt("divMap");
map.setView([38.272688535980976, 111.97265625000001], 4);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: editableLayers
    }
});
map.addControl(drawControl);

// map.on(L.Draw.Event.CREATED, function (e) {
//     var type = e.layerType,
//         layer = e.layer;
//
//     if (type === 'marker') {
//         layer.bindPopup('A popup!');
//     }
//     editableLayers.addLayer(layer);
// });