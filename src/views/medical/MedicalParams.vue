<template>
  <div>
    <bread-crumb>
      <template v-slot:one>药品管理</template>
      <template v-slot:two>药品参数修改</template>
    </bread-crumb>
  </div>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";
export default {
  name: "HealthProducts",
  components:{
    BreadCrumb
  }
}
</script>

<style scoped>

</style>
