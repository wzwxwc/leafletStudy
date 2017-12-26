/**
 * 时间：2017/12/26
 * 作者：张超
 * 功能：扩展现有的Marker
 */
L.MyMarker = L.Marker.extend({
    //构造函数initialize如果省略，会自动调用父类的构造函数
    // initialize: function (latlng, options) {
    //     L.Marker.prototype.initialize.call(this, latlng, options);
    //     this.bindPopup("你好", {
    //         autoPan: true,
    //         keepInView: true,
    //         autoClose: false
    //     }).openPopup();
    // },
    onAdd: function (map) {
        L.Marker.prototype.onAdd.call(this, map);
        //下述的this是指什么？MyMarker类的实例对象吗？
        this.bindPopup("你好", {
            autoPan: true,
            keepInView: true,
            autoClose: false
        }).openPopup();
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