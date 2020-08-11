# sass
1：在sass中转换rem
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