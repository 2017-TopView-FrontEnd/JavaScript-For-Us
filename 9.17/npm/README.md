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
function plus (x, y) {
	return x + y
}

module.exports = plus
```

``` javsscript
// 别的文件里
var plus = require('./util/plus.js')

console.log(plus(3, 4))

console.log(process.env.npm_package_config_port)
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

别人写好的模块都会在npm上面发布，我们可以通过npm下载下来并且使用。

因为npm毕竟是个模块管理工具，所有别人写模块的时候都会有npm的参与。

常用指令：

- npm init
- npm install(用这个命令装模块)
- npm uninstall
- npm info (模块名)
- npm config
- npm list
- npm run (script)
- npm publish(发布模块)
- npm link(开发调试模块使用)

参考：[npm](http://javascript.ruanyifeng.com/nodejs/npm.html)

---

## npm init

运行这个会产出一个`package.json`文件，最骚的是可以加 `-f`代表force或者`-y`代表yes，生成所有选项为默认值的`package.json`

### package.json

这个`json`文件很关键，其实这个`json`文件是所有模块，乃至到时候你自己的项目的最重要的文件之一，它里面有很多信息，包括：这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。

简单说下它的里面的几个字段

- name：这个模块名字，或者项目名字
- dependencies：项目运行所依赖的模块
- devDependencies：指定项目开发所需要的模块(这两个模块下面会提到)
- main：这个字段主要是写一个模块给别人使用的时候用的，也就是别人直接`require`你这个模块名字，你会让他引入你的哪个文件。也就是指定了加载的入口文件。
- config：用于添加命令行的环境变量。可在Node里面通过`process.env.npm_package_config_KEY`访问。
- script：用于预定义脚本命令，下面讲`npm run (script)`时再讲

总的来说，无论对于你要自己写模块发布到NPM上面也好，自己写项目用到NPM上面的模块，这个`package.json`都十分重要

---

## npm install

这个命令用于安装依赖模块，比如

``` javascript
npm install webpack --save-dev
// 或者
npm install express --save
```

加`--save`参数表示安装该模块并将该模块写入`dependencies`属性，这个依赖为运行时的依赖。加`--save-dev`就是。。。？

不过如果是你从`github`上面把项目`clone`下来之类的情况的话，`package.json`是完好的。所以这个时候可以直接运行`npm install`，npm会自动根据`package.json`里面的`dependencies`字段和`devDependencies`字段进行依赖的安装

然后还记得之前我们有用过一条命令也是install，只是参数不一样

``` javascript
npm install live-server -g
```

`-g`和前面的`--save``--save-dev`有什么不同呢。

`-g`的意思是`global`，也就是全局安装到本地，全局安装该依赖之后，这个模块会被安装到系统目录中，各个项目都可以调用，但是这样做并不会把该依赖写入`package.json`里面，所以当我们在另一个环境里面时，直接运行`npm install`也不会安装这个东西，万一这个依赖是项目所必需的，那代码就完全跑不起来了，所以全局安装比较合适安装工具类的模块，比如`eslint`。

`--save``--save-dev`会把依赖安装到项目的根目录下的`node_modules/`子目录下，并且记录在`package.json`里面，也只有本项目里面可以访问到。不过只要带着`package.json`，在别的环境里也只需要`npm install`一下可以装好依赖了。

而且装在项目根目录里面也可以配合下面那个命令使用

---

## npm run (script)

这个功能比较好，它可以运行在`package.json`里面定义好在`script`字段里面的脚本。比如我的`package.json`里面有这样一段

``` javascript
"scripts": {
	"start": "node index",
	"dev": "webpack"
},
```

于是我们运行`npm run start`就等于在命令行里面输入`node index`并且运行这条命令，这样做其实有两个好处：

- 一是把我们复杂的命令封装起来，往往我们只需要一个简单的`start`就能完成很多操作

- 二是**很重要**的一点，就是运行这个脚本的时候，`npm run`命令会自动在环境变量$PATH添加node_modules/.bin目录，所以scripts字段里面调用命令时不用加上路径，这就避免了全局安装NPM模块。也就是说：`npm run`执行指定的命令，并临时将node_modules/.bin加入PATH变量，这意味着本地模块可以直接运行。

**上面说到了一点，封装复杂的操作**

`npm run`的强大之处不止于此，他可以通过加入`&`或者`&&`实现命令的并行或串行执行

``` javascript
"scripts": {
	"start": "webpack && node index", // 执行完webpack命令再执行node
	"dev": "webpack & node index"	// 同时执行两个命令
},
```

`npm run`提供了钩子pre- 和 post- 脚本，当我们运行`npm run start`的时候，npm会先查看有没有定义`prestart`和`poststart`两个钩子，如果有的话，就会先执行`npm run prelint`，然后执行`npm run lint`，最后执行`npm run postlint`。

`npm run`甚至可以传入参数。我们可以通过加`--`后面接入参数，参数将自动补到命令后面

``` javascript
"script": {
	"start": "webpack "
}

npm run start -- a.js

		|
		▼

> webpack a.js
```



---

## JS的基础很重要

今天说了一堆有的没的其实都是一些概念性的东西，其实都是一堆废话。我们的老本行是JS，所以打好基础再去学后续的东西比如框架之类的，才会事半功倍。毕竟现在在学的框架看起来就是差不多是在像学一门新的语言一样，这样学起来有点僵。

我认为其实现在来说我的JS基础也不好，所以下星期雨神给大家分享一波最近他补的JS基础。纯干货无鸡汤的。



—— 957275..toString(36)
