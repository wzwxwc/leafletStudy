/**
 * Created by zcRescuer on 2016/10/11.
 */
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "data/line.xml",
        dataType: "xml",
        success: function (xmlData) {
            var strJsonFromXml=xml2json(xmlData,"");
            var jsonDataArray=fnCreateJsonDataArray(strJsonFromXml,'L3548');
            console.log(jsonDataArray);
        }
    });
}

/**
 * xmlJson生成jsonDataArray
 * @param xmlJson
 */
function fnCreateJsonDataArray(strJsonFromXml,layerName) {
    var jsonFromXml=JSON.parse(strJsonFromXml);
    var result=[];
    var arrayOriginal=jsonFromXml["wfs:FeatureCollection"]["gml:featureMember"];
    for(var i=0;i<arrayOriginal.length;i++){
        var oneObject=arrayOriginal[i]["esri:"+layerName];
        var oneObjectWanted={};
        for(var x in oneObject){
            if(x.indexOf("esri:")==0){
                oneObjectWanted[x.substr(5)]=oneObject[x];
            }
        }
        //如果使用find会好点
        var strLatLng=oneObject["gml:envelope"];
        var arrCoor=strLatLng.split(',');
        var xMin=parseFloat(arrCoor[0]);
        var yMin=parseFloat(arrCoor[1]);
        var xMax=parseFloat(arrCoor[2]);
        var yMax=parseFloat(arrCoor[3]);
        oneObjectWanted.latitude=(xMin+xMax)/2;
        oneObjectWanted.longitude=(yMin+yMax)/2;
        result.push(oneObjectWanted);
    }
    console.log(result);
    return result;
}
