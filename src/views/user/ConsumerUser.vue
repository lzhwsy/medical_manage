<template>
  <div class="page-box">
    <bread-crumb>
      <template v-slot:one>用户管理</template>
      <template v-slot:two>消费者用户管理</template>
    </bread-crumb>

    <el-card class="box-card">
      <el-row :gutter="10">
        <!--搜索-->
        <el-col :span="8">
        <consumer-input :queryInfo="queryInfo" @getConsumerUser="getConsumerUser"></consumer-input>
        </el-col>
        <!--添加-->
        <el-col :span="4">
          <el-button @click="dialog" >添加用户</el-button>
        </el-col>
      </el-row>
      <!--    添加用户-->
      <user-dialog ref="ConsumerDialog" @Add="getConsumerUser"></user-dialog>
      <!--    表单-->
      <consumer-user-table :ConsumerUser="ConsumerUser"
                           @getConsumerUser="getConsumerUser"></consumer-user-table>

      <!--  分页-->
        <user-pagination :queryInfo="queryInfo"
                         :total="total"
                         @handleSizeChange="handleSizeChange"
                         @handleCurrentChange="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import ConsumerUserTable from "@/views/user/table/ConsumerUserTable";
import UserDialog from "@/views/user/dialog/AddUserDialog";

import BreadCrumb from "@/components/content/common/BreadCrumb";
import ConsumerInput from "@/components/content/input/ConsumerInput";
import UserPagination from "@/components/content/pagination/UserPagination";


import {ConsumerUser, userIsLoginChanged} from "@/network/user";

export default {
  name: "ConsumerUser",
  components: {
    BreadCrumb,
    ConsumerUserTable,
    UserDialog,
    ConsumerInput,
    UserPagination
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
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getConsumerUser()
    },
    dialog(){
        this.$refs.ConsumerDialog.dialogVisible =  true
    },
  }
}
</script>
<style scoped>

</style>
