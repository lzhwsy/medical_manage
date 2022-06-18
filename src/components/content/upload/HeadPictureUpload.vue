<template>
  <el-upload
      class="avatar-uploader"
      :action="uploadURL"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers = "headerObj"
      :data = "avatarForm "
  >
    <img v-if="ImgPath" :src="ImgPath" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script>
export default {
  name: "HeadPictureUpload",
  props:{
    picture:{
      type:String,
      default:''
    },
    Id:{
      type:String,
      default:0
    }
  },
  created() {
    this.ImgPath = this.picture
    this.memberId = this.Id
  },
  mounted() {
    this.userRole = window.sessionStorage.getItem('user')
    this.userRoleId = window.sessionStorage.getItem('userId')
    this.avatarForm = {
      userRole: this.userRole,//角色
      userRoleId:this.userRoleId, // 角色id
      memberId:this.memberId
    }
  },
  data() {
    return {
      uploadURL: 'http://172.18.1.114:5000/upload/touXiang' ,
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      ImgPath:'',
      userRole:'',
      userRoleId:'',
      memberId:0,
      avatarForm:{}
    }
  },
  methods: {
    //上传校验
    beforeAvatarUpload(rawFile) {
      if (rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/jpeg') {
        this.$message.error('上传失败，图片必须为png，jpg,jpeg格式')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        this.$message.error('上传失败，图片大小不能超过2MB')
        return false
      }
      return true
    },
    // 图片上传成功
    handleAvatarSuccess(response) {
      this.ImgPath = response.url
      if(response.flag){
        this.$message.success(response.msg)
      }else{
        this.$message.error(response.msg)
      }
    }
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}


</style>
