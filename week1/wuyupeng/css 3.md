## CSS 3 2D转换
- translate()方法：元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数。

- rotata()方法：
通过 rotate() 方法，元素顺时针旋转给定的角度。允许负值，元素将逆时针旋转。
- scale()方法：
通过 scale() 方法，元素的尺寸会增加或减少，根据给定的宽度（X 轴）和高度（Y 轴）参数
- skew()方法：通过 skew() 方法，元素翻转给定的角度，根据给定的水平线（X 轴）和垂直线（Y 轴）参数
- transition()属性：transition-property：规定应用过渡的 CSS 属性的名称   transition-duration：定义过渡效果花费的时间，默认是 0   transition-timing-function：规定过渡效果的时间曲线。默认是 "ease"。  transition-delay：规定过渡效果何时开始。默认是 0。

transform-orign;??

## CSS3 3D转换
- rotateX(angle)  rotate(angle)  rotaate(angle):f分别为绕x、y、z轴旋转。
- perspective()
:设置透视点
- translateZ()：当设置的值越靠近透视点，子元素越大，越小子元素越小，当大于透视点的时候，就不见了
- backface-visibility：当设置为hidden时，不该看的看不到，当设置为visible时，背面可以看得到。
- perspective-origin  ???



animation 和  transition有什么区别？？