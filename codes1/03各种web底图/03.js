var map = null;
window.onload = function () {
    map = L.map('map', {scrollWheelZoom: true, center: [40.7127837, -74.0059413], zoom: 8});
    fnLoadTdt();
};


function bad() {
    var layer = L.tileLayer('https://vector.mapzen.com/osm/{layers}/{z}/{x}/{y}.{format}?api_key=vector-tiles-xxxxxxx', {attribution: '<a href="https://www.mapzen.com/rights">Attribution.</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'});

    map.addLayer(layer);
}

//加载天地图的底图
function fnLoadTdt() {
    // 影像
    L.tileLayer("http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
    }).addTo(map);
    // 地名标注
    L.tileLayer("http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
    }).addTo(map);
    // 边界
    L.tileLayer("http://t{s}.tianditu.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
    }).addTo(map);
}

//加载geoserver的底图
function fnLoadGeoserver() {

}

//加载arcgis的底图
function fnLoadArcGis() {

}