/**
 * Created by zcG460 on 2016/7/15.
 */
//依赖的对象
//1、L

//对WKT字符串进行相应的解析
var wktUtil = {};
wktUtil.getPointArrayFromMULTIPOINT = function (strWkt) {
    //输入strWkt： MULTIPOINT(3.5 5.6, 4.8 10.5)
    //输出arrPoints: [[3.5,5.6],[4.8,10.5]]
    var arrPoints = new Array();
    var strPoints = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));
    var arrXYs = strPoints.split(',');
    for (var i = 0; i < arrXYs.length; i++) {
        var point = arrXYs[i].split(' ');
        var pointLeaflet = [point[1], point[0]];
        L.marker(pointLeaflet).addTo(mymap);
        arrPoints.push(pointLeaflet);
    }
    return arrPoints;
};

wktUtil.getPointArrayFromLINESTRING = function (strWkt) {
    //输入strWkt： LINESTRING(3 4,10 50,20 25)
    //输出arrPoints: [[3,4],[10,50],[20,25]]
    var arrPoints = new Array();
    var strPoints = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));
    var arrXYs = strPoints.split(',');
    for (var i = 0; i < arrXYs.length; i++) {
        var point = arrXYs[i].split(' ');
        var pointLeaflet = [point[1], point[0]];
        arrPoints.push(pointLeaflet);
    }
    L.polyline(arrPoints);
    return arrPoints;
};

