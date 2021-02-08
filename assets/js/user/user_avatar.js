$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)




$('#chooseBtn').click(function() {
  $('#file').click()
})
 $('#file').on('change',function() {
    //  console.log(this.files);
    let file = this.files[0]
    if (!file) {
        return
    }
    let newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
 })

//  点击实现更换头像 
 $('#sureBtn').click(function() {
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
    })
	.toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    axios.post('/my/update/avatar','avatar' + encodeURIComponent(dataURL)).then((res)=> {
        console.log(res);
        if (res.data.status!== 0) {
            return layer.msg('no')
        }
  layer.msg('ok')
  window.parent.getUserInfo()
    })
 })
})