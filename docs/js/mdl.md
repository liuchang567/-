# 代码片段
1.reduce
> arr.reduce(callback, initialValue)  
>> callback function(prev, cur, curindex, arr)  
>+ prev--- 必需 上一次调用回调返回的值，或者是提供的初始值initialValue
>+ cur--- 必需  当前元素
>+ curindex---当前元素的索引
>+ arr---当前元素所属的数组对象 
>> initialValue 作为第一次调用 callback 的第一个参数  

- 例子1 
```javascript
var arr = [1, 2, 3, 4]
var sum = arr.reduce(function(prev, cur, index, arr) {
  console.log(prev, cur, index)
  return prev + cur
})
console.log(arr, sum)
// 1 2 1  
// 3 3 2  
// 6 4 3  
// [1, 2, 3, 4] 10 
// 这里index是从1开始的，第一次的prev的值是数组的第一个值。数组长度是4，但是reduce函数循环3次
```  
 - 例子2  
 ```javascript
var  arr = [1, 2, 3, 4]
var sum = arr.reduce(function(prev, cur, index, arr) {
  console.log(prev, cur, index)
  return prev + cur
}, 0) // 注意这里设置了初始值
console.log(arr, sum)
// 0 1 0
// 1 2 1
// 3 3 2
// 6 4 3
// [1, 2, 3, 4] 10
// 这个例子index是从0开始的，第一次的prev的值是我们设置的初始值0，数组长度是4，reduce函数循环4次
 ```  
 **如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。**  

- 常见问题 var arr = [] 数组为空时
```javascript
// 单行可以省略return
var arr = []
var sum = arr.reduce((x, y, i, arr) => x + y)  
// Reduce of empty array with no initial value"  
var sum2 = arr.reduce((x, y, i, arr) => x + y, 0)
// 解决上面报错问题，sum - 0
 ```  
