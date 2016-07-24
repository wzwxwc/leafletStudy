/**
 * Created by zcG460 on 2016/7/21.
 */

require.config({
    paths: {
        leaflet: "../../deps/v0.7.7/leaflet-src"
    }
});
define(["leaflet"], function () {
    /**
     * 根据原始点和偏移、角度等参数计算出偏移点
     * @param soureLatLng   原始点：LatLng类型、eg：[23,116]
     * @param brng          角度：数值型、eg：90（代表90度）
     * @param dist          距离：数值型、eg：100（代表100米）
     * @returns {*}         偏移后的点
     */
    function fnGetDestinationLatLng(soureLatLng, brng, dist) {
        dist = dist / 6378137;
        brng = brng * Math.PI / 180;
        var lat1 = soureLatLng.lat * Math.PI / 180, lon1 = soureLatLng.lng * Math.PI / 180;
        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                Math.cos(lat1),
                Math.cos(dist) - Math.sin(lat1) *
                Math.sin(lat2));
        if (isNaN(lat2) || isNaN(lon2)) return null;
        return new L.latLng(lat2 * 180 / Math.PI, lon2 * 180 / Math.PI);
    }

    /**
     * 参数有效性检查
     */
    function fnCheckArgumentsValidation(map, circleCenterLatLng, radius) {
        if (map && circleCenterLatLng && radius) {
            return true;
        } else {
            console.error("传入的参数含有空值");
            return false;
        }
        if (circleCenterLatLng.length != 2 || isNaN(circleCenterLatLng[0]) || isNaN(circleCenterLatLng[1])) {
            console.error("centerPoint参数不满足要求");
            return false;
        }
        if (isNaN(radius)) {
            console.log("radius必须是数字");
            return false;
        }
        return true;
    }


    /**
     * 得到一个circle的wkt polygon的字符串
     * @param circle        要进行wkt化的圆
     * @param sumCount      返回的polygon中包含的点个数
     * @returns {string}    circle的wkt polygon的形式
     */
    function fnGetCircleWKT(circle, sumCount) {
        var wktPolygon = "POLYGON((";
        var increment = 360 / sumCount;
        for (var i = 0; i < sumCount; i++) {
            var newPointLatLng = fnGetDestinationLatLng(circle.getLatLng(), increment * i, circle.getRadius());
            wktPolygon += newPointLatLng.lng + " " + newPointLatLng.lat + ","
        }
        wktPolygon = wktPolygon.substring(0, wktPolygon.length - 1);
        wktPolygon += "))";
        return wktPolygon;
    }

    var temp = function (map, circleCenterLatLng, radius, fnCallback) {
        var htmlTemplate = '<img style="width:20px;height: 20px;" src="/leafletStudy/commonModules/BufferCircle/imgs/handle.png" alt=""><input type="text" style="width: 60px;" value="@@"/><label for="">米</label>';
        var handleIcon = L.divIcon({
            html: htmlTemplate
        });

        //在使用之前，要不要对centerPoint和radius进行校验？
        //校验该放在哪里进行？
        if (!fnCheckArgumentsValidation(map, circleCenterLatLng, radius)) {
            return;
        }
        var circle = L.circle(circleCenterLatLng, radius).addTo(map);

        var latLngHandle = fnGetDestinationLatLng(L.latLng(circleCenterLatLng[0], circleCenterLatLng[1]), 90, radius);
        var newHtml = htmlTemplate.replace("@@", radius);
        handleIcon.options.html = newHtml;
        var markerHandle = L.marker(latLngHandle, {
            icon: handleIcon,
            draggable: true
        }).addTo(map);
        markerHandle.on("drag", function () {
            // debugger
            var distance = this.getLatLng().distanceTo(circleCenterLatLng);
            var newHtml = htmlTemplate.replace("@@", distance);
            handleIcon.options.html = newHtml;
            markerHandle.setIcon(handleIcon);
            circle.setRadius(distance);
            // circle.update();
        });
        //为什么没有mouseup事件？不过下述事件也不错
        markerHandle.on("dragend", function () {
            fnDraggedHandler();
        });

        function fnDraggedHandler(newCircleRadius) {
            if (newCircleRadius) {
                var latLngCircleCenter = circle.getLatLng();
                var latLngMarkerHandlePosition = fnGetDestinationLatLng(latLngCircleCenter, 90, newCircleRadius);
                markerHandle.setLatLng(latLngMarkerHandlePosition);
                circle.setRadius(newCircleRadius);
            }
            if (fnCallback) {
                fnCallback(circle.getLatLng(), circle.getRadius(), fnGetCircleWKT(circle, 100));
            }
            map.fitBounds(circle);
        }

        markerHandle.on("dblclick", function (e) {
            // debugger
            var domMarkerHandle = e.originalEvent.currentTarget;
            var inputDom = domMarkerHandle.childNodes[1];
            inputDom.focus();
            inputDom.select();
            inputDom.onkeydown = function (e) {
                if (e.keyCode == 13) {
                    var inputNum = Number(inputDom.value);
                    if (inputNum > 0) {
                        fnDraggedHandler(parseFloat(inputDom.value));
                        // this.blur();
                    } else {
                        alert("半径应该设置一个大于0的数。")
                    }
                }
            }
        });
        //如果能够再缩放几个级别就好了
        map.fitBounds(circle);
        // map.zoomOut(1);

        // circle.on('dblclick', fnCircleDbclickHandler);
        /**
         * 圆的双击事件，控制handle的显示与隐藏——未使用
         */
        function fnCircleDbclickHandler() {
            console.log("触发了circel的mouseover    dblclick事件");
            if (this._user_handle) {
                this._user_handle = false;
                map.removeLayer(markerHandle);
                return;
            }
            // debugger
            var latLngCircleCenter = this.getLatLng();
            var radius = this.getRadius();
            var latLngMarkerHandlePosition = fnGetDestinationLatLng(latLngCircleCenter, 90, radius);
            //最好是设置为圆心往右偏半径的距离
            markerHandle.setLatLng(latLngMarkerHandlePosition);
            var newHtml = htmlTemplate.replace("@@", radius);
            handleIcon.options.html = newHtml;
            markerHandle.setIcon(handleIcon);
            markerHandle.update();
            markerHandle.addTo(map);
            this._user_handle = true;
            // mymap.setView(latLngOffset);
        }

    };
    return temp;


});

/*
 在circle对象事件绑定的问题上
 1、原生js事件绑定
 2、svg的事件绑定
 3、leaflet自带的on方法
 4、leaflet自带的addListener
 想一想上述哪个方法好？哪个方便调试？

 leaflet的上述事件机制
 哪一种是添加？而不是覆盖？
 即多一种事件处理函数，而不是现在设置的事件处理函数“覆盖”之前的事件处理函数


 * */
