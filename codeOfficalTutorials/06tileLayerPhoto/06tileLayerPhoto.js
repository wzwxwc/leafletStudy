/**
 * 时间：2017/12/26
 * 作者：张超
 * 功能：扩展TileLayer
 */

var map = L.map("divMap", {
    preferCanvas: true
});
map.setView([0, 0], 1);
/*
初始一个map，只需要上述2步就可以了
1、map对象的div
2、中心点
3、当前缩放比例

我没有设置，那个缩放的操作，为什么只能到18级别呢？
默认图片大小都给的是256*256，而我的照片本身不是这个大小
* */

L.tileLayer.photo().addTo(map);