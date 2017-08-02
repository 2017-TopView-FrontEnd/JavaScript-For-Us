#### 普通的函数声明与调用方式有以下几种：
```
// 声明函数f1
function f1() {
	console.log("f1");
}

// 通过()来调用此函数
f1();

// 或者
// 建立匿名函数并赋予变量f2
var f2 = function() {
	console.log("f2");
}

// 通过()来调用此函数
f2();
```

无论定义一个函数像这样function foo(){}或者var foo = function(){}，调用时，都需要在后面加上一对圆括号，像这样foo()。

***
#### 那么通过( )来直接调用匿名函数可以吗？
```
// 直接在匿名函数后边加()
function () {console.log("f1");}(); // SyntaxError: Unexpected token (
```
出错了：SyntaxError: Unexpected token (。

因为，当圆括号为了调用函数出现在函数后面时，无论在全局环境或者局部环境里遇到了这样的function关键字，默认的，它会将它当作是一个函数声明，而不是函数表达式，如果你不明确的告诉圆括号它是一个表达式，它会将其当作没有名字的函数声明并且抛出一个错误，因为函数声明需要一个名字。

***
#### 那么为一个函数指定一个名字并在它后面放一对圆括号，会怎么样呢？
同样的也会抛出错误。

因为，当圆括号放在一个函数表达式后面指明了这是一个被调用的函数，而圆括号放在一个声明后面便意味着完全的和前面的函数声明分开了，此时圆括号只是一个简单的代表一个括号(用来控制运算优先的括号)。
```
//然而函数声明语法上是无效的，它仍然是一个声明，紧跟着的圆括号是无效的，因为圆括号里需要包含表达式

function foo(){ /* code */ }();//SyntaxError: Unexpected token

//现在，你把一个表达式放在圆括号里，没有抛出错误...,但是函数也并没有执行，因为：

function foo(){/* code */}(1)

//它等同于如下，一个函数声明跟着一个完全没有关系的表达式:

function foo(){/* code */}
(1);
```

***
#### 所以说，什么是立即执行函数表达式呢？
>IIFE (立即调用函数表达式) 是一个 JavaScript 函数 ，它会在定义时立即执行。

因为在Javascript里，圆括号不能包含声明。所以，当圆括号为了包裹函数碰上了 function关键词，它便知道将它作为一个函数表达式去解析而不是函数声明。


这两种模式都可以被用来立即调用一个函数表达式：
```
(function(){
	console.log("test");
})();
```
或者
```
(function(){
	console.log("test");
}());
```

- 括号和JS的一些操作符（如 = && || ,等）可以在函数表达式和函数声明上**消除歧义**

    如下代码中，解析器已经知道一个是表达式了，于是也会把另一个默认为表达式

    但是两者交换则会报错。
```
var i = function(){ return 10; }();

true && function(){ /* code */ }();

0, function(){ /* code */ }();
```

- 如果不在意返回值，或者不怕难以阅读

    甚至可以在function前面加一元操作符号
```
!function () { /* code */ } ();
~function () { /* code */ } ();
-function () { /* code */ } ();
+function () { /* code */ } ();
```

- 还有一个情况，使用new关键字,也可以用
```
new function () { /* code */ }
new function () { /* code */ } () // 如果需要传递参数，只需要加上括弧()
```

***
#### 用闭包保存状态
和普通function执行的时候传参数一样，自执行的函数表达式也可以这么传参，因为闭包直接可以引用传入的这些参数，利用这些被lock住的传入参数，自执行函数表达式可以有效地保存状态。
```
// 这个代码变量i从来就没被locked住
// 相反，当循环执行以后，我们在点击的时候i才获得数值
// 因为这个时候i才真正获得值
// 所以说无论点击那个连接，最终显示的都是I am link #10（如果有10个a元素的话）


var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {

    elems[i].addEventListener('click', function (e) {
        e.preventDefault();
        alert('I am link #' + i);
    }, false);

}

// 这个是可以用的，因为他在自执行函数表达式闭包内部
// i的值作为locked的索引存在，在循环执行结束以后，尽管最后i的值变成了a元素总数（例如10）
// 但闭包内部的lockedInIndex值是没有改变，因为他已经执行完毕了
// 所以当点击连接的时候，结果是正确的

var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {

    (function (lockedInIndex) {

        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, false);

    })(i);

}

// 你也可以像下面这样应用，在处理函数那里使用自执行函数表达式
// 而不是在addEventListener外部
// 但是相对来说，上面的代码更具可读性

var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {

    elems[i].addEventListener('click', (function (lockedInIndex) {
        return function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        };
    })(i), false);

}
```

 