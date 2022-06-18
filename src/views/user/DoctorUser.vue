<template>
  <div>
    <bread-crumb>
      <template v-slot:one>用户管理</template>
      <template v-slot:two>医生用户管理</template>
    </bread-crumb>
    <el-card class="box-card">
      <el-row :gutter="10">
<!--        查询-->
        <el-col :span="8">
          <doctor-input :queryInfo="queryInfo" @getDoctorUser="getDoctorUser"></doctor-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="DoctorDialog">添加用户</el-button>
        </el-col>
      </el-row>
      <!--      //对话框-->
      <user-dialog ref="DoctorDialog" @Add="getDoctorUser"></user-dialog>

      <!--表单-->
      <doctor-user-table :DoctorUser="DoctorUser" @getDoctorUser="getDoctorUser"></doctor-user-table>

      <!--分页-->
        <user-pagination :queryInfo="queryInfo"
                           :total="total"
                           @handleSizeChange="handleSizeChange"
                           @handleCurrentChange="handleCurrentChange"></user-pagination>

    </el-card>
  </div>
</template>

<script>
import DoctorUserTable from "@/views/user/table/DoctorUserTable";
import UserDialog from "@/views/user/dialog/AddUserDialog";

import BreadCrumb from "@/components/content/common/BreadCrumb";
import DoctorInput from "@/components/content/input/DoctorInput";
import UserPagination from "@/components/content/pagination/UserPagination";

import {DoctorUser} from "@/network/user";

export default {
  name: "DoctorUser",
  components: {
    BreadCrumb,
    DoctorUserTable,
    UserDialog,
    DoctorInput,
    UserPagination
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,//当前页码
        pageSize: 5 //每页条数
      },
      DoctorUser: [],
      total: 0,
    }
  },
  created() {
    this.getDoctorUser()
  },
  methods: {
    getDoctorUser() {
      DoctorUser(this.queryInfo).then(res => {
        this.DoctorUser = res.users
        this.total = res.total
        console.log(this.DoctorUser)
      })
    },
    //每页多少条数据
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getDoctorUser()
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getDoctorUser()
    },
    DoctorDialog() {
      this.$refs.DoctorDialog.dialogVisible = true
    },
  },

}

</script>

<style scoped>

</style>
