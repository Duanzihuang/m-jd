window.onload = function() {
  search()
  swiper()
  downtime()
}

/*滚动时候，头部搜索条的颜色渐变*/
function search() {
  /*
   * 1.在滚动屏幕的时候或者说滑动屏幕的时候  背景颜色需要变换
   * 2.在滚动或滑动到一定的距离的时候  颜色不发生改变
   * 颜色变换的程度  和  一定距离不改变  都是和滚动的距离有关系
   * */
  /*获取搜索盒子*/

  var searchBox = document.querySelector('.jd_header_box')

  /*获取轮播图盒子*/
  var bannerBox = document.querySelector('.jd_banner')

  // 获取轮播图盒子的高度
  var height = bannerBox.offsetHeight

  // 监听滚动
  window.onscroll = function() {
    // 透明度
    var opacity = 0

    // 获取滚动出去的距离
    //  var top = document.body.scrollTop
    var top =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0

    // 滚动出去的距离大于了轮播图的高度
    if (top > height) {
      opacity = 0.85
    } else {
      opacity = (0.85 * top) / height
    }

    // 设置搜索条的透明度
    searchBox.style.background = 'rgba(201,21,35,' + opacity + ')'
  }
}

/** 轮播 */
function swiper() {
  /**
   * 1、准备工作，拿到相关元素的dom
   * 2、定时器轮播
   * 3、下面的圆点，随着图片的滚动而变化
   * 4、手动实现轮播，松开之后，根据滚动的距离决定图片显示的位置
   */

  // 1、准备工作，拿到相关元素的dom
  // 拿到轮播图容器
  var banner = document.querySelector('.jd_banner')
  // 轮播图宽度
  var width = banner.offsetWidth
  // 拿到轮播图下面的图片容器
  var imageBox = banner.querySelector('ul:first-child')
  // 拿到指示器的容器
  var pointBox = banner.querySelector('ul:last-child')
  // 拿到所有的点
  var points = pointBox.querySelectorAll('li')

  // 2、抽取公共的方法
  var addTransition = function() {
    imageBox.style.transition = 'all .2s'
    imageBox.style.webkitTransition = 'all .2s'
  }

  var clearTransition = function() {
    imageBox.style.transition = 'none'
    imageBox.style.webkitTransition = 'none'
  }

  var setTranslateX = function(x) {
    imageBox.style.transform = `translateX(${x}px)`
    imageBox.style.webkitTransform = `translateX(${x}px)`
  }

  // 3、定时器轮播
  var index = 0
  var timer = setInterval(function() {
    index++
    // 设置过渡
    addTransition()
    // 设置translateX
    setTranslateX(-index * width)
  }, 3000)

  // 4、添加过渡结束之后的处理函数
  itcast.transitonEnd(imageBox,function(){
    if (index >= 9){
      index = 1
    } else if (index <= 0){
      index = 8
    }

    clearTransition()
    setTranslateX(-index * width)

    // 设置指示器的圆点
    setPoint()
  })

  // 5、让原点跟随图片滚动而滚动
  var setPoint = function(){
    // 把所有的指示器li的className 设置为空
    points.forEach(li => {
      li.className = ' '
    })

    // 设置当前图片对应的指示器li的样式
    points[index - 1].className = 'now'
  }

  // 6、滑动轮播图
  /*开始的x坐标*/
  var startX = 0
  /*移动的时候的X的坐标*/
  var moveX = 0
  /*移动距离*/
  var distance = 0
  /*判断是否滑动过*/
  var isMove = false
  imageBox.addEventListener('touchstart',function(e){
    // 停止定时器
    clearInterval(timer)
    startX = e.touches[0].clientX
  })

  imageBox.addEventListener('touchmove',function(e){
    isMove = true
    /*在滑动的时候不断的给图片盒子做定位  来达到滑动的效果*/
    /*定位的位置  当前的图片的定位  加上 移动的距离*/

    moveX = e.touches[0].clientX
    // 移动的距离
    distance = moveX - startX
    
    // 清除过渡 & 让图片跟着移动
    clearTransition()
    setTranslateX(-index * width + distance)
  })

  //在谷歌的模拟器会出现  一个问题就是  touchend的时候可能会丢失事件
  imageBox.addEventListener('touchend',function(e){
    /*
      * 当滑动的时候不超过一定的距离的时候  吸附回去
      * 当滑动的距离超过了一定的距离的时候  图片做相应的滚动  左或右
      * 一定的距离  就是1/3的图片的宽度
    **/
    if (Math.abs(distance) > (width / 3) && isMove){ // 滑动距离超过了图片的1/3
       /*怎么判断上一张还是下一张
        * 是通过distanceX的值来判断
        * */
       if (distance > 0){ // 向右滑，想显示前一张
         index --
       } else { // 向左滑，想显示下一张
         index ++
       }
      
       // 添加过渡
       addTransition()
       // 设置定位
       setTranslateX(-index*width)
    } else { // 没有超过图片的 1/3 吸附回去
       // 添加过渡
       addTransition()
       // 设置定位
       setTranslateX(-index*width)
    }

    /*重置参数  防止第二次的时候影响计算*/
    startX = 0
    moveX = 0
    distanceX = 0
    isMove = false

    // 开启定时器
    clearInterval(timer)
    timer = setInterval(function() {
      index++
      // 设置过渡
      addTransition()
      // 设置translateX
      setTranslateX(-index * width)
    }, 3000)
  })
}

/** 倒计时 */
function downtime(){
  /*
  * 1.得到需要倒计时的时间  这是固定定死的  5 小时 04 59 59
  * 2.每隔一秒来  计算  当前的  时间  格式
  * 3.渲染在页面当中
  * */

  /*倒计时的时间*/
  var time =  3 * 60 * 60

  /*获取dom元素*/
  var skTime = document.querySelector('.sk_item')
  /*所有的span*/
  var spans = skTime.querySelectorAll('span')

  /*定时器*/
  var timer = setInterval(() => {
    time --
    if (time < 0) {
      clearInterval(timer)
      return false
    }

    /*格式化时间  得到  时  分  秒*/
    var h = Math.floor(time / 3600)
    var m = Math.floor((time % 3600) / 60)
    var s = time % 60

    /*渲染*/
    spans[0].innerHTML = Math.floor(h/10)
    spans[1].innerHTML = h%10

    spans[3].innerHTML = Math.floor(m/10)
    spans[4].innerHTML = m%10

    spans[6].innerHTML = Math.floor(s/10)
    spans[7].innerHTML = s%10

  }, 1000)
}
