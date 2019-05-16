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