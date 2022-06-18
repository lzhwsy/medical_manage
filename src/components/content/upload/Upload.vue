<template>
    <el-upload
        class="upload-demo"
        list-type="picture-card"
        :action="uploadURL"
        :file-list="fileList"
        :headers = "headerObj"
        :on-success="handleSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
        multiple
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <el-dialog v-model="previewVisible" title="图片预览">
<!--      <img :src="previewPath"  alt="">-->
<!--      图片添加token校验-->
      <authImg class="previewImg" :auth-src="previewPath" :key="previewPath"></authImg>
    </el-dialog>
</template>

<script>
import authImg from "@/components/content/upload/authImg";

export default {
name: "Upload",
  components:{
    authImg
  },
  props:{
    pics:{
      type:Array,
      default:[]
    }
  },
  data(){
  return{
    dialogImageUrl:'',
    dialogVisible:false,
    fileList:[],
    uploadURL:'http://172.18.1.114:5000/upload',
    headerObj:{
      Authorization:window.sessionStorage.getItem('token')
    },
    content:'',
    images:[],
    previewPath:'',
    previewVisible:false,
  }
  },
  methods:{
  //移除图片
    handleRemove(file, fileList){
      const filePath = file.response.tmp_path
      let newPics =this.pics.filter(n=>{
        return n !== filePath
      })
      this.$emit('handleRemove',newPics)
    },
    //上传校验
    beforeAvatarUpload(rawFile) {
      if(rawFile.type !== 'image/png' && rawFile.type !=='image/jpg' && rawFile.type !=='image/jpeg'){
        this.$message.error('上传失败，图片必须为png，jpg,jpeg格式')
        return false
      } else if(rawFile.size /1024 / 1024 >2){
        this.$message.error('上传失败，图片大小不能超过2MB')
        return false
      }
      return true
    },
    // 图片预览
    handlePreview(file){
      console.log(file)
      const previewPath = file.response.url
      this.previewPath = previewPath
      console.log(this.previewPath)
      this.previewVisible = true

    },
    // 图片上传成功
    handleSuccess(response){
      this.$emit('handleSuccess',response)
      console.log(response)
    }
  }
}
</script>

<style scoped>
.upload-demo{
  text-align: center;
}
.el-dialog__body{
  text-align: center;
}
.previewImg{
  position: relative;
  text-align: center;
}
</style>
