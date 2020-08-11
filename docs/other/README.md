# babylonjs
1：babylonjs 清空场景
```javascript
engine.dispose()
// 1调用dispose()方法后，clear清空残留的场景
engine.clear(new BABYLON.Color3(0.32, 0.32, 0.32), true, true, true)
// 或者用webgl方法清空
// let canvas = document.getElementById('canvas3d')
// let gl = canvas.getContext('webgl2')
// gl.clear(gl.COLOR_BUFFER_BIT)
```