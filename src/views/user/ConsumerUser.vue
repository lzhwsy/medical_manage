<template>
  <div class="page-box">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>消费者用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="8">
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
        </el-col>
        <el-col :span="4">
          <el-button @click="dialog" >添加用户</el-button>
        </el-col>
      </el-row>

      <!--    表单-->
      <consumer-user-table :ConsumerUser="ConsumerUser"></consumer-user-table>

      <div class="fenye">
        <el-pagination
          v-model:currentPage="queryInfo.pageNum"
          v-model:page-size="queryInfo.pageSize"
          :page-sizes="[1, 2, 5, 10]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="hzandleCurrentChange"
      /></div>
    </el-card>
<!--    添加用户-->
    <user-dialog ref="ConsumerDialog"></user-dialog>

  </div>
</template>

<script>
import ConsumerUserTable from "@/views/user/table/ConsumerUserTable";
import UserDialog from "@/views/user/dialog/AddUserDialog";

import BreadCrumb from "@/components/content/common/BreadCrumb";
import {ConsumerUser} from "@/network/home";

export default {
  name: "ConsumerUser",
  components: {
    BreadCrumb,
    ConsumerUserTable,
    UserDialog
  },
  data() {
    return {
      queryInfo:{
        query:'',
        pageNum:1,//当前页码
        pageSize:5 //每页条数
      },
      ConsumerUser: [],
      total:0,
    }
  },
  created() {
    this.getConsumerUser()
  },
  methods: {
    getConsumerUser() {
      ConsumerUser(this.queryInfo).then(res => {
        this.ConsumerUser = res.users
        this.total = res.total
        console.log(this.ConsumerUser)
      })
    },
    //每页多少条数据
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getConsumerUser()
    },
    // 监听页码值改变
    hzandleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getConsumerUser()
    },
    dialog(){
        this.$refs.ConsumerDialog.dialogVisible =  true
    }
  }
}
</script>
<style scoped>

</style>
