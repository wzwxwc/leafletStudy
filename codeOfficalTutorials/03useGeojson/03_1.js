var map = "";
window.onload = function () {
    map = zcMap.fnInitTdt("mapid");
    map.panTo([39.91289633555756, 116.46469116210939]);
    map.setZoom(10);

    $.ajax({
        url: "data.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            L.geoJSON(data.road, {
                style: function (feature) {
                    return {color: "blue"}
                }
            }).addTo(map);
        },
        error: function (e) {

        }
    })
};

/*
* 改进：
* 如果能够显示每段路线的tooltip就好了
* */