/**
 * Created by zcG460 on 2016/7/15.
 */
//依赖的对象
//1、L

//对WKT字符串进行相应的解析
var wktUtil = {};
wktUtil.getLatLngArrFromMULTIPOINT = function (strWkt) {
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

wktUtil.getLatLngArrFromLINESTRING = function (strWkt) {
    //输入strWkt： LINESTRING(3 4,10 50,20 25)
    //输出arrPoints: [[3,4],[10,50],[20,25]]
    var arrPoints = [];
    var strPoints = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));
    var arrXYs = strPoints.split(',');
    for (var i = 0; i < arrXYs.length; i++) {
        var point = arrXYs[i].split(' ');
        //注意：下述2个参数需要从字符串转换为数字
        var pointLeaflet = [parseFloat(point[1]), parseFloat(point[0])];
        arrPoints.push(pointLeaflet);
    }
    return arrPoints;
};

wktUtil.getLatLngArrFromPOLYGON = function (strWkt) {
    //输入strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))
    /*输出arrPoints:
     [
     [1,1],[5,1],[5,5],[1,5],[1,1]
     ],
     [
     [2,2],[2,3],[3,3],[3,2],[2,2]
     ]*/
    //输入：strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1))
    /*
     输出：
     [1,1],[5,1],[5,5],[1,5],[1,1]
     * */
    var arrPoints = [];
    //判断是否包含内边？
    if (strWkt.indexOf('((') > -1) {

    }
    var strPoints = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));
    var arrXYs = strPoints.split(',');
    for (var i = 0; i < arrXYs.length; i++) {
        var point = arrXYs[i].split(' ');
        //注意：下述2个参数需要从字符串转换为数字
        var pointLeaflet = [parseFloat(point[1]), parseFloat(point[0])];
        arrPoints.push(pointLeaflet);
    }
    return arrPoints;
};

