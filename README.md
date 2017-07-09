# TopView 大前端暑假学习计划
欢迎加入 TopView 大前端 :kissing:

## First of All

 - 遇到问题若解决不了（先google），请在 GitHub 上提交 [issue][1] :metal:
 - 每天结束之前都要在这个git仓库里面提[issue][1]，有例子可看，嗯！是**每天**。（仓库里面有格式例子哦）:clap::clap:
 - 每周之后，请把每周学习到的东西整理成Mark Down，把自己写的demo源码上传到本 repo 对应的文件夹. 例子请看 week1 文件夹。:notes:
 - 注意培养正确的代码规范，具体代码规范参考 [`this`](https://github.com/2017-TopView-FrontEnd/JavaScript-Code-Standard)
 - 该学习路线将会花费 **4周** 的时间! 时间自行安排 :smiling_imp:
 - [太长不看](#heavy_check_mark鸡汤)

## Resources
整个学习路线会用到下面的资源:

 - [JavaScript 高级程序设计(第3版)][2]
 - [Free Code Camp][3]
 - [GitHub][4]
 - [Code School][5]
 - [Flexbox Froggy][17]
 - [GRID GARDEN][18]
 - [MDN文档哟](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
 - [Git - 廖雪峰](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
 - [很重要的代码规范](https://github.com/2017-TopView-FrontEnd/JavaScript-Code-Standard) :laughing::laughing:


## Week 1 - Introduction, Data Types, Expressions and Operations && Git
第一周比较轻松~ 涉及的内容有JavaScript的介绍, 数据类型, 表达式以及运算，以及简单了解下的CSS的flex布局，还有Git。

| Source                 | Tasks |
| -----                  | ----  |
| Free Code Camp         | **Getting Started**, **HTML5 & CSS**, **Responsive Design with Bootstrap** 部分 |
| FlexboxFroggy          | 先看[这个](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)然后尝试完成flexbox那个网站的题    |
| GRID GARDEN | grid 种菜小游戏 |
| JavaScript高级程序设计  | 前言, 第1章和第2章 |
| Free Code Camp         | `Basic JavaScript` 部分 |
| JavaScript高级程序设计  | 第3章, 第4章(可以跳过位操作符部分内容) |
| 自己 google            | 学会调试 JavaScript 。建议使用 Chrome 的 DevTools (开发者工具) |
| Free Code Camp         | Basic Front End Development Projects 部分（**选做**）
| Git                    | 廖雪峰的Git教程：Git简介，创建版本库


## Week 1~2 - Objects, Arrays, Functions
涉及的内容有对象，数组，函数，DOM 以及 jQuery 当然还有Git 。

| Source                | Tasks             |
| ----                  | ----              |
| JavaScript 高级程序设计 | 第6章              |
| Free Code Camp        | *Object Oriented and Functional Programming* 部分 |
| JavaScript 高级程序设计 | 第5章和第7章       |
| Git                    | 廖雪峰的Git教程：时光机穿梭，远程仓库

看[这篇](https://juejin.im/post/5905ccb8ac502e0063ebe0e2)了解一下JS的一些执行机制

## Week 2~3 - DOM, jQuery, and the First Project && Git

| Source                | Tasks |
| -----                 | ----- |
| JavaScript 高级程序设计 | 第8, 9, 10, 11, 13和14章 |
| CodeSchool            | [Try jQuery][7] 课程，视频观看以及翻译在[这里][8]
| Free Code Camp        | *jQuery* 部分
| null                  | *你的第一个小项目 - Todo*

### Todo
可参考例子：[todoMVC](http://todomvc.com/examples/vanillajs/) 。

- 添加 / 删除 todo
- 完成 / 取消完成 todo
- 显示所有/ 完成 / 未完成的 todo
- 写2个版本。原生 JavaScript && jQuery
- 用 Git 以及 GitHub 来管理你们的 todo 项目
- 学会 Git 的分支管理，请利用 GitHub 的 Projects Pages 把你的 Todo 项目发布到网上


## Week 3 - Ajax, Event, Regular Expressions, jQuery 动画 以及 Git~
内容有 Ajax, 正则表达式，window 对象，事件，以及 jQuery 嗯，我Git又回来了:speech_balloon:

| Source | Tasks |
| ----   | ----- |
| JavaScript 高级程序设计 | 第20章和23章。
| Free Code Camp        | *JSON APIs and Ajax* 部分
| null                  | 改进你的 Todo 项目
| Git                   |  廖雪峰的Git教程：分支管理，标签管理

### 改进 Todo
- 提供修改 todo 功能
- 清除所有已经完成的 todo
- 使用 jQuery 的添加动画。比如，添加 todo 时的淡入 && 删除时的淡出
- 添加用户验证: 登录注销，利用 Local Storage (看看与用Session Storage会有什么不同)
- 使用 [JSON Server](https://github.com/typicode/json-server) 来模拟后台


## Week 4 - Module, MVC, Class, Inheritance, Router
涉及了模块化，类，继承，ES6(ES2015), 路由, 以及多个小项目。

| Source                  | Tasks |
| ----                    | ----  |
| JavaScript 高级程序设计 | 第6，16，22，24章。这也许是最有技术性的一次阅读了，如果没看懂先跳过:no_good:，日后再看可好  |
| Free Code Camp          | **Basic Algorithm Scripting** 部分（复习 JavaScript）|
| [ECMAScript 6入门][10]  | 学习 ES2015 |
| null                    | 再次优化你的 Todo 项目。添加新功能，或者重构代码 |
| Free Code Camp          | **Intermediate Front End Development Projects** 前3个 |

至于模块化：可以**了解**一下JS**史前**模块化的实现 [AMD(requireJS)](http://requirejs.org/) 和 [CMD(seaJS)](https://github.com/seajs/seajs)， **学习**现在JS模块化的实现，ES6的[Module](http://es6.ruanyifeng.com/#docs/module)实现的模块化

关于路由：去google了解一下前端路由的好处和前端路由解决了什么问题。这个东西以后大家都会继续接触，不必着急一时全弄懂。


## Front End Go!
由于现在前端的技术还不是很成熟，因此发展会日新月异:feet::feet:

所以啊，我们要时刻保持对知识的饥饿感！！！:yum::yum:

| Recommend | Type         | Description |
| ----      | ----         | ----        |
| 5         | JS 框架      | React, Angular, Vue 等|
| 5         | 打包工具     | Webpack，Gulp等        |
| 5         | 代码规范     | eslint等               |
| 5         | JavaScript   | ES2015  (如何使用？[`babel`](http://babeljs.io/))      |
| 4         | CSS 预处理器 | Sass, Less等  |
| 3         | 服务器语言   | Node.js 等|
| 4         | 计算机网络   | HTTP 相关知识 |
| 5         | 社区         | [GitHub Trending][14], [Reddit][15], [Medium][16], 订阅 JavaScript Weekly, 微博 & Twitter 等|

---

## :heavy_check_mark:鸡汤

 - **看书看不懂的部分就跳过!!** 总之要看快速看完一遍！:sunglasses::sunglasses:
 - 遇到不懂的地方请 google，或者问小伙伴，或者提 issue，或者问师兄 ... 师姐 :new_moon_with_face::new_moon_with_face:
 - 加油哦:rocket: 这将是一个非常充实的假期 :punch::punch:


[1]: https://github.com/2017-TopView-FrontEnd/JavaScript-For-Us/issues
[2]: https://book.douban.com/subject/10546125/
[3]: https://www.freecodecamp.com/
[4]: https://github.com/
[5]: http://try.jquery.com/
[6]: http://javascriptissexy.com/javascript-objects-in-detail/
[7]: http://try.jquery.com/
[8]: http://blog.jobbole.com/37699/
[9]: http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
[10]: http://es6.ruanyifeng.com/
[11]: https://nodejs.org/en/
[12]: http://backbonejs.org/
[13]: https://facebook.github.io/react/
[14]: https://github.com/trending
[15]: https://www.reddit.com/r/javascript
[16]: https://medium.com/tag/javascript
[17]: http://flexboxfroggy.com
[18]: http://cssgridgarden.com