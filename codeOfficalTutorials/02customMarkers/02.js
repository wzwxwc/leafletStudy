window.onload = function () {
    var map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer("http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
        subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
    }).addTo(map);

    var greenIcon = L.icon({
        iconUrl: 'img/leaf-green.png',
        shadowUrl: 'img/leaf-shadow.png',

        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
};