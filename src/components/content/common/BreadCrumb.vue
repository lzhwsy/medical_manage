<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>医生用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
name: "Breadcrumb"
}
</script>

<style scoped>

</style>
