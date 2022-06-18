<template>
  <el-dialog v-model="EditDialogVisible" title="修改用户" width="40%" draggable @close="EditClose">
    <el-form ref="RolesEdit" :model="RolesEdit" :rules="rules" >
      <el-form-item label="权限角色" prop="role_name">
        <el-input class="input" v-model="RolesEdit.role_name" prefix-icon="avatar" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="role_desc">
        <el-input class="input" v-model="RolesEdit.role_desc" prefix-icon="ChatSquare"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Edit('RolesEdit')">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {EditDialog} from "@/network/user";

export default {
  name: "EditPowerDialog",
  data() {
    return {
      EditDialogVisible: false,
      RolesEdit: {
        role_name: '',
        role_desc: '',
      },
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
    Edit(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          EditDialog(this.RolesEdit).then(res => {
            if (res.flag) {
              this.$message.success('修改成功')
              this.$emit('EditDialog')
            } else {
              this.$message.error('修改失败');
            }
          })
        } else {
          this.$message.error('格式错误!!');
          return false;
        }
      });
    },
    EditClose(){
      this.$refs.RolesEdit.resetFields()
    }
  },

}
</script>

<style scoped>

</style>

