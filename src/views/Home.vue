<template>



</template>

<script>
export default {

  name: "Home",
  methods: {
    out() {
      window.sessionStorage.clear()
      this.$router.replace({name: 'login'})
    }
  }
}
</script>

<style scoped lang="less">


</style>
