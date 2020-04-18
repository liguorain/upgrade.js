/**
 * @function upgrader - 版本升级函数
 * @desc 用于老旧项目中采用 window.xxx 方式进行模块化的插件的升级方案
 *
 * @param {Object} updaterSet - 升级的
 */
function upgrader(updaterSet){
    var buffer = {};

    for(var key in defaultUpdater){
        if(defaultUpdater.hasOwnProperty(key) && !updaterSet[key]){
            updaterSet[key] = defaultUpdater[key];
        }
    }

    for(var key in updaterSet){
        if(updaterSet.hasOwnProperty(key)){
            var resolver = updaterSet[key];

            Object.defineProperty(window, key, {
                get: function(){
                    return buffer[key] || this;
                },
                set: function(value){
                    !buffer[key] && (buffer[key] = value);
                    return resolver instanceof Function? resolver(this, value): value;
                }
            });
        }
    }

    return null;
}

// TODO 文件分档
var defaultUpdater = {
    'layui': function layuiUpgrader(preInstance, curInstance){
        var preVersion = preInstance.v,
            curVersion = curInstance.v,  // 当前版本号
            preVersionWeight = 0,  // 已存在实例的版本号权重
            curVersionWeight = 0,  // 当前版本的版本号权重
            each = curInstance.each,
            modules = preInstance.modules,
            modulesStr = []
        ;

        // 提取版本号权重，确定保留升级的
        // todo 将版本号提取函数剥离成 util
        each(preVersion.splice('.'), function(index, item){
            preVersionWeight += (+item||0.1) * 10^(3 - index);
        });
        each(curVersion.splice('.'), function(index, item){
            curVersionWeight += (+item||0.1) * 10^(3 - index);
        });
        for(var key in modules){
            if(modules.hasOwnProperty(key)){
                modulesStr.push(key);
            }
        }
        if(preVersionWeight >= curVersionWeight){
            return preInstance
        }

        //   暂未发现兼容性问题
        return curInstance.use(modulesStr);
    };
}
