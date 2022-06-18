<template>
  <div class="mt-4">
    <el-input placeholder="Please input"
              class="input-with-select"
              v-model="queryInfo.query"
              clearable>
      <template #append><el-button icon="Search" @click="getMedicalAll"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "OrderProcessInput",
  props:{
    queryInfo:{
      query:'',
      pageNum:'',//当前页码
      pageSize:'' //每页条数
    },
  },
  methods:{
    getMedicalAll(){

    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
