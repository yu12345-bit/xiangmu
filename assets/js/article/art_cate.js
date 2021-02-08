


 let form = layui.form
function getArtCate() {
    axios.get('/my/article/cates').then((res)=> {
        console.log(res);
        let htmlStr = template('trTpl',res.data)
        $('tbody').html(htmlStr)
    })
}
getArtCate() 
let index
$('#btn').click(function() {
    index = layer.open({
        type : 1,
        title : '添加文章分类',
        area : "500px",
        content: $("#addFormTpl").html()
      });
      //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。   
})
$("body").on('submit','form',function(e) {
    e.preventDefault()
   let data = $(this).serialize()
   console.log(data);

   axios.post('/my/article/addcates',data).then((res)=> {
       console.log(res);
       if (res.data.status !== 0) {
         return layer.msg('no')
       }
       layer.msg('yes')
       layer.close(index)
       getArtCate() 
   })
})
let indexe
$('tbody').on('click','.editBtn',function() {
    let id = $(this).attr('data-id')
    console.log(id);
    axios.get('/my/article/cates/' + id).then((res)=> {
    console.log(res);
     form.val('editForm',res.data.data)
    })

    indexe = layer.open({
        type : 1,
        title : '添加文章分类',
        area : "500px",
        content: $("#editFormTpl").html()
      });
      //拿到的index是一个重要的凭据，它是诸如layer.close(index)等方法的必传参数。   
})
