<template>
  <el-dialog v-model="EditDialogVisible" title="修改用户" width="40%" draggable @close="EditClose">
    <el-form ref="UserDetail" :model="UserDetail" :rules="rules">
      <el-form-item>
        <el-form-item label="用户名" prop="email">
          <el-input class="input" v-model="UserDetail.username" prefix-icon="avatar" disabled></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input class="input" v-model="UserDetail.email" prefix-icon="message"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input class="input" v-model="UserDetail.phone" prefix-icon="iphone"></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="profession">
        <el-select v-model="UserDetail.profession" placeholder="请输入您的职业">
          <el-option label="医生" value="doctor"/>
          <el-option label="普通用户" value="consumer"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Edit('UserDetail')">确认修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {EditDialog} from "@/network/user";

export default {
  name: "EditDialog",
  data() {
    return {
      EditDialogVisible: false,
      UserDetail: {
        user_id: '',
        username: '',
        email: '',
        phone: '',
        create_time: '',
        profession: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, message: '账号至少有三位', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        phone: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change'}
        ],
        profession: [
          {
            required: true, message: '请输入您的职业', trigger: 'change',
          },
        ],
      }
    }
  },

  methods: {
    Edit(item) {
      this.$refs[item].validate((valid) => {
        if (valid) {
          EditDialog(this.UserDetail).then(res => {
            if (res.flag) {
              this.$message.success('修改成功')
            } else {
              this.$message.error('修改失败');
            }
            this.EditDialogVisible = false
          })
        } else {
          this.$message.error('格式错误!!');
          this.EditDialogVisible = false
          return false;
        }
      });
    },
    EditClose(){
      this.$refs.UserDetail.resetFields()
    }
  },

}
</script>

<style scoped>

</style>
