<template>
  <div class="mt-4">
    <el-input placeholder="Please input"
              class="input-with-select"
              v-model="queryInfo.query"
              clearable
              @clear="getMedicalAll"
    >
      <template #append><el-button icon="Search" @click="getMedicalAll"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
name: "MedicalAllInput",
  props:{
    queryInfo:{
      query:'',
      pageNum:'',//当前页码
      pageSize:'' //每页条数
    },
  },
  methods:{
    getMedicalAll(){
      this.$emit('getMedicalAll')
    }
  }
}
</script>

<style scoped>

</style>
