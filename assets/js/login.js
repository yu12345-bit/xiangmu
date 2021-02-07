$(function() {
    $('#gotoRegi').click(function() {
     $('.regiBox').show()
     $(".loginBox").hide()
    })
    $('#gotoLogin').click(function() {
        $('.regiBox').hide()
        $('.loginBox').show()
    })
   let  form = layui.form;
    form.verify({
     //我们既支持上述函数式的方式，也支持下述数组的形式
     //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
     pass: [
       /^[\S]{6,12}$/
       ,'密码必须6到12位，且不能出现空格'
     ],
     repass : function(value,item) {
     //   console.log(value,item);
      let pwd =$('.regiBox [name=password]').val()
      console.log(value,pwd);
      if (value !==pwd) {
             return '两次密码不能一致'
      }
     }
   });  
   $('.regiBox form').on('submit',function(e) {
       e.preventDefault()
     //   收集表单的数据
       let data =$(this).serialize()
       console.log(data);
     //   发送ajax请求
      axios.post('/api/reguser',data).then((res)=> {
          console.log(res);
         //  实现弹框 
         if (res.data.status !== 0) {
             // 注册失败
             return layer.msg(res.data.message)
         }
         // 注册成功
         layer.msg('注册成功，请登录')
         // 展示登陆页面==》把去登陆的按钮的click触发一下
         $('#gotoLogin').click()
      })
   })
   $('.loginBox form').on('submit',function(e) {
     e.preventDefault()
   //   收集表单的数据
     let data =$(this).serialize()
     // console.log(data);
   //   发送ajax请求 
    axios.post('/api/login',data).then((res)=> {
        // console.log(res);
        // console.log(res.data);
       //  实现弹框 
       if (res.data.status !== 0) {
           // 登陆失败
           return layer.msg(res.data.message)
       }
     //   服务器需要把响应回来的token信息随身携带 方便后期使用==》使用本地存储技术
         localStorage.setItem('token',res.data.token)
       // 登陆成功
     //   弹框提示
     //   layer.msg('登陆成功')
     //    跳转页面
       layer.msg('登陆成功',function() {
         location.href = '/home/index.html'
       })
    })
 })
 })