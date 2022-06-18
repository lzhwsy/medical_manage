<template>
  <el-dialog v-model="dialogVisible" title="添加用户" width="40%" draggable @close="CloseDialog">
    <el-form ref="AddRuleForm" :model="AddRuleForm" :rules="rules" class="demo-AddRuleForm" label-width="100px">
      <el-form-item label="注册账号" prop="username">
        <el-input class="input" v-model="AddRuleForm.username" prefix-icon="avatar"></el-input>
      </el-form-item>
      <el-form-item label="注册密码" prop="pass">
        <el-input class="input" type="password" v-model="AddRuleForm.pass" autocomplete="off"
                  prefix-icon="lock"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input class="input" type="password" v-model="AddRuleForm.checkPass" autocomplete="off"
                  prefix-icon="lock"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input class="input" v-model="AddRuleForm.email" prefix-icon="message"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input class="input" v-model="AddRuleForm.phone" prefix-icon="iphone"></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="profession">
        <el-select v-model="AddRuleForm.profession" placeholder="请输入您的职业">
          <el-option label="医生" value="doctor"/>
          <el-option label="普通用户" value="consumer"/>
        </el-select>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('AddRuleForm')">确认添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {RegisterRequest} from "@/network/login";

export default {
  name: "UserDialog",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.AddRuleForm.checkPass !== '') {
          this.$refs.AddRuleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.AddRuleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      AddRuleForm: {
        username: '',
        pass: '',
        checkPass: '',
        email: '',
        phone: '',
        profession: ''
      },
      dialogVisible:false,
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, message: '账号至少有三位', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        pass: [
          {required: true, validator: validatePass, trigger: 'blur'},
          {min: 6, message: '账号至少有6位', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          RegisterRequest(this.AddRuleForm).then(res => {
            if (res.flag) {
              this.$message.success('添加成功')
            } else {
              this.$message.error('添加失败');
            }
            this.dialogVisible = false
            this.$emit('Add')
          })
        } else {
          this.$message.error('添加失败!!');
          this.dialogVisible = false
          return false;
        }
      });

    },
    CloseDialog(){
        this.$refs.AddRuleForm.resetFields()
    }
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>


