
1：vue-cli 在postcss.config.js配置postcss-px-to-viewport  
```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    // 'postcss-url': {},
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,     // (Number) The width of the viewport.
      unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw',     // (String) Expected units.
      fontViewportUnit: "vw",
      selectorBlackList: ['.test'],  // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
      mediaQuery: false,      // (Boolean) Allow px to be converted in media queries.
      replace: false
    }
  }
}
```  
2：在sass中转换rem
设置总体的函数  
```sass
$rootSize: 16px!default;
$designWidth: 750px!default;
$designRatio: 2!default;

@function rem($px) {
    @return $px / $rootSize / $designRatio * 1rem;
}
@function rootVw() {
    @return $rootSize / $designWidth * $designRatio * 100vmin;
}
```
在页面中使用  
```sass
html{
    font-size: rootVw();
}
.div{
    width: rem(300px);
    font-size: rem(14px);
}
```   
3：数组去重扁平化
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
