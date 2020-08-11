# 数组
1：数组去重扁平化
```javascript
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
```
2：按月份{1:100, 2:122, 5: 888} 变成[100, 122, null, null, 555,...]数组
```javascript
let obj = {1:222, 2:123, 5:888};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
```