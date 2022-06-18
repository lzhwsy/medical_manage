<template>
    <div class="mt-4">
      <el-input placeholder="Please input"
                class="input-with-select"
                v-model="queryInfo.query"
                clearable
                @clear="getConsumerUser"
      >
        <template #append><el-button icon="Search" @click="getConsumerUser"></el-button>
        </template>
      </el-input>
    </div>
</template>

<script>
export default {
  name: "Input",
  props:{
    queryInfo:{
      query:'',
      pageNum:'',//当前页码
      pageSize:''//每页条数
    },
  },
  methods:{
    getConsumerUser(){
      this.$emit('getConsumerUser')
    }
  }

}
</script>

<style scoped>

</style>
