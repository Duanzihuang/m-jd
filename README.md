# m-jd
移动Web-京东



## 基础知识

> 移动Web

```
流式布局 + ViewPort
```

> ViewPort

```
一种虚拟的窗口，用于在移动端的浏览器中显示网页内容，默认情况下，手机端视口的宽度是980px，而一般的手机
屏幕宽度会小于980px，所以就这导致了，我们在PC端的网页显示在移动端的浏览器上面时候会出现缩放的原因
```

> ViewPort设置

```
width: 视口宽度，一般设置为device-width
initial-scale:1 初始缩放比率，这个是设置视口与真实手机屏幕宽度的比率
user-scalable:no 不允许用户通过手指捏合进行缩放
```

> 行业通用视口设置标准

```
<meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
```

##移动端图片处理

> 问题及解决办法

```
问题：
如果1:1 的显示在移动设备中，图标会失真

解决办法：
1、如果是Img使用直接设置宽高的方式来压缩
2、如果是背景使用的是设置background-size的方式来压缩
```

> 其它之图片的宽度与高度

```
当设置图片的宽度为100%的时候，图片的高度会随着父容器（或是屏幕）的增加而增加【高度会随着父容器而改变】
```

## 屏幕滚动

> 获取屏幕滚动出去的距离的兼容写法

```
var top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
```

