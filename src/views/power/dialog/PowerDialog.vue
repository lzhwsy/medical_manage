<template>
  <el-dialog v-model="dialogVisible" title="添加用户" width="40%" draggable @close="CloseRoleDialog">
    <el-form ref="RolesDialog" :model="RolesDialog" :rules="rules" class="demo-RolesDialog" label-width="100px">
      <el-form-item label="权限角色" prop="role_name">
        <el-input class="input" v-model="RolesDialog.role_name" prefix-icon="avatar"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="role_desc">
        <el-input class="input" v-model="RolesDialog.role_desc" prefix-icon="ChatSquare"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('RolesDialog')">确认添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {RoleAdd} from "@/network/power";

export default {
  name: "RolesDialog",
  data() {
    return {
      RolesDialog: {
        role_name: '',
        role_desc: '',
      },
      dialogVisible: false,
      rules: {
        role_name: [
          {required: true, message: '请输入角色', trigger: 'blur'},
          {min: 1, message: '账号至少有一位', trigger: 'blur'}
        ],
        role_desc: [
          {required: true, message: '请描述角色', trigger: 'blur'},
          {min: 1, message: '账号至少有一位', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          RoleAdd(this.RolesDialog).then(res => {
            if (res.flag) {
              this.$message.success('添加成功')
              this.$emit('RoleAdd')
            } else {
              this.$message.error('添加失败，此角色已经存在');
            }
          })
        } else {
          this.$message.error('添加失败!!');
          return false;
        }
      });
    },
    CloseRoleDialog() {
      this.$refs.RolesDialog.resetFields()
    }
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>


