/**
 * 根据特定的规则和参数，来进行绘画
 * Created by zcG460 on 2016/7/18.
 */
define(["WKTDraw"], function (WKTDraw) {
    var temp = function (map) {
        if (!map) {
            console.error("没有传入地图对象，无法继续执行！")
            return;
        }
        var wktDraw = new WKTDraw(map);
        this.draw = function (jsonArguments) {
            var recordList = fnDealWithValueField(jsonArguments.value);
            for (var recordid in recordList) {
                var record = recordList[recordid];
                //开始生成Geometry，并绑定相关的属性
                if (jsonArguments.geotype) {
                    if (jsonArguments.geotype.indexOf(record.geotype) > -1) {
                        fnDrawWkt(record);
                    } else {
                        continue;
                    }
                } else {
                    fnDrawWkt(record);
                }
            }
        }

        function fnDealWithValueField(value) {
            /*
             中英文对照
             名称                            name
             ※※记录ID                      id
             ※※点、线、面的wkt格式数据     wkt
             ※※显示信息                    info
             @@
             名称                            name
             ※※记录ID                      id
             ※※经度值                      lon
             ※※纬度                        lat
             ※※显示信息                    info
             @@……”*/
            var recordList = {};
            var recordStrArr = value.split('@@');
            for (var i = 0; i < recordStrArr.length; i++) {
                var recordStr = recordStrArr[i];
                var fieldStrArr = recordStr.split('※※');
                var record = {};
                record.name = fieldStrArr[0];
                record.id = fieldStrArr[1];

                if (isNaN(parseFloat(fieldStrArr[2]))) {
                    //按照wkt的方式来解析
                    record.wkt = fieldStrArr[2];
                    var wkt = record.wkt;
                    record.info = fieldStrArr[3];
                    if (wkt.indexOf('POINT') >= 0) {
                        record.geotype = "1";
                    } else if (wkt.indexOf('LINESTRING') >= 0) {
                        record.geotype = "2";
                    } else if (wkt.indexOf('POLYGON') >= 0) {
                        record.geotype = "3";
                    } else {
                        console.lon("id 为" + fieldStrArr[1] + "的记录不存在有效的位置信息。");
                        continue;
                    }

                } else {
                    //按照经纬度的方式来解析
                    record.lon = fieldStrArr[2];
                    record.lat = fieldStrArr[3];
                    record.info = fieldStrArr[4];
                    record.wkt = "POINT(" + record.lon + " " + record.lat + ")";
                    record.geotype = "1";
                }
                recordList[record.id] = record;
            }
            return recordList;
        }

        function fnDrawWkt(record) {
            switch (record.geotype) {
                case "1":
                    wktDraw.drawWktPOINT(record.wkt);
                    break;
                case "2":
                    wktDraw.drawWktLINESTRING(record.wkt);
                    break;
                case "3":
                    wktDraw.drawWktPOLYGON(record.wkt);
                    break;
                default:
                    break;
            }
        }

        this.clear = function () {
            wktDraw.clear();
        }

    };
    return temp;
})
