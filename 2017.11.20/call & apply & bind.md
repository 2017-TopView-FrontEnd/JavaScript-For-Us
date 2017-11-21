- Function.prototype.call
- Function.prototype.apply
- Function.prototype.bind
## call()
语法:
```
function.call(thisArg[, arg1[, arg2[, ...]]])
```
thisArg：function函数运行时指定的this值，可能的值为：
- 不传，或者传null，undefined， this指向window对象
- 传递一个对象，函数中的this指向这个对象
- 传递另一个函数的函数名fun2，this指向函数fun2的引用
- 值为原始值(数字，字符串，布尔值),this会指向该原始值的自动包装对象，如 String、Number、Boolean
```
var o = { a: 10 }
function aaa() {}

function test() {
	console.log(this)
}

test.call(o)
test.call(aaa)
test.call("string")
test.call(123)
```
第2到n个参数（可选）：传递给function函数的参数

- 举个栗子：
- 将类数组对象转化为数组
```
function list() {
	console.log(arguments)
	// arguments对象是一个类数组的对象，用来储存传入函数的参数
	// slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对
	// 象。原始数组不会被修改
	// slice(begin, end) 从下标0开始，包括begin，不包括end
	return Array.prototype.slice.call(arguments, 2, 4)
	// 相当于[].slice(2, 3)
}
console.log(list(1,2,3,4))

// 转为 真实数组
// 利用 Array.from()
function a() {
  console.log(Array.from(arguments))
}
a(1,2)
// es6  ...
function b() {
  console.log([...arguments])
}

b(1,2,3)
```
## apply()
语法：
```
function.apply(thisArg[, argsArray])
```
thisArg：它的可能值和call一样

第二个参数是个数组（可选）

与call()也就是传参的方式不同

值得你注意的是，虽然 apply 接收的是一个参数数组，但在传递给调用函数时，却是以参数列表的形式传递

- 举个栗子：
```
function t(x,y,z) {
	console.log(x,y,z)
}
t.apply(undefined, [1,2])
```
- 第二个栗子
```
// slice(begin, end)
// call()
function list() {
	return Array.prototype.slice.call(arguments, 2, 4)
}
console.log(list(1,2,3,4))

// apply() 
function list() {
    return Array.prototype.slice.apply(arguments, [2, 4])
}
console.log(list(1,2,3,4))
```
### 应用
- 把类数组转为数组（前面说了）
- 数组拼接
```
var arr1 = [1,2,3,4]
var arr2 = [5,6,7,8,9,10]
Array.prototype.push.apply(arr1, arr2)
console.log(arr1)  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 利用concat()。返回一个新数组
console.log(arr1.concat(arr2))  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
- 检验是否数组
```
console.log(Object.prototype.toString.call(arr) === "[object Array]")
```
- 继承
```
function Animail(name, weight) {
  this.name = name
  this.weight = weight
}

function Cat(name, weight) {
  Animail.call(this, name, weight)

  this.say = function() {
    console.log("I'm a " + this.name)
  }
}

var cat = new Cat('cat', 50)
cat.say()   //  I'm a cat
```
- 函数柯里化

定义：用于创建已经设置了好了一个或多个参数的函数
```
// function curry(fn) {
// 	var args = Array.prototype.slice.call(arguments, 1)
// 	return function() {
// 		console.log(arguments)
// 		console.log(args)
// 		console.log(fn)
// 		var innerArgs = Array.prototype.slice.call(arguments)

// 		var finalArgs = args.concat(innerArgs)
// 		return fn.apply(null, finalArgs)
// 	}
// }

// function add(num1, num2) {
// 	return num1 + num2
// }

// var curriedAdd = curry(add, 5)
// console.log(curriedAdd(3))
```
## bind
语法：
```
function.bind(thisArg[, arg1[, arg2[, ...]]])
```
bind()方法会创建一个新函数，称为绑定函数

不会执行对应的函数（call或apply会自动执行对应的函数），返回由指定的this值和初始化参数改造的原函数拷贝，也就是绑定函数的引用。

当调用这个绑定函数时，thisArg参数作为 this，第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

栗子：
```
function list() {
  // 将arguments转成数组
  return Array.prototype.slice.call(arguments);   
}

// 当调用listBindFunc的时候，相当于调用listBindFunc(37)
var listBindFunc = list.bind(null, 37)

// 此时相当于listBindFunc(37, 1, 2, 3)
console.log(listBindFunc(1, 2, 3))
```
- 函数绑定 => 保留代码执行环境
```
var handler = {
	message: "Event handled",
	handledClick(event) {
		console.log(this)
		console.log(this.message)
	}
}

// 当使用 addEventListener()为一个元素注册事件的时候，句柄里的 this 值是该元素的引用。
// this绑定到直接调用它的对象
var btn = document.createElement("button")
btn.addEventListener("click", handler.handledClick)

// btn.addEventListener("click", function() {
// 	console.log(this)
// 	handler.handledClick()
// })

// btn.addEventListener("click", handler.handledClick.bind(handler))
```

- 连续bind
```
var test = function() {
  console.log(this.x)
}

var o1 = {
  x: 1
}
var o2 = {
  x: 2
}
var o3 = {
  x: 3
}

var t = test.bind(o1).bind(o2).bind(o3)
t()

// function bind(fn, context) {
//   return function() {
//     return fn.apply(context, arguments)
//   }
// }
// func()

// function func1(test, o1) {
// 	return function() {
//   return test.apply(context)
// }
// func1(test, o1)
// 返回 test.apply(o1)

// function func2(func1, o2) {
// 	return function() {
        return func1.apply(o2)
    }
}
// 
// 	// 此时只是改变了func1的this的指向
// 	// 但是对于test()而言，它的this依然是指向o1的
// }
// func2(func1, o2)
// return func1.apply(o2)
```
原因：
在js中，多次bind()是无效的哈哈哈哈哈哈哈隔

更深层的原因：bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的


### 区别
相同：改变函数体内this的指向
不同：
- call、apply的区别：接受参数的方式不一样。
- bind：不立即执行。而apply、call 立即执行。
### 奇葩的例子
- Function.prototype.apply.call
```
function test() {
  console.log('haha')
}

Function.prototype.apply.call(test)
// FunctionApply.call(test)
// test.FunctionApply()
// test.apply()
```
- Function.prototype.call.apply
```
var test = function(tips, message) {
  Function.prototype.call.apply(console.log, [console, arguments])

  // (console.log).call(console, arguments)
  // console.log(arguments)
}

test("测试", "This is a test")
```
- Function.prototype.call.call
- Function.prototype.apply.apply
- Function.prototype.apply.bind
```
function spread(fn) {
  return Function.prototype.apply.bind(fn, null)
  // return Function.prototype.call.bind(fn, null)
  //  fn.apply(null, [2,3])
}

function t(x, y) {
  console.log(x, y)
}

spread(t)([2, 3])
```
### 参考
- https://aotu.io/notes/2016/09/02/Different-Binding/index.html
- http://web.jobbole.com/83642/
- http://www.cnblogs.com/onepixel/p/5143863.html
