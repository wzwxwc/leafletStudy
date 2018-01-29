/**
 * 时间：2018/1/25
 * 作者：张超
 * 功能：
 */
var MyBoxClass = L.Class.extend({
    options: {
        width: 1,
        height: 1
    },
    initialize: function (name, options) {
        this.name = name;
        L.setOptions(this, options);
    }
});
var instance = new MyBoxClass('Red', {width: 10});
console.log(instance.name); // Outputs "Red"
console.log(instance.options.width); // Outputs "10"
console.log(instance.options.height); // Outputs "1", the default


var MyCubeClass = MyBoxClass.extend({
    options: {
        depth: 1
    }
});
var instance = new MyCubeClass('Green');
console.log(instance.options.width); // Outputs "1", parent class default
console.log(instance.options.height); // Outputs "1", parent class default
console.log(instance.options.depth); // Outputs "1"


var My3Class = MyCubeClass.extend({
    options: {
        type: 111
    }
});
var instance = new My3Class('Blue');
console.log(instance.options.width); // Outputs "1", parent class default
console.log(instance.options.height); // Outputs "1", parent class default
console.log(instance.options.depth);    // Outputs "1"
console.log(instance.options.type);     // Outputs "111"

