/**
 * Created by zcRescuer on 2016/10/11.
 */
window.onload = function () {
    $.ajax({
        type: "GET",
        url: "data/reservoir.xml",
        dataType: "xml",
        success: function (xmlData) {
            var strJsonFromXml=xml2json(xmlData,"");
            var jsonDataArray=fnCreateJsonDataArray(strJsonFromXml,'L3566');
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
        var strLatLng=oneObject["gml:multiPointProperty"]["gml:MultiPoint"]["gml:pointMember"]["gml:Point"]["gml:coordinates"];
        oneObjectWanted.latitude=strLatLng.split(' ')[1];
        oneObjectWanted.longitude=strLatLng.split(' ')[0];
        result.push(oneObjectWanted);
    }
    console.log(result);
    return result;
}
