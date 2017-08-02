# js设计模式之MVC
---------
# 当前问题
- 如果组件内容过多 => <em>层次混乱</em>
- 如何追踪内部的数据？
- 是在哪里处理数据？
- 是在哪里改变视图？
- 。。。

----------
# MVC
##   1、模型（model）
##   2、视图（view）
##   3、控制器（controller）
- 是一种把业务逻辑，数据，视图分离的架构代码方式。
- 组件化开发就是其最经常的实现。

----------
```
// 雏形：
// MVC对象
var MVC = {}
// 数据模型层
MVC.Model = function () {}()
// 视图层
MVC.View = function () {}()
// 控制器层
MVC.Controller = function () {}()

```
----------
## M——model:  

> 数据模型， 也可以说是一个用来专门 **管理数据** 的对象


---------
### 作用是什么？ 
#### 1、加载数据（如从服务器端加载内容、组件配置数据等）、 保存数据
#### 2、为视图层的渲染提供内容
---------
```

MVC.model = function() {
  // 保存一个todo列表
  var todoList = []
  return {
    /**
     * 初始化数据
     **/
    initData: function() { 
        var localData = localStorage.getItem('todoData');
        if (localData) {
          todoList = JSON.parse(localData);
        }
    },
    /**
     * 获取数据接口
     **/
    getTodo: function () {
        return todoList
    },
    /**
     * 添加一个todo
     **/
    addTodo: function(data) {
        todoList.push(data)
    },
    /**
     * 删除todo
     **/
    removeTodo: function() {
        // ...
    }
  }
}()

```

--------

## V——view:  

> 即门面担当，呃... 视图层，**界面部分** 由它来管理

---------
### 功能又是什么呢？
#### 1、界面初始化
#### 2、界面的动态变化
#### 3、界面组件
--------

```

MVC.view = function() { // view层主导视图的创建

    var M = MVC.model // 对model层的引用，数据是视图的骨架

    return {
        initTodo () {   // 界面初始化
            var todoInput = '<div id="todoInput">...</div>'
                
            var todoBody = `<div id="todoBody">...</div>`
            
            var todoSelect = `...`
            
            // 在这里我们先丢进界面中 ？ 
            model.dom().innerHTML = '<div id="todoFrame">'+
                                        todoInput + 
                                        todoBody + 
                                        todoSelect +
                                    '</div>'
            // 初始化Model数据
            model.initData()
            
            // 其他操作
            this.initAllList().updateLeftNum().holderLiToggle()
        },
        addTodo (todo) {    // 添加todo
            // 将一个todo渲染进去界面的操作示例
            var list = $('#list')
            var todoLi = document.createElement('li')
            // 省略对todoLi的加工 blabla...
            addFirstChild(list, todoLi)
        },
        removeTodo () {     // 删除todo
            // ......
        },
        showComplete () {   // 显示已完成
            // ......
        }
    }
}()

```


---------

## 有了数据，有了渲染方法，那怎样**实现交互**、实现更加具有**逻辑性**的功能？

---------

## C——controller：  

> 即控制器，页面逻辑的掌控者，就像是网页的中心及大脑，全权调用更新视图以及数据

---
### 功能
#### 1、实现交互
#### 2、复杂逻辑
---------------------------------------------------------------------------------

```

MVC.controller = function() {
    // 在controller层中引用View、Model （目的？？）
    var V = MVC.view
    var M = MVC.model
    
    // 第一种 (暴露控制器， 以便调用Ctrl层的接口)
    var C = {  
        start: function() {
            // 初始化视图
            view.initTodo()
            this.__listen()
        },
        __listen () {
            // 监听事件
            $('#addBtn').addEventListener('click',function(){
                var todoValue = $('#inputText').value;
                if(isEmpty(todoValue)){
                    todoValue = '我什么都不想干😛'
                }
                var newTodo = self.newTodo(todoValue);
                model.addTodo(newTodo);
                view.addTodo(newTodo);
                view.updateLeftNum();
                view.holderLiToggle();
            })
        },
        updateView: function() {
    
          //
    
        },
    
        updateModel: function() {
    
          //
    
        }
    
      }
    
      return C
    // 第二种


}()




```




## 为什么要用MVC？

其实我个人认为，这是非常必要的（不管在团队开发中，还是个人项目当中），便于代码的（组件的）复用，业务分离，代码清晰便于将来的维护，修改，甚至重构。开发效率的加快（大部分情况下），同时也能让我们专注于某一个层次的开发，可拓展性也非常强。。。。。。等