- 常见运用场景  
```javascript
arr.reduce((x,y) => x + y) // 求和  
arr.reduce((x,y) => x * y) // 求积
``` 
- 计算数组中元素出现的个数
```javascript
var names = ['A', 'B', 'C', 'D', 'A']
var nameNum = names.reduce((pre, cur) => {
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
}, {})
// {A: 2, B: 1, C: 1, D: 1}
```   
- 对象里的属性求和(项目开发会偶遇)
```javascript
var arr = [
  { name: 'A', score: 10 },
  { name: 'B', score: 20 },
  { name: 'C', score: 30 }
]

var sum = arr.reduce((prev, cur) => {
  return cur.score + prev;
}, 0)
// 60
``` 
- 对象里的相同属性求和(项目开发常驻选手)
```javascript
var arr = [
  { id: 1, num: 23 },
  { id: 3, num: 15 },
  { id: 1, num: 37 },
  { id: 2, num: 10 }
];

var newArr = arr.reduce(function(prev, cur) {
  if (prev.findIndex(v=>v.id === cur.id) >= 0 ) {
    prev[prev.findIndex(v=>v.id === cur.id)].num += cur.num
    return prev
  } else {
    return prev.concat(cur)
  }
}, [])
// [{id: 1, num: 60},{id: 3, num: 15},{id: 2, num: 10}]
``` 
- 数组去重(还可以用new Set(...arr))
```javascript
var arr = [1, 2, 3, 4, 4, 1]
var  newArr = arr.reduce((pre, cur) => {
  return !pre.includes(cur) ? pre.concat(cur) : pre
}, [])
// [1, 2, 3, 4]
``` 
- 将N维数组转化为一维(一维数组转换，还可以可以用es6的flat())
```javascript
var arr = [[0, 1], [2, 3], [4, 5]]
var newArr = arr.reduce((pre,cur) => {
    return pre.concat(cur)
}, [])
// [0, 1, 2, 3, 4, 5]
var arr2 = [[0, 1], [2, 3], [4,[5,6,7]]]
var newArr2 = function(arr){
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), [])
}
newArr2(arr2)
``` 
2.arguments  
> 每一个函数都有一个arguments对象（通常把它当作数组使用有长度却不是数组），JS传的是形参，可以传也可以不传，若方法里没有写参数却传入了参数，arguments可以使用获取参数。  
- 转成真正的数组
```javascript
var arr = Array.prototype.slice.call(arguments)
```   
- 格式化字符串
```javascript
// 1
function format(string) {
  var args = arguments;
  var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
  return String(string).replace(pattern, function(match, index) {
    return args[index];
  });   
};
format("And the %1 want to know whose %2 you %3", "papers", "shirt", "wear")
// "And the papers want to know whose shirt you wear"

//2
function makeFunc() {
  var args = Array.prototype.slice.call(arguments);
  var func = args.shift();
  return function() {
    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  };
}
var func = makeFunc(format, "I like %1 not %2.");
func("js", "java")
``` 
- 创建引用自身的函数
```javascript
function repeat(fn, times, delay) {
  return function() {
    if(times-- > 0) {
      fn.apply(null, arguments);
      var args = Array.prototype.slice.call(arguments);
      var self = arguments.callee;
      setTimeout(function(){self.apply(null,args)}, delay);
    }
  };
}
var somethingWrong = repeat(function(s){console.log(s)}, 3, 2000);
somethingWrong("Can you hear me, major tom?");
```   
3.实现一个call  
```javascript
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function(context) {
  if (typeof this !== 'funtion') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let arg = [...arguments].slice(1)
  let result = context.fn(...arg)
  delete context.fn
  return result
} 
```
4.实现一个apply  
```javascript
// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply  = function(context) {
  if (typeof this !== 'funtion') {
    throw new TypeError('not function')
  }
  context = context || window
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
} 
```
5.实现一个bind  
```javascript
// 思路：类似call，但返回的是函数
Function.prototype.mybind  = function(context) {
  if (typeof this !== 'funtion') {
    throw new TypeError('err')
  }
  let _this = this
  let arg = [...arguments].slice(1)
   return function F() {
    // 处理函数使用new的情况
    if (this instanceof F) {
      return new _this(...arg, ...arguments)
    } else {
      return _this.apply(context, arg.concat(...arguments))
    }
  }
} 
```
6.instanceof原理 
```javascript
// 思路：右边变量的原型存在于左边变量的原型链上
function instanceof(left, right) {
  let leftValue = left.__proto__
  let rightValue = right.prototype
  while(true) {
    if (leftValue === null) {
      return false
    }
    if (leftValue === rightValue) {
      return true
    }
    leftValue = leftValue.__proto__
  }
}
```
7.Object.create的基本实现原理
```javascript
// 思路：将传入的对象作为原型
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}
```
8.new的本质
```javascript
// 新生成了一个对象
// 链接到原型
// 绑定 this
// 返回新对象
function create() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}
```
9.实现一个基本的Promise
```javascript
// 简单版本
class Promise {
  constructor (fn) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined

    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
      }
    }

    let reject = value => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.value = value
      }
    }

    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case 'fulfilled':
        onFulfilled()
        break
      case 'rejected':
        onRejected()
        break
      default:
    }
  }
}
```
10.实现深浅拷贝
```javascript
// 浅拷贝
let copy1 = {...{x: 1}}

let copy2 = Object.assign({}, {x: 1})
// 深拷贝
JSON.parse(JSON.stringify(obj))

function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {}
  for(let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return copy
}
```
11.实现双向绑定
```javascript
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
  }
})
// 输入监听
input.addEventListener('keyup', function(e) {
  obj.text = e.target.value
})
```
12.实现简单路由
```javascript
// hash路由
class Route{
  constructor(){
    // 路由存储对象
    this.routes = {}
    // 当前hash
    this.currentHash = ''
    // 绑定this，避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this)
    // 监听
    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }
  // 存储
  storeRoute (path, cb) {
    this.routes[path] = cb || function () {}
  }
  // 更新
  freshRoute () {
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }   
}
```
13.防抖/节流
```javascript
// 防抖函数
const debounce = (fn, delay = 500) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
// 节流函数
const throttle = (fn, delay = 500) => {
  let flag = true
  return (...args) => {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}
```
13.普通数组结构-转成tree结构
```javascript
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
]
// 转成
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
]
// 方法
function convert(list) {
  const res = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {})
  for(const item of list) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
			parent.children.push(item)
    }
  }
  return res
}
```
13.在原数据，把0放到末尾
```javascript
function zeroMove(array) {
  let len = array.length;
  let j = 0;
  for(let i=0;i<len-j;i++){
    if(array[i]===0){
      array.push(0);
      array.splice(i,1);
      i --;
      j ++;
    }
  }
  return array;
}
```
 