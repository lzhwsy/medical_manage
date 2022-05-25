<template>
  <div>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>医生用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="mt-4">
            <el-input placeholder="Please input"
                      class="input-with-select"
                      v-model="queryInfo.query"
                      clearable
                      @clear="getDoctorUser"
            >
              <template #append>
                <el-button icon="Search" @click="getDoctorUser"></el-button>
              </template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button @click="DoctorDialog">添加用户</el-button>
        </el-col>
      </el-row>

      <!--    表单-->
      <doctor-user-table :DoctorUser="DoctorUser"></doctor-user-table>

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
        />
      </div>
<!--      //对话框-->
      <user-dialog ref="DoctorDialog"></user-dialog>
    </el-card>
  </div>
</template>

<script>
import DoctorUserTable from "@/views/user/table/DoctorUserTable";
import UserDialog from "@/views/user/dialog/AddUserDialog";
import BreadCrumb from "@/components/content/common/BreadCrumb";
import {DoctorUser} from "@/network/home";

export default {
  name: "DoctorUser",
  components: {
    BreadCrumb,
    DoctorUserTable,
    UserDialog
  },
  data() {
    return {
      queryInfo: {
        query:'',
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
    hzandleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getDoctorUser()
    },
    DoctorDialog(){
      this.$refs.DoctorDialog.dialogVisible = true
    },
  },

}

</script>

<style scoped>

</style>
