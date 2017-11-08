var map = zcMap.fnInitMapBox("mapid");
L.geoJson(statesData, {
    style: style
}).addTo(map);

function style(feature) {
    return {
        fillColor: getColorMe(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}

function getColorMe(d) {
    var c = "";
    if (d > 1000) {
        c = '#800026';
    } else if (d > 500) {
        c = '#BD0026';
    } else if (d > 200) {
        c = '#E31A1C';
    } else if (d > 100) {
        c = '#FC4E2A';
    } else if (d > 50) {
        c = '#FD8D3C';
    } else if (d > 20) {
        c = '#FEB24C';
    } else if (d > 10) {
        c = '#FED976';
    } else {
        c = '#FFEDA0';
    }
    return c;
}