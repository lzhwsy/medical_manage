<template>
  <el-table :data="ConsumerUser" height="500" style="width: 100%" >
    <el-table-column type="index" width="50"/>
    <el-table-column prop="username" label="姓名" width="120"/>
    <el-table-column prop="email" label="邮箱" width="180"/>
    <el-table-column prop="phone" label="联系方式" width="120"/>
    <el-table-column prop="profession" label="职业" width="120"/>
    <el-table-column prop="create_time" label="创建时间" width="180"/>
    <!--      //展示当前行的所有数据-->
    <!--      <el-table-column label="创建时间" width="180" >-->
    <!--        <template v-slot="scope">{{scope.row}} </template>-->
    <!--      </el-table-column>-->
    <el-table-column label="操作" width="200">
      <template v-slot="scope">
        <el-button-group class="ml-4">
          <el-tooltip class="box-item" effect="dark" content="编辑信息" placement="top">
            <el-button type="primary" icon="Edit" @click="ShowEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top">
            <el-button type="warning" icon="Share"></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除信息" placement="top">
            <el-button type="danger" icon="Delete" @click="deleteUser(scope.row.user_id)"></el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
  <edit-dialog ref="ConsumerEdit"></edit-dialog>

</template>

<script>
import EditDialog from "@/views/user/dialog/EditDialog";
import {DeleteUser} from "@/network/home";
export default {
  name: "ConsumerUserTable",
  props:{
    ConsumerUser:{
      type:Object,
      default:{}
    }
  },
  components:{
    EditDialog
  },
  methods:{
    ShowEdit(item){
      this.$refs.ConsumerEdit.UserDetail = item
      this.$refs.ConsumerEdit.EditDialogVisible = true
    },
    deleteUser(id) {
      ElMessageBox.confirm(
          '您确定要删除此用户？ 此操作不可逆转',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ) .then(() => {
        DeleteUser(id)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已经取消删除',
            })
          })
    }
  }
}
</script>

<style scoped>

</style>
