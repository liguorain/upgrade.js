# upgrade.js
用于解决老旧项目中全局引入的控件之间的冲突，比如 Layui。（已放弃维护）

初衷是为了解决 Layui 的插件问题——使用 ```layui.use``` 引入了某些插件，但在之后的代码中又引入了数个版本的 layui 文件，导致的问题就是
前面的所有 layui 插件都没有了，页面报错。
最好的解决方案自然是控件官方推出单例模式，但是在此之前只能选择打一个补丁，而这个补丁的最佳方案之一，就是 ***upgrade.js***！
