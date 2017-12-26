/**
 * 时间：2017/12/26
 * 作者：张超
 * 功能：扩展现有的Marker
 */
L.MyMarker = L.Marker.extend({
    initialize: function (latlng, options) {
        L.Marker.prototype.initialize.call(this, latlng, options);
        this.bindPopup("你好", {
            autoPan: true,
            keepInView: true,
            autoClose: false
        }).openPopup();
    },
    onAdd: function (map) {
        L.Marker.prototype.onAdd.call(this, map);
        this.openPopup();
    }
});
L.myMarker = function (latlng, options) {
    return new L.MyMarker(latlng, options);
};

/*
*如何让那个popup一直显示？起码是需要手动关闭才可以关掉
*
* */