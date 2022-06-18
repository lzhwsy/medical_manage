<template>
    <div class="mt-4">
      <el-input placeholder="Please input"
                class="input-with-select"
                v-model="queryInfo.query"
                clearable
                @clear="getDoctorUser"
      >
        <template #append><el-button icon="Search" @click="getDoctorUser"></el-button>
        </template>
      </el-input>
    </div>
</template>

<script>
export default {
  name: "DoctorInput",
  props:{
    queryInfo:{
      query:'',
      pageNum:'',//当前页码
      pageSize:'' //每页条数
    },
  },
  methods:{
    getDoctorUser(){
      this.$emit('getDoctorUser')
    }
  }
}
</script>

<style scoped>

</style>
