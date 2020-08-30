# 数组
  
#### 1：数组去重
```javascript
// es6
let newArr = [...new Set(arr)];
// indexOf
// 利用数组indexOf()方法，返回找到的第一个值的索引
// 如果数组元素的索引值与indexOf方法查找返回的值不相等，则说明该值重复了，直接过滤掉
function uniqueArr (arr) {
    return arr.filter(function (ele, index, array) {
        return array.indexOf(ele) === index;
    })
}
```
  
  
####  2：数组去重扁平化
```javascript
let arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
// 扁平化
arr.toString().split(',').map(Number);
// 排序去重扁平化
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
```  
  
  
#### 3：按月份{1:100, 2:122, 5: 888} 变成[100, 122, null, null, 555,...]数组
```javascript
let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
```
  
  
#### 4：统计字符串中相同字符出现的次数
```javascript
var str = 'aaabbbccc66aabbc6';
var strInfo = str.split('').reduce((p, c) => (p[c]++ || (p[c] = 1), p), {});
```
  
  
#### 5：一行代码实现获取一个网页使用了多少种标签
```javascript
[...new Set([...document.querySelectorAll('*')].map(node => node.tagName))].length;
```    
  
  
#### 6：a == 1 && a == 2 && a == 3
```javascript
//1
var a = [1, 2, 3];
// a.join = a.shift;
// a.valueOf = a.shift;
a.toString = a.shift;
console.log(a == 1 && a == 2 && a == 3)
// 原理：当复杂类型数据与基本类型数据作比较时会发生隐性转换，会调用toString()或者valueOf()方法
//2 改写tostring方法
var a = {
    value: 1,
    toString: function () {
        return a.value++;
    }
}
console.log(a == 1 && a == 2 && a == 3);
```
  
  
#### 7：将类数组对象转成数组
```javascript
// 1
var likeArrObj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
}
var arr1 = Array.prototype.slice.call(likeArrObj); 
// 或者使用[].slice.call(likeArrObj);
// 2
var arr = Array.from(likeArrObj);
``` 