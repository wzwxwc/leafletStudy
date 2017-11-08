var map;
window.onload = function () {
    map = zcMap.fnInitTdt("mapid");
};

//————————————————————————
var MyDemoClass = L.Class.extend({
    // A property with initial value = 42
    myDemoProperty: 42,
    // A method
    myDemoMethod: function () {
        return this.myDemoProperty;
    }
});
var myDemoInstance = new MyDemoClass();
// This will output "42" to the development console
console.log(myDemoInstance.myDemoMethod());

//————————————————————————
MyDemoClass.include({
    // Adding a new property to the class
    _myPrivateProperty: 78,
    // Redefining a method
    myDemoMethod: function () {
        return this._myPrivateProperty;
    }
});
var mySecondDemoInstance = new MyDemoClass();
// This will output "78"
//下述这个怎么删不掉属性？
//回答，因为这个属性不是实例属性，而是一个prototype的属性
delete mySecondDemoInstance.myDemoMethod;
console.log(mySecondDemoInstance.myDemoMethod());
// However, properties and methods from before still exist
// This will output "42"
console.log(mySecondDemoInstance.myDemoProperty);