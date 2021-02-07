function getUserInfo() {
    axios.get ('/my/userinfo', {
        headers : {
            Authorization : localStorage.getItem('token')
        }
    }).then((res)=> {
        console.log(res);
        if (res.data.status !== 0) {
            return layer.msg('获取用户信息失败')
        }
        avatarAndName (res.data)
    })
}
getUserInfo() 
 function avatarAndName (res) {
     console.log(res);
     let name = res.data.nickname || res.data.username
     console.log(name);
     //修改名字
     $('#welcome').text('欢迎' + name)
     //处理头像
     if (res.data.user_pic) {
         $('.layui-nav-img').attr('src',res.data.user_pic).show()
         $('text_avatar').hide()
     } else {
         $('.layui-nav-img').hide()
         $('text_avatar').text(name[0].toUpperCase()).show()
     }
 }
 $('#outBtn').click(function() {
    layer.confirm('确认退出么', {icon: 3, title:'提示'}, function(index){
        //do something
         localStorage.removeItem('token')
         location.href = '/home/login.html'
        layer.close(index);
      });
 })