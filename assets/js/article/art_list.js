$(function() {
    const query= {
         pagenum : 1, 
         pagesize : 2,
         cate_id: '',
         state: '',
    }
    template.defaults.imports.formatTime = function(time) {
        return 'hh'
    }
    axios.get('/my/article/list', {
        params : query
    }).then((res)=> {
        console.log(res);
        let htmlStr =  template('trTpl',res.data)
        $('#tb').html(htmlStr)
        renderPage(res.data.total)
    })
})  
function renderPage(total) {
    var laypage = layui.laypage;
  
    //执行一个laypage实例
    laypage.render({
      elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: total //数据总数，从服务端得到
    });
  }
