// $(function(){
//     NProgress.start()   //开启进度条
//     setTimeout(function(){
//         NProgress.done()        //结束进度条
//     },2000)
// })

// ajax全局事件
// .ajaxComplete() 当每个ajax完成时调用  （不管成功或者失败）
// .ajaxSuccess() 当ajax返回成功时调用
// .ajaxError() 当ajax返回失败时调用
// .ajaxSend() 当ajax发送前调用


// .ajaxStart()  当第一个ajax发送时调用
// .ajaxStop() 当全部的ajax请求完成时调用
NProgress.start();


setTimeout(function(){
    NProgress.done()
},5000)

$(document).ajaxStart(function(){
    NProgress.start() 
});

$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done()
    },1000)
});



//等待页面dom结构的加载后执行
$(function(){
    $('.lt_aside .category').on('click',function(){
        $('.lt_aside .nav .child').stop().slideToggle();
    })

//功能2：左侧菜单切换效果
$('.icon_left').on('click',function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
})

//功能3：右侧弹出效果
$('.icon_right').on('click',function(){
    $('#myModal').modal('show');
})

//退出两种方式
//1. 发送ajax让后台，销毁当前用户的登录状态，实现退出
//2. 清除浏览器缓存，将cookie清空，本地存储的sessionid也没了
//给退出按钮，添加点击事件，需要在退出时，销毁当前用户的登录状态
$('.myBtn').on('click',function(){
    // console.log(1);
    
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){
                //销毁登陆状态成功
                location.href = "login.html";
            }
            
        }
    })
})
})