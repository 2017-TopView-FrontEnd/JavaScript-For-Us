# 题目1

***

```
if (!("a" in window)) {
    var a = 1;
}
alert(a);
```

代码看起来是想说：如果window不包含属性a，就声明一个变量a，然后赋值为1。



了解JavaScript里的3个概念：

- 首先，所有的全局变量都是window的属性，语句 var a = 1;等价于window.a = 1; 你可以用如下方式来检测全局变量是否声明：

```
"变量名称" in window
```

- 第二，所有的变量声明都在范围作用域的顶部，看一下相似的例子：

```
alert("a" in window);
var a;
```

此时，尽管声明是在alert之后，alert弹出的依然是true，这是因为JavaScript引擎首先会扫墓所有的变量声明，然后将这些变量声明移动到顶部，最终的代码效果是这样的：

```
var a;
alert("a" in window);
```

这样看起来就很容易解释为什么alert结果是true了。

- 第三，需要理解该题目的意思是，变量声明被提前了，但变量赋值没有，因为这行代码包括了变量声明和变量赋值。

你可以将语句拆分为如下代码：

```
var a;    //声明
a = 1;    //初始化赋值
```

当变量声明和赋值在一起用的时候，JavaScript引擎会自动将它分为两部以便将变量声明提前，不将赋值的步骤提前是因为他有可能影响代码执行出不可预期的结果。

所以，知道了这些概念以后，重新回头看一下题目的代码，其实就等价于：

```
var a;
if (!("a" in window)) {
   a = 1;
}
alert(a);
```

这样，题目的意思就非常清楚了：首先声明a，然后判断a是否在存在，如果不存在就赋值为1，很明显a永远在window里存在，这个赋值语句永远不会执行，所以结果是undefined。

***

**注**：**提前**这个词语显得有点迷惑了，其实就是执行上下文的关系，因为执行上下文分2个阶段：进入执行上下文和执行代码，在进入执行上下文的时候，创建变量对象VO里已经有了：函数的所有形参、所有的函数声明、所有的变量声明

```
VO(global) = {
    a: undefined
}
```

这个时候a已经有了；

然后执行代码的时候才开始走if语句。

***

# 题目2

***

```
var a = 1,
    b = function a(x) {
        x && a(--x);
    };
alert(typeof a);	//number? function?
```



3个重要的概念：

- 首先，在题目1里我们知道了变量声明在进入执行上下文就完成了；

- 第二个概念就是函数声明也是提前的，所有的函数声明都在执行代码之前都已经完成了声明，和变量声明一样。

  函数声明是如下这样的代码：

```
function functionName(arg1, arg2){
    //函数体
}
```

​	如下不是函数，而是函数表达式，相当于变量赋值：

```
var functionName = function(arg1, arg2){
    //函数体
};
```

注：函数表达式没有提前，就相当于平时的变量赋值。

- 第三需要知道的是，函数声明会覆盖变量声明，但不会覆盖变量赋值，为了解释这个，我们来看一个例子：

```
function value(){
    return 1;
}
var value;
alert(typeof value);    //"function"
```

尽快变量声明在下面定义，但是变量value依然是function，也就是说这种情况下，函数声明的优先级高于变量声明的优先级，但如果该变量value赋值了，那结果就完全不一样了：

```
function value(){
    return 1;
}
var value = 1;
alert(typeof value);    //"number"
```

该value赋值以后，变量赋值初始化就覆盖了函数声明。

***

**进入执行上下文**： 这里出现了名字一样的情况，一个是函数申明，一个是变量申明。而填充VO的顺序是: 函数的形参 -> 函数声明 -> 变量声明。当变量声明遇到VO中已经有同名的时候，不会影响已经存在的属性，而函数表达式不会影响VO的内容。

***

重新回到题目，这个函数其实是一个有名函数表达式，函数表达式不像函数声明一样可以覆盖变量声明，所以b只有在执行的时候才会触发里面的内容。但你可以注意到，变量b是包含了该函数表达式，而该函数表达式的名字是a；不同的浏览器对a这个名词处理有点不一样，在IE里，会将a认为函数声明，所以它被变量初始化覆盖了，就是说如果调用a(--x)的话就会出错，而其它浏览器在允许在函数内部调用a(--x)，因为这时候a在函数里面依然是函数。基本上，IE里调用b(2)的时候会出错，但其它浏览器则返回undefined。

理解上述内容之后，该题目换成一个更准确和更容易理解的代码应该像这样：

```
var a = 1,
    b = function(x) {
        x && b(--x);
    };
alert(a);
```

***

# 题目3

***

```
function a(x) {
    return x * 2;
}
var a;
alert(a);
```

这个题目就是函数声明和变量声明的关系和影响，遇到同名的函数声明，VO不会重新定义，所以这时候全局的VO应该是如下这样的：

```
VO(global) = {
    a: 引用了函数声明“a”
}
```

而执行a的时候，相应地就弹出了函数a的内容了。

***

# 题目4

***

```
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);
```

关于这个题目，活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。arguments属性的值是Arguments对象：

```
AO = {
  arguments: <ArgO>
};
```

Arguments对象是活动对象的一个属性，它包括如下属性：

1. callee — 指向当前函数的引用
2. length — 真正传递的参数个数
3. properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是**共享**的。

这个共享其实不是真正的共享一个内存地址，而是2个不同的内存地址，使用JavaScript引擎来保证2个值是随时一样的，当然这也有一个前提，那就是这个索引值要小于你传入的参数个数，也就是说如果你只传入2个参数，而还继续使用arguments[2]赋值的话，就会不一致，例如：

```
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2);
```

这时候因为没传递第三个参数a，所以赋值10以后，alert(a)的结果依然是undefined，而不是10，但如下代码弹出的结果依然是10，因为和a没有关系。

