window.onload = function() {
  search()
}

/*滚动时候，头部搜索条的颜色渐变*/
function search() {
  /*
   * 1.在滚动屏幕的时候或者说滑动屏幕的时候  背景颜色需要变换
   * 2.在滚动或滑动到一定的距离的时候  颜色不发生改变
   * 颜色变换的程度  和  一定距离不改变  都是和滚动的距离有关系
   * */
  /*获取搜索盒子*/

  var searchBox = document.querySelector(".jd_header_box")

  /*获取轮播图盒子*/
  var bannerBox = document.querySelector(".jd_banner")

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
    searchBox.style.background = "rgba(201,21,35," + opacity + ")"
  }
}
