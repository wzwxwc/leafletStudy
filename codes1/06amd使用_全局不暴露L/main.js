/**
 * Created by zcT450 on 2016/9/1.
 */
require.config({
    paths: {
        leaflet: "leaflet/leaflet-src"
    }
});
var aa = null;
require(["leaflet"], function (test) {
    console.log(test.version);
    aa = test;
})