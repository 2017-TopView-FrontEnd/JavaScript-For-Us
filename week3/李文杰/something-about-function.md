---
title: 函数云云
date: 2017.7.31
---

## Hincts
- 闭包
- 立即执行函数
- 变量提升
- 写不写分号呢

## Closure（闭包）
### 定义
>**闭包** 是指有权访问另一个函数作用域中的变量的函数。创建闭包的常用方式，就是在一个函数内部创建另一个函数。 - 高设

>**A closure** is the combination of a function and the lexical environment within which that function was declared. - MDN

光看定义有些抽象，我们看下面的例子：

``` javascript
function makeSayHaha () (
  var str = 'haha'
  return function () {
    cosole.log(str)
  }
)

var sayHaha = makeSayHaha()

sayHaha()
```
这是一个经典的闭包例子，我们通过 `sayHaha()` 访问到了在 `initSayHaha()` 里的变量 `str`

再看看从阮一峰博客摘抄的这两个例子：
``` javascript
var name = "The Window"
var object = {
  name : "My Object",
  getNameFunc : function (){
    return function (){
      return this.name
    }
  }
}
console.log(object.getNameFunc()())
```
``` javascript
var name = "The Window"
var object = {
  name : "My Object",
  getNameFunc : function (){
    var self = this
    return function (){
      return self.name
    }
  }
}
console.log(object.getNameFunc()())
```

能理解这两个例子的话，大概就能理解闭包了

再看看我们在实际项目中用到的闭包：

``` javascript
new Vue(
  // ...
  submitForm (formName) {
    this.$refs[formName].validate((valid) => {
      let self = this
      if (valid) {
        let data = this.$data.loginForm
        this.login({
          data: data,
          callback (isLogin, msg) {
            if (isLogin) {
              self.getRoleAuth()
              self.$router.replace('/home')
              self.$notify({
                type: 'success',
                message: '登陆成功'
              })
            } else {
              self.$notify.error({
                message: msg
              })
            }
          }
        })
      } else {
        this.$notify({
          message: '全都要输入！',
          type: 'warning'
        })
      }
    })
  }
)
```
为什么有些地方我用了 `this`，而有些地方却是 `self` 呢？

## Immediately Invoked Function Expression（立即执行函数）
### 知识储备1：函数声明（function declaration）和函数表达式（function expression）
``` javascript
function sayHaha () {
  // sayHaha
}

var sayHaha = function () {
  // sayHaha
}
```

### 知识储备2：js 的变量提升（hoisting）
### 知识储备3：在 es6 以前没有块级作用域，只有函数作用域
``` javascript
function sayHaha() {

    console.log(haha)

    if (!haha) {
        var haha = 5
    }

    console.log(haha)
}

sayHaha()
```
``` javascript
var haha = 3

function sayHaha() {

    var haha = haha || 5

    console.log(haha)
}

sayHaha()
```

### in short，立即执行函数 = 函数表达式 + 圆括号

下面是例子：

``` javascript
MVC.model = function() {
  var publicVar = 'haha'
  var primaryVar = 'heihei'
  function publicFunction () {
    // ...
  }
  function primaryFucntion () {
    // ...
  }
  return {
    pubVar: publicVar,
    pubFunc: publicFunction
  }
}()
```
创建块级作用域或私有变量、私有方法

### n种写法
``` javascript
(function () {
  console.log('haha')
})();

(function () {
  console.log('haha')
}());

+function () {
  console.log('haha')
}();

1, function () {
  console.log('haha')
}();

!function () {
  console.log('haha')
}();
```

## Trap of IIFE （立即执行函数的坑）
### 和分号的恩怨
``` javascript
var haha = 7
(function () {
  console.log(haha)
})()
```

``` javascript
var sayHaha = function (bb) {
  console.log(bb)
}
(function () {
  console.log('haha')
})()
```
``` javascript
var sayHaha = function (bb) {
  console.log(bb)
  return bb
}
(function () {
  console.log('haha')
})()
```

### 不会自动补分号的五种操作符
> `+` `-` `[` `(` `/`

## Reference
>- [this - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
>- [学习Javascript闭包（Closure） - 阮一峰](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
>- [JavaScript系列文章：变量提升和函数提升](http://www.cnblogs.com/liuhe688/p/5891273.html)
>- [貘吃馍香关于js圆括号和立即执行函数的回答 - 知乎](https://www.zhihu.com/question/40902815/answer/88787368?utm_medium=social&utm_source=wechat_session)