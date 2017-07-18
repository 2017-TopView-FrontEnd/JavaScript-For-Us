# caller&callee
- ### caller返回一个函数的引用,这个函数调用了当前的函数
```
var a = function() {   
    alert(a.caller);   
}   
var b = function() {   
    a();   
}   
b();  
```
上面的代码中,b调用了a,那么a.caller返回的是b的引用,结果如下:
```
var b = function() {   
    a();   
} 
```
如果直接调用a(即a在任何函数中被调用,也就是顶层调用),返回null:

```
var a = function() {   
    alert(a.caller);   
}   
var b = function() {   
    a();   
}   
a();
```
- ### callee是arguments对象的一个属性,该属性是一个指针,指向参数arguments对象的函数,作用就是用来指向当前对象.
(它有一个length属性,可以用来获得形参的个数,因此可以用来比较形参和实参个数是否一致,即比较arguments.length是否等于arguments.callee.length)

```
var a = function() {   
    alert(arguments.callee);   
}   
var b = function() {   
    a();   
}   
b();
```
a在b中被调用,但是它返回了a本身的引用,结果如下:

```
var a = function() {   
    alert(arguments.callee);   
}   
```
- ### 书上还说明了用这两个函数消除耦合的现象
先来看一个阶乘函数:

```
function Aaa(x){
    if(x<=1){
       return 1;
}else{
       return x*Aaa(x-1);
    }
}
```
但是如果改变了函数名里面的函数名也要随着改变,这个函数的执行与函数名紧紧耦合在了一起,使用arguments.callee来消除紧密耦合的现象

```
function Aaa(x){
     if(x<=1){
        return 1;
}else{
        return x*arguments.callee(x-1);
    }
}
```
也可以将callee和caller结合起来用

```
function b(){
alert(b.caller);
};
```
b函数中调用了b函数名，这样当函数名改变时就很不方便，我们需要替换里面的那个b

```
(function a(){
    b();
})();
  
function b(){
    alert(arguments.callee.caller);     //用arguments.callee代替了b
};
```




