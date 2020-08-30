# 数据特殊操作
#### 1：交换两个值
```javascript
// 1利用一个数异或本身等于0和异或运算符合交换率
var a = 3;
var b = 4
a ^= b; // a = a ^ b
b ^= a;
a ^= b;

// 2使用ES6解构赋值
let a = 1;
let b = 2;
[b, a] = [a, b];
``` 
  
  
#### 2：小数取整
```javascript
var num = 123.123
// 常用方法
console.log(parseInt(num)); // 123
// “双按位非”操作符
console.log(~~ num); // 123
// 按位或
console.log(num | 0); // 123
// 按位异或
console.log(num ^ 0); // 123
// 左移操作符
console.log(num << 0); // 123
``` 
  
  
#### 3：数字金额千分位格式化
```javascript
// 1使用Number.prototype.toLocaleString()
var num = 123455678;
var num1 = 123455678.12345;
var formatNum = num.toLocaleString('en-US')
var formatNum1 = num1.toLocaleString('en-US')
console.log(formatNum); // 123,455,678
console.log(formatNum1); // 123,455,678.123

// 2正则
var num = 123455678;
var num1 = 123455678.12345;
var formatNum = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
var formatNum1 = String(num1).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
console.log(formatNum); // 123,455,678
console.log(formatNum1); // 123,455,678.12,345
```   
  
#### 4：对象循环
```javascript
function A() {
    this.a = 1
    this.b = 1
}
A.prototype = {
    c: 1,
    d: 2
}
var a = new A()

// 1 fonr-in
for(var i in a) {
    console.log(i)
}

// 2 Object.entries()
Object.entries(a)

// 3 Object.keys()、 Object.values()

var keys = Object.keys(a)
var values = Object.values(a)
```
  
#### 4：数据类型检测
```javascript
// 暂时没列出不足之处
// 1 typeof
typeof a;

// 2 instanceof
a instanceof String

// 3 Object.propotype.toString
Object.prototype.toString.call('string')

// 4 constructor
a.constructor === String

// 5  propotype
var strN = new String('11111');
strN.__proto__ === String.prototype
```
