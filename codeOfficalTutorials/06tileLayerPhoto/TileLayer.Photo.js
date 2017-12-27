/**
 * 时间：2017/12/26
 * 作者：张超
 * 功能：显示照片的图层扩展类
 */
if (!L.TileLayer) {
    L.TileLayer = {};
}
L.TileLayer.Photo = L.TileLayer.extend({
    getTileUrlOld: function (coords) {
        var data = {
            r: Browser.retina ? '@2x' : '',
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
            var invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        return Util.template(this._url, Util.extend(data, this.options));
    },
    getTileUrl: function (coords) {
        var i = Math.ceil(Math.random() * 12);
        return "./img/t" + i + ".jpg";
    }
});

L.tileLayer.photo = function () {
    return new L.TileLayer.Photo();
};