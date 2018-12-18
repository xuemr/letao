
$(function () {
    var currentPage = 1;
    var pageSize = 2;
    render();
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            dataType: 'json',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template('proTpl', info);
                $('tbody').html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total/info.size),//总页数
                    onPageClicked: function (b, a, e, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        currentPage = page;
                        render();

                    }
                });
            }
        })
    }

//2.点击添加商品，显示添加模态框

})