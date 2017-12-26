var map;
window.onload = function () {
    map = mapUtil.fnInitTdt("mapid");
};


//————————————————————————
var MyDemoClass = L.Class.extend({
    // A property with initial value = 42
    zc_p1: 42,
    zc_p2: [1, 2],
    zc_p3: {
        a: 1,
        b: 2
    },
    // A method
    zc_m1: function () {
        return this.zc_p1;
    }
});
var a = new MyDemoClass();
// This will output "42" to the development console
console.log(a);

//————————————————————————
fnInclude();

function fnInclude() {
    MyDemoClass.include({
        // Adding a new property to the class
        _myPrivateProperty: 78,
        // Redefining a method
        myDemoMethod: function () {
            return this._myPrivateProperty;
        }
    });
    var b = new MyDemoClass();
    // This will output "78"
    // 下述这个怎么删不掉属性？
    // 回答，因为这个属性不是实例属性，而是一个prototype的属性
    // delete mySecondDemoInstance.myDemoMethod;
    // console.log(mySecondDemoInstance.myDemoMethod());
    // However, properties and methods from before still exist
    // This will output "42"
    console.log(b);
}
