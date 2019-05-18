/**
 * 在全局挂在一个对象
 */
window.itcast = {}

/**
 * 参数1：给哪个dom元素添加过渡结束事件
 * 参数2：过渡结束事件触发之后需要执行的函数
 */
itcast.transitonEnd = function(dom,callback){
    dom.addEventListener('transitionEnd',function(){
        callback && callback()
    })

    dom.addEventListener('webkitTransitionEnd',function(){
        callback && callback()
    })
}

/**
 * 封装移动端tap事件
 */
itcast.tap = function(dom,callback) {
    var isMove = false
    var startTime = 0

    dom.addEventListener('touchstart',function(e){
        // 开始事件
        startTime = Date.now()
    })

    dom.addEventListener('touchmovue',function(e){
        // 开始移动
        isMove = true
    })

    dom.addEventListener('touchend',function(e){
       if (!isMove && Date.now() - startTime < 150){
           callback && callback(e)
       }

       // 重置相关变量
       isMove = false
       startTime = 0
    })
}