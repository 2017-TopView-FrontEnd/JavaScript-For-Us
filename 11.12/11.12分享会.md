> # padding 图片自适应布局

在默认的水平文档流方向下，当padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的.

对于padding属性而言，任意方向的百分比padding的宽度计算可以让我们实现固定比例的块级容器

```
div { padding: 50%; }
div { padding: 100% 0 0; }
div { padding-bottom: 100%; }
```

### 这种能固定比例的特性可以使图片自适应布局
padding的百分比指图片高与宽的比值
- 作为背景图片时
```
.banner {
    padding: 15.15% 0 0;
    background-size: cover;
}
```
- 内联的<img>
```
<div class="box">
    <img src="150x200.png">
</div>
.box {
    padding-bottom: 133%;
    position: relative;
    display: block;
}
.box > img {
    position: absolute;
    width: 100%; 
    height: 100%;
    left: 0; 
    top: 0;
}
```

### **只设定图片的宽度**

此时浏览器默认会保持图片比例显示，图片宽度大了，高度也跟着一起变大；图片宽度小了，高度也跟着一起变小。然而这种技巧有一个非常不好的体验问题，那就是随着页面加载的进行，图片占据的高度会有一个从0到计算高度的图片变化，视觉上会有明显的元素跳动，代码层面会有布局重计算。


> # CSS/CSS3原生变量var

### **声明**
- CSS中原生的变量定义语法是：--\*，其中\*表示我们的变量名称。
- 命名规则: 不能包含$，[，^，(，%等字符,普通字符局限在只要是“数字[0-9]”“字母[a-zA-Z]”“下划线_”和“短横线-”这些组合，但是可以是中文，日文或者韩文.
- 各种值都可以放入 CSS 变量
```
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```
- 变量名大小写敏感

### **var() 函数**
- var()函数用于读取变量。
```
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```
- var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值
```
color: var(--foo, #7F583F);
```
- 第二个参数不处理内部的逗号或空格，都视作参数的一部分
```
var(--font-stack, "Roboto", "Helvetica");
var(--pad, 10px 15px 20px);
```
- var()函数还可以用在变量的声明
```
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```
- 变量值只能用作属性值，不能用作属性名
```
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```

### **变量值的类型**
- 如果变量值是一个字符串，可以与其他字符串拼接。
```
--bar: 'hello';
--foo: var(--bar)' world';
```
- 如果变量值是数值，不能与数值单位直接连用,必须使用calc()函数将它们连接
```
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```
- 如果变量值带有单位，就不能写成字符串。
```
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}

/* 有效 */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```
### **作用域**
同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。
```

<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```
全局的变量通常放在根元素:root里面，确保任何选择器都可以读取它们

### **响应式布局**
在响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值
```
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

### **兼容性处理**
对于不支持 CSS 变量的浏览器，可以采用下面的写法
```
a {
  color: #7F583F;
  color: var(--primary);
}
```
使用@support命令进行检测
```
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

### **JavaScript 操作**
检测浏览器是否支持 CSS 变量
```
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```
操作 CSS 变量
```
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```
### **为什么使用原生CSS自定义属性**
- 无需使用预处理器就能使用它们
- 可级联。可以在任何选择器中设置变量以设置或覆盖它的当前值。
- 当它们的值改变（例如媒体查询或其他状态）时，浏览器根据需要重绘。
- 可以在JavaScript中读取和操作它们。


> # 重排和重绘

### **浏览器的渲染机制**

浏览器渲染展示网页的过程，大致分为以下几个步骤：
1. 解析HTML(HTML Parser)
2. 构建DOM树(DOM Tree)
3. 渲染树构建(Render Tree)
4. 绘制渲染树(Painting)

浏览器下载完页面中的所有组件(html标记、Javascript、CSS、图片)之后会解析生成两个内部数据结构——DOM树和渲染树。

CSSOM树和DOM树连接在一起形成一个渲染树,用来计算可见元素的布局并且作为将像素渲染到屏幕上的过程的输入。 DOM树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点(隐藏的DOM元素 display:none 在渲染树中没有对应的节点)。

一旦DOM树和渲染树构建完成，浏览器就开始绘制页面元素。当DOM的变化影响了元素的几何属性(宽或高)，浏览器需要重新计算元素的几何属性，同时其他元素的几何属性和位置也会受到影响。

### **高消耗的样式**

box-shadows / border-radius / transparency / transforms /CSS filters

### **什么是重排**

浏览器为了重新渲染部分或整个页面，重新计算页面元素位置和几何结构的进程叫做重排(reflow)

reflow是导致DOM脚本执行效率低的关键因素之一，页面上任何一个节点触发了reflow，会导致它的子节点及祖先节点重新渲染。
```
<body>
  <div class="hello">
    <h4>hello</h4>
    <p><strong>Name:</strong>BDing</p>
    <h5>male</h5>
    <ol>
      <li>coding</li>
      <li>loving</li>
    </ol>
  </div>
</body>
```
**什么时候会导致重排发生**
- 改变窗口大小
- 改变文字大小
- 添加/删除样式表
- 内容的改变，(用户在输入框中写入内容也会)
- 激活伪类，如:hover
- 操作class属性
- 脚本操作DOM
- 计算offsetWidth和offsetHeight
- 设置style属性

**减少reflow对性能的影响**
- 不要一条一条地修改 DOM 的样式，预先定义好 class，然后修改 DOM 的 className
- 把 DOM 离线后修改，比如：先把 DOM 给 display:none (有一次 Reflow)，然后你修改100次，然后再把它显示出来
- 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量
- 尽可能不要修改影响范围比较大的 DOM
- 为动画的元素使用绝对定位 absolute / fixed
- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围

### **什么是重绘**
重绘(repaint)是在一个元素的外观被改变，但没有改变布局的情况下发生的，如改变了visibility、outline、background等。当repaint发生时，浏览器会验证DOM树上所有其他节点的visibility属性。



