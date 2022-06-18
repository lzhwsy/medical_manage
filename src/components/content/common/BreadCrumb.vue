<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="one"></slot></el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:path1}"><slot name="two"></slot></el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:path2}"><slot name="three"></slot></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props:{
    path1:{
      type:String,
      default:''
    },
    path2:{
      type:String,
      default:''
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>

</style>
