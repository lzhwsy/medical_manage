<template>
    <el-pagination
        v-model:currentPage="queryInfo.pageNum"
        v-model:page-size="queryInfo.pageSize"
        :page-sizes="[2, 3, 5, 6]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
    />
</template>

<script>
export default {
  name: "DoctorPagination",
  props:{
    queryInfo: {
      type:Object,
      default:{}
    },
    total:{
      type:Number,
      default:0
    }
  },
  methods:{
    handleSizeChange(newSize){
      this.$emit('handleSizeChange',newSize)
    },
    handleCurrentChange(newPage){
      this.$emit('handleCurrentChange',newPage)
    }
  }
}
</script>

<style scoped>

</style>
