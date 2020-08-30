# css常用的技巧
## 基础技巧
#### 1：清除图片下方出现几像素的空白间隙  
方法1：设为块状元素
``` css
img {
    display: block;
}
``` 
方法2：设置vertical-align
``` css
img {
    vertical-align: top;
}
// 还可以设置为text-top | middle | bottom | text-bottom
// 甚至特定的<length>和<percentage>值都可以
``` 
方法3：设置父级div的font-size
``` css
.parent为img的父元素
.parent {
    font-size: 0;
    line-height: 0;
}
```   
  

#### 2：让文本垂直对齐文本输入框 
``` css
input {
    vertical-align: middle;
}
```   
  
  
#### 3：让超链接访问后和访问前的颜色不同且访问后仍保留hover和active效果(L-V-H-A)
``` css
a:link{color:#03c;}
a:visited{color:#666;}
a:hover{color:#f30;}
a:active{color:#c30;}
``` 
  
  
#### 4：Standard mode下IE无法设置滚动条的颜色？
``` css
html{
    scrollbar-3dlight-color:#999;
    scrollbar-darkshadow-color:#999;
    scrollbar-highlight-color:#fff;
    scrollbar-shadow-color:#eee;
    scrollbar-arrow-color:#000;
    scrollbar-face-color:#ddd;
    scrollbar-track-color:#eee;
    scrollbar-base-color:#ddd;
}
``` 
  
  
#### 5：文本溢出
文本溢出边界不换行强制在一行内显示
``` css
.test{width:150px;white-space:nowrap;}
```
文本溢出边界显示为省略号
``` css
.test{
    width:150px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
```
连续的长字符串自动换行
``` css
.test{
    width:150px;
    word-wrap:break-word;
}
```  
  

#### 6：定义鼠标指针的光标形状为手型并兼容所有浏览器
``` css
.test{cursor:pointer;}
```  
  

#### 7：让HTML列表项看上去像被一个真正的，分隔的列表
``` css
ul > li:not(:last-child)::after{
    content: "，";
}
``` 
  

#### 8：对图标使用 SVG
``` css
.logo{
    background: url("logo.svg");
}
``` 
  
    
      

## 进阶技巧
  
  
#### 1：彩色的图片显示为黑白照片(浏览器有兼容问题)
``` css
.desaturate{
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}
```
  
  
#### 2：菜单上应用/取消应用边框
先给每一个菜单项添加边框;最后一个元素
``` css
nav li{
    border-right: 1px solid #666;
}
nav li:last-child{
    border-right: none;
}
```
也可以直接使用 :not() 伪类来应用元素
``` css
nav li:not(:last-child){
    border-right: 1px solid #666
}
```
如果元素有兄弟元素的话，也可以使用通用的兄弟选择符( ~ ）
``` css
nav li:first-child ~ li{
    border-left: 1px solid #666
}
``` 
  
  
#### 3：网页加上漂亮的顶部阴影效果
``` css
body:before{
    content: '';
    position: fixed;
    top: -10px;
    left: 0;
    width: 100%;
    height: 10px;
    -webkit-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
    -moz-box-shadow: 0px 0px 10px rgba(0,0,0,.8);
    box-shadow: 0px 0px 10px rgba(0,0,0,.8);
    z-index: 100;
}
```
  
  
#### 4：给 body 添加行高，不需要给别给 p,h之类的添加行高
``` css
body{
    line-height: 1;
}
```
  
  
#### 5：所有一切都垂直居中
``` css
html, body{
    height: 100%;
    margin: 0;
}
body{
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
}
```
  
  
#### 6：使用负的 nth-child 选择项目1到项目n
``` css
li{
    display: none;
}
li:nth-child(-n+3){
    display: block;
}
```
  
  
#### 7：优化显示文本
``` css
html{
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
}
```
  
  
#### 8：使用 max-height 和溢出隐藏来实现只有 css 的滑块
``` css
.slider ul{
    max-height: 0;
    overflow: hidden;
}
.slider:hover ul{
    max-height: 1000px;
    transition: .3s ease;
}
```
  
  
#### 9：继承 box-sizing
``` css
html{
    box-sizing: border-box;
}
,:before, :after{
    box-sizing: inherit;
}
```
  
  
#### 10：表格单元格等宽
``` css
.table{
    table-layout: fixed;
}
```
  
  
#### 11：用 Flexbox 摆脱外边距的各种 hack
``` css
.list{
    display: flex;
    justify-content: space-between;
}
.list .person{
    flex-basis: 23%;
}
```
  
  
#### 12：使用属性选择器用于空链接
``` css
a[href^="http"]:empty::before{
    content: attr(href);
}
```
  
  
#### 13：CSS 写出三角形
``` css
div.arrow-up{
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #ccc;
    font-size: 0px;
    line-height: 0px;
}
```
  
  
#### 13：文本
文本渐变
``` css
h2[data-text]{
    position: relative;
}
h2[data-text]::after{
    content: attr(data-text);
    z-index: 10;
    color: #e3e3e3;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-mask-image: -webkit-gradient(linear, left top,left bottom,from(rgba(0,0,0,0)),color-stop(50%,rgba(0,0,0,1)),to(rgba(0,0,0,0)));
}
```
模糊文本
``` css
.blur{
    color: transparent;
    text-shadow: 0 0 5px rgba(0,0,0,.5);
}
``` 
