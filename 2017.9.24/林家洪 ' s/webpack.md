- 这是个模块转换器 以及 打包工具
- 不懂的属性记得去看官方文档
- 现在用的是webpack 3.6
- 在有 webpack.config.js 文件的目录下使用一下命令行：

1. webpack——直接启动 webpack，默认配置文件为 webpack.config.js
2. webpack -w——监测启动 webpack，实时打包更新文件
3. webpack -p——对打包后的文件进行压缩
## 开始使用
1. 创建package.json
```
npm init
```

2. 安装项目依赖
```
npm install webpack --save-dev
```
3. 创建webpack.config.js配置文件。自己进行配置
```
var path = require('path');

module.exports = {
  // 第一个启动文件。程序入口
  entry: './src/main.js',
  // 出口位置
  output: {
    // __diranme = diretory + name 当前目录名
    // path.resolve 将相对路径转为绝对路径
    // 也就是说，拼接 __dirname + /dist
    // Webpack 中涉及路径配置最好使用绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 出口文件名字
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        // test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['es2015']
        //   }
        // }
      },
      {
        test: /\.vue$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'vue-loader',
        }
      }
    ],
  },
  // 用来追踪文件错误位置
  devtool: 'inline-source-map',
  // webpack-dev-server 相关配置
  devServer: {
    port: 9999,
    contentBase: './dist',
    inline: true,
    hot: true,
    openPage: 'index.html'
  },
  // 外号
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}
```
4. 要使用ES6。需要安装babel相关组件
```
# 安装加载器 babel-loader 和 Babel 的 API 代码 babel-core
# 安装 ES2015（ES6）的代码，用于转码
npm install --save-dev babel-loader babel-core babel-preset-env
```
- webpack配置。这个是让js可以用es6。不过不知道有木有必要。因为好像没有它地球也会转。
```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
```
- 配置babel插件。这个是让Vue组件可以使用3
```
1 安装babel插件: 
npm install --save-dev babel-plugin-transform-object-rest-spread
2 .babel的配置文件修改为:
// .babelrc
{
  "presets": [
    ["env", { "modules": false }]
  ],
  "plugins": ["transform-object-rest-spread"]
}
```
- Each yearly preset only compiles what was ratified in that year. babel-preset-env replaces es2015, es2016, es2017, latest
```
# 用于转换一些 ES6 的新 API，如 Generator，Promise 等
npm install --save babel-polyfill
```
- 如果有.babelrc配置的话，里面貌似要有东东，否则会报错
```
Module build failed: SyntaxError
```
- https://doc.webpack-china.org/loaders/babel-loader
5. 使用vuex vue
```
npm install --save-dev vue vuex
```
6. 要使用vue组件。需要相关的loader
- vue-loader 用来处理 .vue 后缀的内容
- vue-html-loader vue-template-compiler
- css-loader
- webpack配置
```
module: {
  rules: [
    {
      test: /\.vue$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'vue-loader'
      }
    }
  ]
}
```
- http://www.xheldon.com/vue-simple-use.html
- 可以在以下页面查看 JavaScript 的所需的转换代码模块进行按需安装 http://babeljs.io/docs/plugins/preset-es2015/ 
7. 使用webpack-dev-server
```
1. npm install --save-dev webpack-dev-server
```
```
2. cli
可以在命令行上附带参数
// package.json 
"scripts": {
    "dev": "webpack-dev-server --inline --hot --content-base"
}
运行时
npm run dev

node API
也可以在webpack配置那里弄
// webpack.config.js
devServer: {
  port: 1234,
  contentBase: '/',
  openPage: 'index.html',
  hot: true,
  inline: true
}
```
- 相关配置 https://doc.webpack-china.org/configuration/dev-server
- contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要





## 参考资料
- https://rlilyyy.github.io/2016/05/04/Webpack-Babel-%E4%BD%BF%E7%94%A8-ES6-%E6%96%B0%E7%89%B9%E6%80%A7/
- https://doc.webpack-china.org/configuration 
- 不过现在用的是webpack 3.6.0的 那些教程都是以前的版本，可能有些符合
