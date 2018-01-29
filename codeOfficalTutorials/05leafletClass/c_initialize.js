/**
 * 时间：2018/1/25
 * 作者：张超
 * 功能：
 */
var A = L.Class.extend({
    options: {
        a: "a"
    },
    initialize: function () {
        console.log("类A的构造函数被执行");
    }
});

var B = A.extend({
    options: {
        b: "b"
    },
    initialize: function () {
        console.log("类B的构造函数被执行");
    }
});

var C = B.extend({
    options: {
        c: "c"
    },
    initialize: function () {
        console.log("类C的构造函数被执行");
    }
});
C.addInitHook(function () {
    console.log("类C的addInitHook方法被执行");
    console.log(this.options.a);
    console.log(this.options.b);
    console.log(this.options.c);
});
var c = new C();