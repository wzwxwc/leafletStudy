/**
 * WKT字符串转换为地图上的点、线、面（support leaflet only）
 * Created by zcG460 on 2016/7/18.
 */
define(["WKTUtil", "leaflet"], function (wktUtil) {
    var temp = function (map) {
        /**
         * 绘制图形的容器
         * @type {Array}
         */
        var elementContainer = [];
        /**
         * 所有绘制的图形的外接矩形
         * @type {Array}
         */
        var boundsAll = [];

        /**
         * 画单点POINT
         * @param strWkt POINT的WKT表达式
         */
        this.drawWktPOINT = function (strWkt) {
            if (!strWkt) {
                strWkt = 'POINT(-0.14659881591796875 51.48918632012956)';
            }
            var latLng = fnParseWkt(strWkt);
            elementContainer.push(L.marker(latLng[0]).addTo(map));
            boundsAll = boundsAll.concat(latLng);
        }

        /**
         * 画多点MULTIPOINT
         * @param strWkt MULTIPOINT的WKT表达式
         */
        this.drawWktMULTIPOINT = function (strWkt) {
            if (!strWkt) {
                strWkt = "MULTIPOINT(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
            }
            var latLngBounds = fnParseWkt(strWkt);
            for (var i = 0; i < latLngBounds.length; i++) {
                elementContainer.push(L.marker(latLngBounds[i]).addTo(map));
            }
            boundsAll = boundsAll.concat(latLngBounds);
            map.fitBounds(boundsAll);
        }

        /**
         * 画简单线LINESTRING
         * @param strWkt LINESTRING的WKT表达式
         */
        this.drawWktLINESTRING = function (strWkt) {
            if (!strWkt) {
                strWkt = "LINESTRING(-0.19002914428710938 51.49869827721546,-0.1560401916503906 51.51301590715673,-0.12805938720703125 51.50810140697543)";
            }
            var latLngBounds = fnParseWkt(strWkt);
            elementContainer.push(L.polyline(latLngBounds, {
                color: "red"
            }).addTo(map));
            boundsAll = boundsAll.concat(latLngBounds);
            map.fitBounds(boundsAll);
        }

        /**
         * 画单个多边形(有内边和无内边)POLYGON
         * @param strWkt POLYGON的WKT表达式
         */
        this.drawWktPOLYGON = function (strWkt) {
            if (!strWkt) {
                var strWkt = "POLYGON(" +
                    "(-0.14574050903320312 51.51376371940495,-0.12531280517578122 51.50649873794456,-0.12342453002929686 51.49624032118747,-0.160675048828125 51.498270816123465),(-0.13269424438476562 51.51718213334982,-0.11295318603515625 51.5072466571743,-0.11243820190429688 51.49057583090478,-0.13338088989257812 51.48865188163204,-0.16204833984375 51.491110246849814,-0.17337799072265625 51.50307952226442,-0.16565322875976562 51.512588580360244,-0.15552520751953125 51.51760941705477))";
            }
            // var data = "POLYGON((-0.14574050903320312 51.51376371940495,-0.12531280517578122 51.50649873794456,-0.12342453002929686 51.49624032118747,-0.160675048828125 51.498270816123465))";
            var dataParsed = fnParseWkt(strWkt);
            elementContainer.push(L.polygon(dataParsed, {
                color: "red"
            }).addTo(map));
            boundsAll = boundsAll.concat(dataParsed);
            map.fitBounds(boundsAll);
            // var bounds = [];
            // for (var i = 0; i < dataParsed.length; i++) {
            //     bounds = bounds.concat(dataParsed[i]);
            // }
            // if (bounds.length != 0) {
            //     mymap.fitBounds(dataParsed);
            // }
        };

        this.clear = function () {
            for (var i = 0; i < elementContainer.length; i++) {
                map.removeLayer(elementContainer[i]);
            }
            elementContainer = [];
            //清空数组
            boundsAll = [];
        }

        function fnParseWkt(strWkt) {
            if (strWkt) {
                var strType = strWkt.substr(0, strWkt.indexOf('('));
                switch (strType) {
                    case 'POINT':
                        return wktUtil.getLatLngFromPOINT(strWkt);
                    case 'MULTIPOINT':
                        return wktUtil.getLatLngArrFromMULTIPOINT(strWkt);
                    case "LINESTRING":
                        return wktUtil.getLatLngArrFromLINESTRING(strWkt);
                    case "POLYGON":
                        return wktUtil.getLatLngArrFromPOLYGON(strWkt);
                    default:
                        break;
                }
            }
        }

    };
    return temp;
});

