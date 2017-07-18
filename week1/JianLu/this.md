# 我了解（查到）的this_(:зゝ∠)_

想要知道函数在执行过程中是如何绑定this的，首先要知道函数的调用位置。
```
function baz() {  
    //当前调用栈：baz  
   //调用位置是全局作用域  
    console.log("baz");  
    bar();//bar的调用位置  
}  
function bar() {  
    //当前调用栈：baz -> bar  
   //调用位置是baz中  
    console.log("bar");  
    foo();//foo的调用位置  
}  
function foo() {  
    //当前调用栈：baz -> bar -> foo  
   //调用位置是bar中  
    console.log("foo");  
}  
baz();//baz的调用位置  
```
执行foo函数是的调用栈为baz -> bar -> foo 。

通过函数的互相调用找出调用栈，便可以找出函数的真正调用位置:
![imamge](http://images.cnitblog.com/blog2015/628067/201505/101951434546534.png)
上图右侧向上的箭头所滑过的就是foo函数执行的调用栈，栈中的第二个元素就是真正的调用位置。

### this的绑定符合的绑定规则：

#### 1.隐式绑定： 

看调用位置是否有上下文对象，即是否被某个对象拥有或包含（这里说的包含可不是用花括号包起来呦）。
```
var a = 3;  
function foo() {  
    console.log(this.a);  
}  
var obj = {  
    a: 2,  
    foo: foo  
};  
obj.foo(); 
```
foo函数的调用位置是obj的上下文来引用函数，也就是说他的落脚点是obj对象，那他的this自然也就指向他的上下文对象。

（ps：如果对象属性的引用是多层的，只有最后一层会影响调用位置）。

***
#### 2.显式绑定： 

   上面的隐式绑定是通过调用一个对象中绑定了函数的属性来把this隐式的绑定在这个对象上的。所以显示绑定就是使用一些方法强制将函数绑定在某个对象上，这些方法就是 call(...)、apply(...) 这两种方法的工作方式是类似的。
   
   这两个方法第一个参数是一个对象，而被绑定的函数的this就会绑定在这个对象上。
```
   function foo() {  
    console.log(this.a);  
}  
var obj = {  
    a: 2  
};  
foo.call(obj); 
```

***
#### 3.new 绑定
```
function Foo(a) {  
   this.a = a;  
}  
var bar = new Foo(2);  
console.log(bar.a); 
```
使用 new 来调用函数，即发生构造函数调用时，会执行下面操作

- 创建一个全新的对象
- 这个对象会被执行[__proto__]的链接(bar.__proto__=Foo.prototype)
- 这个新对象会绑定到函数调用的this上
- 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

***
#### 4.默认绑定   

默认绑定就是不符合上面任何一种规则是的默认规则
```
function foo() {  
    console.log(this.a);  
}  
var a = 2;  
foo();  
```
 上面这段代码foo函数不带任何修饰的直接使用，不符合1-3中的任何一种绑定规则，所以只能使用默认绑定规则，而默认绑定规则就是在非严格模式下被绑定在全局对象上（严格模式下与foo函数的调用位置无关为undefined）。

#### 隐式绑定丢失上下文
思考：
//第一种写法
```
var a = 3;  
function foo() {  
    console.log(this.a);  
}  
var obj = {  
    a: 2,  
    foo: foo  
};  
var bar = obj.foo;  
bar();  
```
//第二种写法
```
var a = 3;  
function foo() {  
    console.log(this.a);  
}  
var obj = {  
    a: 2,  
    foo: foo  
};  
obj.foo(); 
```

由于在 javascript 中，函数是对象，对象之间是引用传递，而不是值传递。因此， bar = obj.foo = say ，也就是bar = foo ，obj.foo 只是起了一个桥梁的作用，bar 最终引用的是 foo 函数的地址，而与 obj 这个对象无关了。这就是所谓的”丢失上下文“。最终执行 bar 函数，只不过简单的执行了foo函数，输出3。

#### 四种绑定的优先级
默认绑定的优先级是最低的。这是因为只有在无法应用其他this绑定规则的情况下，才会调用默认绑定。那隐式绑定和显式绑定呢？
```
function speak() {
	console.log(this.name)
}
var obj1 = {
	name: 'obj1',
	speak: speak
}
var obj2 = {
	name: 'obj2'
}
obj1.speak() // obj1 (1)
obj1.speak.call(obj2) // obj2 (2)
```
在上面代码中，执行了obj1.speak(),speak函数内部的this指向了obj1，因此(1)处代码输出的当然就是obj1，但是当显式绑定了speak函数内的this到obj2上，输出结果就变成了obj2，所有从这个结果可以看出显式绑定的优先级是要高于隐式绑定的。事实上我们可以这么理解obj1.speak.call(obj2)这行代码，obj1.speak只是间接获得了speak函数的引用，这就有点像前面所说的隐式绑定丢失了上下文。好，既然显式绑定的优先级要高于隐式绑定，那么接下来再来比较一下new 绑定和显式绑定。
```
function foo(something) {
	this.a = something
}
var obj1 = {}
var bar = foo.bind(obj1)  // 返回一个新函数bar，这个新函数内的this指向了obj1  (1)
bar(2) // this绑定在了Obj1上，所以obj1.a === 2
console.log(obj1.a)
var baz = new bar(3)  // 调用new 操作符后，bar函数的this指向了返回的新实例baz  (2)
console.log(obj1.a)
console.log(baz.a)
```
在(1)处，bar函数内部的this原本指向的是obj1，但是在(2)处，由于经过了new操作符调用，bar函数内部的this却重新指向了返回的实例，这就可以说明new 绑定的优先级是要高于显式绑定的。  
至此，四种绑定规则的优先级排序就已经得出了,分别是:

>new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定
#### 箭头函数的绑定
箭头函数的this是根据外层的（函数或者全局）作用域来决定的。函数体内的this对象指的是定义时所在的对象，而不是之前介绍的调用时绑定的对象。
```
// 定义一个构造函数
function Person(name,age) {
	this.name = name
	this.age = age 
	this.speak = function (){
		console.log(this.name)
		// 普通函数（非箭头函数),this绑定在调用时的作用域
	}
	this.bornYear = () => {
		// 本文写于2016年，因此new Date().getFullYear()得到的是2016
		// 箭头函数，this绑定在实例内部
		console.log(new Date().getFullYear() - this.age)
		}
	}
}
var zxt = new Person("zxt",22)
zxt.speak() // "zxt"
zxt.bornYear() // 1994
// 到这里应该大家应该都没什么问题
var xiaoMing = {
	name: "xiaoming",
	age: 18  // 小明永远18岁
}
zxt.speak.call(xiaoMing)
// "xiaoming" this绑定的是xiaoMing这个对象
zxt.bornYear.call(xiaoMing)
// 1994 而不是 1998,这是因为this永远绑定的是zxt这个实例
```
箭头函数的 this 强制性的绑定在了箭头函数定义时所在的作用域，而且无法通过显示绑定，如apply,call方法来修改。