$(function() {
    let form = layui.form 
    form.verify({
        newPwd : function(value) {
            let oldPwd = $('[name = oldPwd]')
            console.log(oldPwd,value);
            if (oldPwd === value) {  
                return '新旧密码不能相同'
            }
        },
         reNewPwd : function(value) {
            let newPwd = $('[name = newPwd]').val()
            if (newPwd !== value) {
                return '两次输入密码不一致'
            }
         }
    })
})