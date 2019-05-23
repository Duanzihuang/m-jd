window.onload = function(){
    deleteGoods()
}

function deleteGoods(){
     /*
    * 1.点击删除按钮的时候  动画弹出删除框
    * 2.点击删除按钮的时候  删除盒子需要做一个打开盖子的动画
    * 3.点击取消按钮的时候  关闭弹出框 删除按钮动画关闭盖子
    * */

    // 获取 jd_win
    var win = document.querySelector('.jd_win')

    // 获取jd_win_box
    var box = document.querySelector('.jd_win_box')
    
    // 获取所有的删除按钮
    var deleteBtns = document.querySelectorAll('.delete_box')

    // 记录点击的哪个删除按钮
    var deleteBox = null

    for (var i = 0; i < deleteBtns.length ; i++){
        deleteBtns[i].onclick = function(){
            // 给deleteBox 赋值
            deleteBox = this

            // 让jd_win显示出来
            win.style.display = 'block'

            // 给box添加动画
            box.className = 'jd_win_box bounceInDown'

            // 找到盖子
            var deleteUp = deleteBox.querySelector('span:first-child')

            // 添加过渡
            deleteUp.style.transition = "all 1s"
            deleteUp.style.webkitTransition = "all 1s"

            // 添加旋转
            deleteUp.style.transform = 'rotate(-30deg) translateY(2px)'
            deleteUp.style.webkitTransform = 'rotate(-30deg) translateY(2px)'

            // 设置旋转原点
            deleteUp.style.webkitTransformOrigin = "0 5px"
            deleteUp.style.transformOrigin = "0 5px"
        }
    }

    // 给取消按钮添加点击事件
    var cancelBtn = document.querySelector('.cancel')
    cancelBtn.addEventListener('click',function(){
        win.style.display = 'none'

        if (deleteBox){
            // 把盖子盖回去
            var deleteUp = deleteBox.querySelector('span:first-child')
            deleteUp.style.transform = 'none';
            deleteUp.style.webkitTransform = 'none';
        }
    })
}