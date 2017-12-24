/**
 * 时间：2017/12/22
 * 作者：张超
 * 功能：基本使用  mapOptions
 */
var map = mapUtil.fnInitTdtWithDrawControl("divMap");
map.setView([38.272688535980976, 111.97265625000001], 4);

//如果没有下述语句，绘图完成的图形直接就消失了
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    editableLayers.addLayer(layer);
});