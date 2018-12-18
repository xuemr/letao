
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total/info.size),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        currentPage = page;
                        render();
                        
                    }
                });
            }

        })
    }


    
    $('#secondBtn').on('click',function(){
        $('#secondModal').modal('show')

        //显示模态框，就立刻发送ajax请求，请求一级分类得全部数据，渲染下拉列表
        // 通过 page：1 pagesize：100 获取数据，摸一获取全部数据得接口
        $.ajax({
            type:'get',
            dataType:'json',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
                var htmlStr = template('dropTpl',info);
                $('.dropdown-menu').html(htmlStr);
                
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text();
        $('#dropText').text(txt);
        var id = $(this).data('id');
        $('[name="categoryId"]').val(id);
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
       
    })
    //调用fileupload方法完成文件上传初始化
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          var result = data.result;
          var picUrl = result.picAddr;//图片路径

          $('#imgBox img').attr('src',picUrl);
          $('[name="brandLogo"]').val(picUrl);
          $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
  })

  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [''],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          },  
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          },  
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择图片'
          },  
        }
      }
    }
  
  });
  
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
            console.log(info);
            if(info.success){
                $('#secondModal').modal('hide');
               currentPage = 1;
               render();
               $("#form").data('bootstrapValidator').resetForm(true);
               //需手动重置
               $('#dropText').text("请选择一级分类");
               $('#imgBox img').attr('src',"./images/none.png")
            }

            
            
        }
    })
});

})