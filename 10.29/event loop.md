## 异步
异步背后的一种实现方式event loop。

```
console.log('A')

setTimeout( function () {
  console.log('B')
}, 0 )

Promise.resolve().then(function() {
  console.log('C');
}).then(function() {
  console.log('D');
});

console.log('E')
```
## 定义
vent loop翻译出来就是事件循环，可以理解为实现异步的一种方式。事件，用户交互，脚本，渲染，网络这些都是我们所熟悉的东西，他们都是由event loop协调的。触发一个click事件，进行一次ajax请求，背后都有event loop在运作。
### task队列
- 一个event loop有一个或者多个task队列。
- 当用户代理安排一个任务，必须将该任务增加到相应的event loop的一个task队列中。
- 每一个task都来源于指定的任务源
#### task 任务源
- setTimeout
- setInterval
- setImmediate
- I/O
- UI rendering
### microtask队列
- 每一个event loop都有一个microtask队列，一个microtask会被排进microtask队列而不是task队列。
- 有两种microtasks：分别是solitary callback microtasks和compound microtasks。规范值只覆盖solitary callback microtasks。
- 如果在初期执行时，spin the event loop，microtasks有可能被移动到常规的task队列，在这种情况下，microtasks任务源会被task任务源所用。通常情况，task任务源和microtasks是不相关的。
## event loop的处理过程
一个event loop只要存在，就会不断执行下边的步骤：
- 在tasks队列中选择最老的一个task,用户代理可以选择任何task队列，如果没有可选的任务，则跳到下边的microtasks步骤。
- 将上边选择的task设置为正在运行的task。
- Run: 运行被选择的task
- 将event loop的currently running task变为null
- 从task队列里移除前边运行的task。
- .Microtasks: 执行microtasks任务检查点。（也就是执行microtasks队列里的任务）
- 更新渲染（Update the rendering）

## microtasks检查点（microtask checkpoint）
- 将microtask checkpoint的flag设为true。
- Microtask queue handling: 如果event loop的microtask队列为空，直接跳到第八步（Done）
- 在microtask队列中选择最老的一个任务。
- 将上一步选择的任务设为event loop的currently running task。
- 运行选择的任务
- 将event loop的currently running task变为null。
- 将前面运行的microtask从microtask队列中删除，然后返回到第二步（Microtask queue handling）
- Done: 每一个environment settings object它们的 responsible event loop就是当前的event loop，会给environment settings object发一个 rejected promises 的通知
- 清理IndexedDB的事务。
- 将microtask checkpoint的flag设为flase。

## 执行栈（JavaScript execution context stack）
task和microtask都是推入栈中执行的,javaScript是单线程，也就是说只有一个主线程，主线程有一个栈，每一个函数执行的时候，都会生成新的execution context（执行上下文），执行上下文会包含一些当前函数的参数、局部变量之类的信息，它会被推入栈中， running execution context（正在执行的上下文）始终处于栈的顶部。当函数执行完后，它的执行上下文会从栈弹出。

```
function bar() {
console.log('bar');
}

function foo() {
console.log('foo');
bar();
}

foo();
```
![image](https://github.com/aooy/aooy.github.io/blob/master/blog/issues5/img/ec2.jpg?raw=true)
## 完整的异步过程

```
Promise.resolve().then(function promise1 () {
       console.log('promise1');
    })
setTimeout(function setTimeout1 (){
    console.log('setTimeout1')
    Promise.resolve().then(function  promise2 () {
       console.log('promise2');
    })
}, 0)

setTimeout(function setTimeout2 (){
   console.log('setTimeout2')
}, 0)
```
运行过程：
script里的代码被列为一个task，放入task队列。
### 循环1：
- task队列：script ；microtask队列
1. 从task队列中取出script任务，推入栈中执行。
2. promise1列为microtask，setTimeout1列为task，setTimeout2列为task。
- task队列：setTimeout1 setTimeout2；microtask队列：promise1
3. script任务执行完毕，执行microtask
### 循环2：
4. checkpoint，取出microtask队列的promise1执行
- task队列：setTimeout1 setTimeout2；microtask队列：
4. 从task队列中取出setTimeout1，推入栈中执行，将promise2列为microtask
- task队列：setTimeout2；microtask队列：promise2
5. 执行microtask checkpoint，取出microtask队列的promise2执行
### 循环3：
- task队列：setTimeout2；microtask队列：
6. 从task队列中取出setTimeout2，推入栈中执行。
7. setTimeout2任务执行完毕，执行microtask checkpoint
- task队列：；microtask队列：

# 参考资料
- [JavaScript：彻底理解同步、异步和事件循环(Event Loop)](https://segmentfault.com/a/1190000004322358#articleHeader1)
- [从event loop规范探究javaScript异步及浏览器更新渲染时机](https://github.com/aooy/blog/issues/5/)
- [深入探究 eventloop 与浏览器渲染的时序问题 ](https://github.com/jin5354/404forest/issues/61)



