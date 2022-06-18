<template>
    <div>
      <bread-crumb>
        <template v-slot:one>权限管理</template>
        <template v-slot:two>角色列表</template>
      </bread-crumb>

      <el-card>
          <el-button type="primary" class="add-button" @click="AddRole">添加角色</el-button>
        <el-table :data="roleList" border style="width: 100%" stripe>
          <el-table-column type="expand">
            <template v-slot="scope">
              {{scope.row}}
            </template>
          </el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="role_name" label="权限角色" width="260" />
          <el-table-column prop="role_desc" label="角色描述" width="260" />
          <el-table-column label="操作" width="300">
            <template v-slot="scope">
              <el-button-group class="ml-4">
                <el-tooltip class="box-item" effect="dark" content="编辑信息" placement="top">
                  <el-button type="primary" icon="Edit" @click="ShowEdit(scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="分配角色" placement="top">
                  <el-button type="warning" icon="Share"></el-button>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="删除信息" placement="top">
                  <el-button type="danger" icon="Delete" @click="deleteRole(scope.row.role_id)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <power-dialog ref="PowerDialog" @RoleAdd="getRightList"></power-dialog>
      <edit-power-dialog ref="EditPowerDialog" @EditDialog="getRightList"></edit-power-dialog>
    </div>
</template>

<script>
import BreadCrumb from "@/components/content/common/BreadCrumb";

import PowerDialog from "@/views/power/dialog/PowerDialog";
import EditPowerDialog from "@/views/power/dialog/EditPowerDialog";

import {RightsList} from "@/network/power";
import {DeleteRole} from "@/network/power";

export default {
name: "Roles",
  components:{
    BreadCrumb,
    PowerDialog,
    EditPowerDialog
  },
  data(){
    return{
      roleList:[]
    }
  },
  created() {
    this.getRightList()
  },
  methods:{
    getRightList(){
      RightsList().then(res=>{
        console.log(res)
        this.roleList = res.Roles
      })
    },
    AddRole(){
      this.$refs.PowerDialog.dialogVisible = true
    },
    ShowEdit(item){
      this.$refs.EditPowerDialog.RolesEdit = item
      this.$refs.EditPowerDialog.EditDialogVisible = true
    },
    deleteRole(id) {
      ElMessageBox.confirm(
          '您确定要删除此用户？ 此操作不可逆转',
          '警告',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          },
      ) .then(() => {
        DeleteRole(id)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        setTimeout(()=>{
          this.getRightList()
        },1000)
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
.add-button{
  margin-bottom: 25px;
}
.ml-4{
  display: flex;
  justify-content: space-evenly;
}
</style>
