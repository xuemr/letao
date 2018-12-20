

$(function(){
    render();
      /*
   以下三句话, 放在控制台执行, 专门用于添加假数据
      var arr = [ "耐克", "阿迪", "匡威", "新百伦" ];
      var jsonStr = JSON.stringify( arr );
      localStorage.setItem("search_list", jsonStr)
  * */

  // 由于整个页面, 要进行大量的历史记录存储操作, 约定一个键名: search_list
        function getHistory(){
            var jsonStr = localStorage.getItem('search_list') || '[]';
            var arr = JSON.parse(jsonStr); //转成数组
            return arr;
        }
        function render(){
            var arr = getHistory();
            var htmlStr = template('searchTpl',{arr:arr});
            $('.lt_history').html(htmlStr);
        }

    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm( "你确认要清空历史记录吗?", "温馨提示", ["取消", "确认"],function(e){
            console.log(e);
            if(e.index === 1){
                localStorage.removeItem("search_list");
                render();
            }            
        })
    })

    $('.lt_history').on('click','.btn_delete',function(){

        var that = this
        mui.confirm("你确认要删除历史记录吗?", "温馨提示", ["取消", "确认"],function(e){
            console.log(e);
            if(e.index === 1){
                var index = $(that).data('index')
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }
            
        })
    })


    // 添加功能

    $('.search_btn').on('click',function(){
        var key = $('.search_input').val().trim();
        if(key == ''){
            mui.toast('请输入搜索关键字');
            return;
        }
        var arr = getHistory();
        var index = arr.indexOf(key);
        console.log(index);
        if( index !== -1){
            //重复项
            arr.splice( index , 1 );
        }
        if(arr.length >= 5){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
        render();

        $('.search_input').val('');
        
    })
})