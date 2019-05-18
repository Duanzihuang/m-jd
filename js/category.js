window.onload = function() {
    // 左边滑动
    leftSwipe()
    // 右边滑动
    rightSwipe()
}

function leftSwipe(){
    /**
     * 1.菜单滑动起来
     * 2.当滑动到一定的距离的时候不能滑动  滑动区间
     * 3.当触摸结束的时候  需要判断是否在定位区间内  否则吸附回去  定位回去
     * 4.点击菜单的时候  改变当前的样式
     * 5.点击菜单的时候  定位到当前的那个菜单到最顶部
     *   如果不满足定位区间就不做定位
     */

    // 获取父容器
    var parentBox = document.querySelector('.jd_category_left')
    var childBox = parentBox.querySelector('ul')
    // 获取父容器 和 子元素的高度
    var parentHeight = parentBox.offsetHeight
    var childHeight = childBox.offsetHeight
    
    // 约定最大滚动可以滚动的距离
    var maxY = 0
    /*translateY 滑动到最下面的定位 其实就是最小定位 父容器高度-子容器高度*/
    var minY = parentHeight - childHeight
    /*自己定义缓冲的距离*/
    var distance = 100
    /*translateY 最大滑动定位*/
    var maxSwipe = maxY + distance
    /*translateY 最小滑动定位*/
    var minSwipe = minY - distance

    // 定义公共的方法
    var addTransition = function(){
        childBox.style.webkitTransition = "all .2s"
        childBox.style.transition = "all .2s"
    }

    var removeTransition = function(){
        childBox.style.webkitTransition = "none"
        childBox.style.transition = "none"
    }

    var setTransitionY = function(y){
        childBox.style.webkitTransform = "translateY("+y+"px)"
        childBox.style.transform = "translateY("+y+"px)"
    }

    /*第一步  1.菜单滑动起来*/
    var startY = 0
    var moveY = 0
    var distanceY = 0
    var isMove = false

    var currY = 0;/*记录当前的定位 全局  相当于轮播图当中的index*/

    childBox.addEventListener('touchstart',function(e){
        // 开始位置
        startY = e.touches[0].clientY
    })

    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY

        // 计算滚动距离
        distanceY = moveY - startY

        // 清除过渡
        removeTransition()
        /*设置定位*/
        /*第二步 2.当滑动到一定的距离的时候不能滑动  滑动区间*/
        /*当前要做定位的位子需要在滑动区间内*/
        if (currY + distanceY < maxSwipe && currY + distanceY > minSwipe){
            // 设置滚动距离(Y值的定位)
            addTransition()
            setTransitionY(currY + distanceY)
        }
    })

    childBox.addEventListener('touchend',function(e){
        if (currY + distanceY > maxY) { // 允许最大向下的滚动距离
            currY = maxY
            // 当距离超过允许下拉的最大值，则吸附回去
            addTransition()
            setTransitionY(currY)
        } else if (currY + distanceY < minY) { // 允许最大的向上的滚动距离
            currY = minY
            // 当距离超过允许上拉的最大值，则吸附回去
            addTransition()
            setTransitionY(currY)
        } else {
            /*记录当前的定位   上一次当前的定位 + 这一次改变的定位*/
            currY = currY + distanceY
        }

        /*重置所有的参数  不重置currY */
        startY = 0
        moveY = 0
        distanceY = 0
        isMove = false
    })

    // 监听tap事件
    itcast.tap(childBox,function(e){
        // 当前点击的li
        var li = e.target.parentNode
        
        // 获取到所有li，去掉样式
        var lis = childBox.querySelectorAll('li')
        for (var i = 0;i < lis.length ;i++){
            lis[i].className = ' '
            lis[i].index = i
        }

        // 给当前点击的添加样式
        li.className = "now"

        // 让当前点击的li，在滑动区间内，置于顶部
        /*需要知道  将要定位的位子*/
        var translateY = -li.index * 50
        if (translateY < minY){
            currY = minY
        } else {
            currY = translateY
        }

        addTransition()
        setTransitionY(currY)
    })
}

function rightSwipe(){
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y', // 滚动方向 x 横向 y 纵向
        swipeDistanch:100
    })
}