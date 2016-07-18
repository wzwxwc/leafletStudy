/**
 * Created by zcG460 on 2016/7/15.
 */
define([], function () {
    //对WKT字符串进行相应的解析
    var wktUtil = {};
    wktUtil.getLatLngFromPOINT = function (strWkt) {
        //输入strWkt  POINT(6 10)
        //输出point   [10,6]
        var pointLeaflet = [];
        var strPoint = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));
        var arrXY = strPoint.split(' ');
        pointLeaflet.push(parseFloat(arrXY[1]));
        pointLeaflet.push(parseFloat(arrXY[0]));
        return pointLeaflet;
    };

    wktUtil.getLatLngArrFromMULTIPOINT = function (strWkt) {
        //输入strWkt： MULTIPOINT(3.5 5.6, 4.8 10.5)
        //输出arrPoints: [[3.5,5.6],[4.8,10.5]]
        var arrPoints = new Array();
        var strPoints = strWkt.substring(strWkt.indexOf('(') + 1, strWkt.indexOf(')'));

        var arrXYs = strPoints.split(',');
        for (var i = 0; i < arrXYs.length; i++) {
            var point = arrXYs[i].split(' ');
            var pointLeaflet = [point[1], point[0]];
            arrPoints.push(pointLeaflet);
        }
        return arrPoints;
    };

    wktUtil.getLatLngArrFromLINESTRING = function (strWkt) {
        //输入strWkt： LINESTRING(3 4,10 50,20 25)
        //输出arrPoints: [[3,4],[10,50],[20,25]]
        var arrPoints = [];
        var strPoints = strWkt.substring(strWkt.indexOf('('), strWkt.indexOf(')') + 1);
        return this.fnDealWithCell(strPoints);
    };

    wktUtil.getLatLngArrFromPOLYGON = function (strWkt) {
        /*
         第1种可能：
         输入strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))
         输出arrPoints:
         [[
         [1,1],[5,1],[5,5],[1,5],[1,1]
         ],
         [
         [2,2],[2,3],[3,3],[3,2],[2,2]
         ]]
         */
        /*
         第2种可能：
         输入：strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1))
         输出：[[1,1],[5,1],[5,5],[1,5],[1,1]]
         * */
        var arrPoints = [];
        //判断是否包含内边？
        if (strWkt.indexOf('),(') > -1) {
            //存在内边
            /*
             第1种可能：
             输入strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))
             输出arrPoints:
             [[
             [1,1],[5,1],[5,5],[1,5],[1,1]
             ],
             [
             [2,2],[2,3],[3,3],[3,2],[2,2]
             ]]
             */
            var cell1 = strWkt.substring(strWkt.indexOf('((') + 1, strWkt.indexOf('),(') + 1);
            var cell2 = strWkt.substring(strWkt.indexOf('),(') + 2, strWkt.indexOf('))') + 1);
            arrPoints.push(this.fnDealWithCell(cell1));
            arrPoints.push(this.fnDealWithCell(cell2));
            return arrPoints;
        } else {
            //不存在内边
            /*第2种可能：
             输入：strWkt： POLYGON ((1 1,5 1,5 5,1 5,1 1))
             输出：[[1,1],[5,1],[5,5],[1,5],[1,1]]* */
            var cell = strWkt.substring(strWkt.indexOf('((') + 1, strWkt.indexOf('))') + 1);
            //下述push返回的值是1
            arrPoints.push(this.fnDealWithCell(cell));
            return arrPoints;
        }
    };

    /**
     * 处理最小的“字符串单元”
     //输入(3 4,10 50,20 25)
     //输出[[3,4],[10,50],[20,25]]
     */
    wktUtil.fnDealWithCell = function (cell) {
        var results = [];
        var strPoints = cell.substring(cell.indexOf('(') + 1, cell.indexOf(')'));
        var arrXYs = strPoints.split(',');
        for (var i = 0; i < arrXYs.length; i++) {
            var point = arrXYs[i].split(' ');
            //注意：下述2个参数需要从字符串转换为数字
            var pointLeaflet = [parseFloat(point[1]), parseFloat(point[0])];
            results.push(pointLeaflet);
        }
        return results;
    };

    return wktUtil;
});


/*
 改进：
 (1 1,5 1,5 5,1 5,1 1)
 对上述这个，转换为LatLngArr
 这个功能可以单独提取出来


 新方案，仅仅从字符串替换的角度（用replace方法）
 生成一个合适的字符串字面量
 然后直接赋值给一个变量（eval的方式）
 * */