```
function b(x, y, a) {
    arguments[2] = 10;
    alert(arguments[2]);
}
b(1, 2);
```

***

# 题目5

***

```
function a() {
    alert(this);
}
a.call(null);
```

了解2个概念：

首先，就是this值是如何定义的，当一个方法在对象上调用的时候，this就指向到了该对象上，例如：

```
var object = {
    method: function() {
        alert(this === object);    //true
    }
}
object.method(); 
```

上面的代码，调用method()的时候this被指向到调用它的object对象上，但在全局作用域里，this是等价于window（浏览器中，非浏览器里等价于global），在如果一个function的定义不是属于一个对象属性的时候（也就是单独定义的函数），函数内部的this也是等价于window的，例如：

```
function method() {
    alert(this === window);    //true
}
method(); 
```

了解了上述概念之后，我们再来了解一下call()是做什么的，call方法作为一个function执行代表该方法可以让另外一个对象作为调用者来调用，call方法的第一个参数是对象调用者，随后的其它参数是要传给调用method的参数（如果声明了的话），例如：

```
function method() {
    alert(this === window);
}
method();    //true
method.call(document);   //false
```

第一个依然是true没什么好说的，第二个传入的调用对象是document，自然不会等于window，所以弹出了false。

另外，根据ECMAScript262规范规定：如果第一个参数传入的对象调用者是null或者undefined的话，call方法将把全局对象（也就是window）作为this的值。所以，不管你什么时候传入null，其this都是全局对象window，所以该题目可以理解成如下代码：

```
function a() {
    alert(this);
}
a.call(window);
```

所以弹出的结果是[object Window]就很容易理解了。
***

# 题目6

***

```
var strPrimitive = "I am a string";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // true? false?

*************
var strObject = new String("I am a string");
typeof strObject; // "object"
strObject instanceof String; // true? false?
```

- **instanceof ** 运算符用来检测 `constructor.prototype `是否存在于参数 `object `的原型链上。

  eg: 

  ```
  function C(){} 
  function D(){} 

  var o = new C();

  o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype

  o instanceof D; // false，因为 D.prototype不在o的原型链上
  ```

***

上面题目中strPrimitive只是一个string基本类型，不可变的值，而strObject是一个String对象。之所以可以直接对string基本类型使用String对象的方法是因为JavaScript会在必要时自动把字符串字面量转换成一个String对象，数值字面量也是如此，因此定义时推荐用字面量的形式，简洁方便。

***

# 闭包

***

```
var a = 1;

function foo() {
    var a = 2;
    function bar() {
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); 
```

`foo()`执行后，通常整个内部作用域都被销毁，但由于`bar()`本身在使用，就阻止了回收，它拥有`foo()`内部作用域的闭包，使得该作用域能够一直存活，以供`bar()`在之后任何时间进行引用。`bar()`一直持有对该作用域的引用，这个引用就叫作 **闭包**。

***

# 模块

***

```
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];
    function doSomething() {
        console.log(something);
    }
    function doAnother() {
        console.log(another.join("!"));
    }
    return{
        doSomething: doSomething,
        doAnother: doAnoter
    };
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```

闭包的一个强大应用就是模块。



CoolModule()只是一个函数，必须要通过调用它来创建一个模块实例。模块模式需要具备两个必要条件：

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块。

***

# [[scope]]属性

***

```
var foo = {};
 
(function initialize() {
 
  var x = 10;
 
  foo.bar = function () {
    alert(x);
  };
 
})();
 
foo.bar(); 
 
alert(x); 
```

函数foo.bar（通过[[Scope]]属性）访问到函数initialize的内部变量“x”。同时，“x”在外部不能直接访问。在许多库中，这种策略常用来创建”私有”数据和隐藏辅助实体。

***

函数内部的[[scope]]属性是虚拟出来的一个属性，我们实际访问时访问不到这个属性的，这个属性是为了让我们更好的理解函数，虚拟出来的一个属性。

我们在创建函数时就会生成这样的一个属性，这个属性保存着这个函数的父作用域的作用域链。在函数执行时，函数会生成一个scope属性，这个属性保存着函数在执行上下文时创建的活动对象（活动对象包括函数内部的局部变量和函数参数）和函数的内部的[[scope]]属性。

***

```
var x = 10;
function foo () {
    console.log(x);
}
foo(); // 10
function fun () {
    var x = 20;
    var foo1 = foo;
    foo1();   // 10还是20？
}
fun();
```

原因是：

​        在复制函数的时候，复制后的函数与复制前的函数引用的是同一个[[scope]]属性，由于foo的[[scope]]属性中的x是保存在函数父作用域链中的，在这是指的全局的变量对象（也就是全局变量）中的x，foo1中[[scope]]属性与foo的相同，所以foo1在执行创建的scope，只有foo1内部的[[scope]]属性（也就是foo内部的[[scope]]属性），所以在查找原型链时，foo1作用域链就直接查找到了全局对象中的x属性，所以会返回10。

***

# 隐式屏蔽

***
```
var anotherObject = {
	a:2
};
var myObject = Object.create( anotherObject );
anotherObject.a; // 2
myObject.a; // 2
anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false
myObject.a++; // 隐式屏蔽！
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true
```
- **Object.create()** 方法会使用指定的原型对象及其属性去创建一个新的对象。

- **hasOwnProperty()** 方法会返回一个布尔值，指示对象是否具有指定的属性作为自身（不继承）属性。

  > 所有继承了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的对象都会继承到 `hasOwnProperty` 方法。这个方法可以用来检测一个对象是否含有特定的自身属性；和 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

- `myObject.a++;`相当于`myObject.a = myObject.a + 1;`这样给myObject新建了屏蔽属性a！

***

