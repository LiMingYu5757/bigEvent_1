$(function () {
    // 点击‘去注册账号’事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击‘去登录’事件
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    // 从 layui 中获取 layer 对象
    var layer = layui.layer

    // 自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

        // 监听注册表单提交事件
        $('#form_reg').on('submit',function(e){
            // 阻止表单默认提交行为
            e.preventDefault()
            // 获取表单内容
            let data = $(this).serialize()
            // 发起请求
            $.ajax({
                type:'POST',
                url:'/api/reguser',
                data,
                success(res){
                    if(res.status !== 0) return layer.msg(res.message)  
                    // console.log(res);
                    layer.msg(res.message)
                    // 模拟点击去登陆
                    $('#link_login').click()
                }
            })
        })

        // 监听登录表单提交事件
        $('#form_login').submit(function(e){
            e.preventDefault()

            let data = $(this).serialize()
            $.ajax({
                method:'POST',
                url:'/api/login',
                data,
                success(res){
                    if (res.status !== 0) return layer.msg('登陆失败！')
                    layer.msg(res.message)
                    localStorage.setItem('token',res.token)
                    // 跳转到index页面
                    location.href = '/index.html'
                }
            })
        })
})