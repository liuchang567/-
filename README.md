
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
