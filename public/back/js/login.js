$(function () {
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须2到6位'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },

                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须6到12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }


    })


    // 注册表单校验成功事件
    $('#form').on('success.form.bv', function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        //通过ajax提交
        $.ajax({
            url: '/employee/employeeLogin',
            type:'post',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                // 参数2: 校验状态 NOT_VALIDATED未校验, VALIDATING校验中, INVALID失败 or VALID成功

                if(info.success){
                    location.href = "index.html"
                }
                if(info.error == '1000'){
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(info.error == '1001'){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    
                }
                
            }
        })
    })

    //表单重置功能
    // $('#form').data('bootstrapValidator');//创建插件实例
    // resetForm()   //没有传参或者传false，只会重置校验状态
    // resetForm(true) 内容和校验状态都重置
    $('[type = "reset"]').click(function(){
        $('#form').data('bootstrapValidator').resetForm();
    })
})