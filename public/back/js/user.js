

$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var currentId;
    var isDelete;
    render();
    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template('tpl', info)
                $('tbody').html(htmlStr);

                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / info.size),//总页数
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                })
                // $('#paginator').bootstrapPaginator({
                //     // 版本号
                //     bootstrapMajorVersion: 3,
                //     // 当前页
                //     currentPage: info.page,
                //     // 总页数
                //     totalPages: Math.ceil( info.total / info.size ),
                //     // 添加页码点击事件
                //     onPageClicked: function( a, b, c, page ) {
                //       console.log( page );
                //       // 更新当前页
                //       currentPage = page;
                //       // 重新渲染
                //       render();
                //     }
                //   })
            }
        })
    }

    $('tbody').on('click','.btn',function(){
        //点击显示模态框
        $('#disModal').modal('show');
        //获取存储的id
        currentId = $(this).parent().data('id');

        //启动状态
        isDelete = $(this).hasClass('btn-danger')?0:1;
    });
    $('#disBtn').on('click',function(){
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            dataType:'json',
            data:{
                id:currentId,
                isDelete:isDelete
            },
            success:function(info){
                console.log(info);
                if(info.success){
                    $('#disModal').modal('hide');
                    render();
                }
                
            }
        })
    })
})