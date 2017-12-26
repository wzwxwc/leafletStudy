var MyBoxClass = L.Class.extend({
    options: {
        width: 1,
        height: 1
    },
    initialize: function (name, options) {
        this.name = name;
        //下述这个使得a.options继承了上述默认的options
        L.setOptions(this, options);
        //下述这个不具有继承作用
        // this.options = options;
    }
});
var a = new MyBoxClass('Red', {width: 10});

console.log(a.name); // Outputs "Red"
console.log(a.options.width); // Outputs "10"
console.log(a.options.height); // Outputs "1", the default

var b;
fnSon();

function fnSon() {
    var MyCubeClass = MyBoxClass.extend({
        options: {
            depth: {
                aa: 1
            }
        }
    });

    b = new MyCubeClass('Blue');

    console.log(b.options.width);
    console.log(b.options.height);
    console.log(b.options.depth);
}


