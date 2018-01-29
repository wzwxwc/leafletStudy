/**
 * 时间：2018/1/29
 * 作者：张超
 * 功能：制作一个继承了L.Class的类
 */

var MyClass = L.Evented.extend({
    initialize: function () {
        console.log("执行了MyClass的initialize方法");
    }
});
MyClass.addInitHook(function () {
    console.log("执行了MyClass的addInitHook方法");
});

var class1 = new MyClass();
//下述就是自定义事件！
class1.on("test", function () {
    console.log("执行了test的事件绑定");
});
class1.fire("test");


var a = {};
a._events = {
    type: []
};
var b = a._events.type;
//下述2句话会有不一样的效果
//一个影响了a._events.type
//而另一个没有！
// b.push(12);
b = 33;
console.log(a._events.type);