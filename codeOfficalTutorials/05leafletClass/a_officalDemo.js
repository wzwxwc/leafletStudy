/**
 * 时间：2018/1/25
 * 作者：张超
 * 功能：
 */
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
console.log(mySecondDemoInstance.myDemoMethod());
// However, properties and methods from before still exist
// This will output "42"
console.log(mySecondDemoInstance.myDemoProperty);