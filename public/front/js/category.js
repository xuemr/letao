

$(function () {
    //一进入页面，发送ajax请求，请求左侧一级分类得数据，完成渲染

    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('leftTpl', info);
            $('.lt_cagetory_left ul').html(htmlStr);
            render(info.rows[0].id)
        }
    });

    $('.lt_cagetory_left ul').on('click', 'a', function () {
        // alert(1);
        $('.lt_cagetory_left ul a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('id');
        render(id);
    })



    function render(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template('rightTpl', info);
                $('.lt_cagetory_right').html(htmlStr)

            }
        })
    }
})