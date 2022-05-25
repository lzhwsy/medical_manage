<template>
  <div class="header-layout">
    <img src="~assets/img/yao2.png" alt="">
    <span>医定行app药品管理系统</span>
    <el-button @click="out" type="info">退出</el-button>
  </div>
</template>

<script>
export default {
name: "HomeHeader",
  methods:{
    out() {
      window.sessionStorage.clear()
      this.$router.replace({name: 'login'})
    }
  }
}
</script>

<style scoped>
img {
  height: 60px;
  width: 60px;
}
div {
  display: flex;
  justify-content: space-between;
}
</style>
