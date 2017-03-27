/**
 * Created by zcRescuer on 2016/11/11.
 */

var href = window.location.href;
var paramsArray = href.split('heatmap.html?')[1].split('&');
var params = {};
for (var i = 0, p; i < paramsArray.length; i++) {
    p = paramsArray[i];
    params[p.split('=')[0]] = p.split('=')[1];
}
var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    "radius": 25,
    "maxOpacity": 1,
    // scales the radius based on map zoom
    //"scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count',
    onExtremaChange: updateLegend
};
var heatmapLayer = new HeatmapOverlay(cfg);
var center = [], centerArray = params.center.split(',');
center.push(centerArray[1]);
center.push(centerArray[0]);
var map = new ME.Map('map').setView(center, params.zoom);
map.addLayer(heatmapLayer);

var http = new XHR({
    cross: true
});
var isDragging = false;
map.on('dragstart', function () {
    tooltip.style.display = 'none';
    isDragging = true;
});
map.on('dragend zoomend', callback);
function wrapBox(box) {//bbox只要一个超出中国，就查全国
    var sw = box.getSouthWest();
    var ne = box.getNorthEast();
    if (sw.lat < 0 || sw.lat > 55 || sw.lng < 72 || sw.lng > 138 || ne.lat < 0 || ne.lat > 55 || ne.lng < 72 || ne.lng > 138) {
        sw.lng = 72;
        sw.lat = 0;
        ne.lng = 138;
        ne.lat = 55;
    }
    return box;
}
function callback() {
    isDragging = false;
    params.query = params.query ? params.query : "{}";
    params.startTime = params.startTime ? params.startTime : "";
    params.endTime = params.endTime ? params.endTime : "";
    var paramsArray = [];
    for (var key in params) {
        paramsArray.push(key + '=' + params[key]);
    }
    var bounds = map.getBounds();
    bounds = wrapBox(bounds);
    http.get('/dataSpQuery/heatmap?' + paramsArray.join('&') + '&bbox=' + bounds.toBBoxString() + '&z=' + map.getZoom(), {}, function (result) {
        var result = eval('(' + result + ')');
        if (result.success) {
            heatmapLayer.setData({
                //max: 8,
                data: result.data
            });
        } else {
            alert(result.msg);
        }
    });
}

// we want to display the gradient, so we have to draw it
var legendArea = document.querySelector('#legendArea');
var legendCanvas = document.createElement('canvas');
legendCanvas.width = 100;
legendCanvas.height = 10;
var min = document.querySelector('#min');
var max = document.querySelector('#max');
var gradientImg = document.querySelector('#gradient');
var legendCtx = legendCanvas.getContext('2d');
var gradientCfg;
function updateLegend(data) {
    //console.info(data);
    // the onExtremaChange callback gives us min, max, and the gradientConfig
    // so we can update the legend
    min.innerHTML = data.min;
    max.innerHTML = data.max;
    // regenerate gradient image
    if (data.gradient != gradientCfg) {
        gradientCfg = data.gradient;
        var gradient = legendCtx.createLinearGradient(0, 0, 100, 1);
        for (var key in gradientCfg) {
            gradient.addColorStop(key, gradientCfg[key]);

            legendCtx.fillStyle = gradient;
            legendCtx.fillRect(0, 0, 100, 10);
            gradientImg.src = legendCanvas.toDataURL();
        }
    }
    legendArea.style.display = 'block';
}

/* tooltip code start */
var demoWrapper = document.body;
var tooltip = document.querySelector('.tooltip');
function updateTooltip(x, y, value) {
    // + 15 for distance to cursor
    var transform = 'translate(' + (x + 10) + 'px, ' + (y + 10) + 'px)';
    tooltip.style.MozTransform = transform;
    tooltip.style.msTransform = transform;
    tooltip.style.OTransform = transform;
    tooltip.style.WebkitTransform = transform;
    tooltip.style.transform = transform;
    tooltip.innerHTML = value;
}

demoWrapper.onmousemove = function (ev) {
    if (isDragging) {
        return;
    }
    var x = ev.layerX;
    var y = ev.layerY;
    // getValueAt gives us the value for a point p(x/y)
    var value = heatmapLayer._heatmap.getValueAt({x: x, y: y});
    tooltip.style.display = 'block';
    updateTooltip(x, y, value);
};
demoWrapper.onmouseout = function () {
    tooltip.style.display = 'none';
};
callback();