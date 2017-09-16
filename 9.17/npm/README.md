# NPM

---

今天的分享大多数是概念性的东西，一点都不深，随便听一听理解一下概念吧。

---

## JS的模块化

我们用JAVA的时候，可以看到我们所使用的每一个方法，甚至是自己写好的类，都需要`import ...`这样把依赖引入到我们的Class文件中才可以使用，但是我们反观JS，我们最简单的做法是，在HTML文件里面引入`script`标签，通过`script`标签引入JS，然后同一份HTML下的所有JS共享所有全局变量。

模块化之前：

- 全局变量
- 函数命名冲突
- 依赖关系复杂

其实这就是导致JS模块化引入的痛点 = = ，由于共享的全局变量和JS文件的相互依赖，在越来越大型的前端项目里面，只通过`script`标签来引入JS文件真的让多人协作开发变得十分困难。所以前端的大佬们觉得这样不行，也是大势所趋，于是前端也就开始出现了模块化。

---

JS的模块化到今天已经出现了很久，也有过很多种实现方式，NodeJS是通过`CommonJS`实现的模块化，而浏览器端也曾出现过`SeaJS`和`RequireJS`这些别人封装好的东西进行类似模块化的实现。但是随着ECMAScript的发展，ES6出现了自己原生实现的模块化，我们可以简单地通过`import`和`export`来实现模块化。

好吧其实并没有那么简单，因为模块化在浏览器内部还并没有实现。

其实我只是简单地去用过一下`RequireJS`，后来一直都没用过，自己写代码包括项目中使用的模块化都是通过`webpack`实现的。

---

## webpack的简单介绍

`webpack`可能你们都有听说过。可能大多数人对它的评价是一个打包工具，其实它是一个帮助你实现模块化的多功能打包工具。使用`webpack`之后，你可以在你的代码里直接使用`CommonJS`的标准做模块化。甚至我们可以在`webpack`里面使用它的`loaders`功能配合`babel`，然后就可以在代码里面使用ES6的语法了，因为`babel`可以把ES6的语法转化为ES5，对于不支持某些ES6标准的浏览器来说比较友好。

``` javascript
var fetch = require('./util/fetch')
var maxScore = '1'

fetch('/api/addScore', function (res) {
	//
})

module.exports = {
	maxScore: maxScore
}
```

``` javsscript
// 别的文件里
var maxScore = require('./test').maxScore

console.log(maxScore)
```

前面说到`webpack`是个多功能打包工具，那能做的肯定不止是模块化这么点东西，还有很多很多，以后慢慢接触到再学也不迟，这里只是说到了模块化的概念所以提及一下`webpack`，因为`webpack`要去学深的话，挺复杂的。

总结：`webpack`可以帮助我们实现模块化。

---

## 别人写好的模块

我们进行开发的时候，不止是会`require`自己写的JS文件，也会`require`到别人写好的模块，就好比我们需要写`Vue`，我们就要`require`或者`import`一个`Vue`

``` javascript
import Vue from 'vue'

new Vue({
	el: '#app',
	template: '<h1>halo word</h1>'
})
```

而这个`Vue`其实就是别人写好的模块，那我们引入进来肯定是把Vue下载下来的，那我们要怎么下载并引用别人写好的模块呢

就是用`npm`咯

---

## NPM是一个模块的管理工具

常用指令：

- npm init
- npm install(用这个命令装模块)
- npm uninstall
- npm info (模块名)
- npm config
- npm list
- npm run (script)
- npm publish(发布模块)

---

## JS的基础很重要

我认为其实现在来说我的JS基础也不好，所以下星期雨神给大家分享一波最近他补的JS基础。
