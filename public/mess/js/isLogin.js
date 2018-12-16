$.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
        console.log(info);
        if(info.success === true){
           console.log('当前用户已经登录');
           
        }
        if(info.error === 400){
            location.href = 'login.html'
        }
        
    }
})