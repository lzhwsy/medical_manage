<template>
  <div class="register">
    <div class="box">
      <div class="headText">注册界面</div>
      <div class="headImg">
        <img src="~assets/img/register.png" alt="">
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="注册账号" prop="username">
          <el-input class="input" v-model="ruleForm.username" prefix-icon="avatar"></el-input>
        </el-form-item>
        <el-form-item label="注册密码" prop="pass">
          <el-input class="input" type="password" v-model="ruleForm.pass" autocomplete="off"  prefix-icon="lock"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input class="input" type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="lock"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input class="input" v-model="ruleForm.email" prefix-icon="message"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input class="input" v-model="ruleForm.phone" prefix-icon="iphone"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="profession">
          <el-select v-model="ruleForm.profession" placeholder="请输入您的职业">
            <el-option label="医生" value="doctor"/>
            <el-option label="普通用户" value="consumer"/>
          </el-select>
        </el-form-item>
        <div class="buttonControl">
          <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {RegisterRequest} from "@/network/login";

export default {
  name: "register",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
        email: '',
        phone: '',
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
          {required: true, message: '请输入您的职业', trigger: 'change',
          },
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.isRegister = !this.isRegister
      this.$refs[formName].validate((valid) => {
        if (valid) {
          RegisterRequest(this.ruleForm).then(res => {
            if (res.flag) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg);
            }
          })
          setTimeout(() => {
            this.$router.replace({name: 'login'})
          }, 1000)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.isReset = !this.isReset
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style lang="less" scoped>
.register {
  height: 100%;
  background: rgb(78, 187, 69);
  background: linear-gradient(9deg, rgba(78, 187, 69, 1) 0%, rgba(33, 209, 210, 1) 67%, rgba(0, 212, 255, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  position: relative;
  width: 500px;
  height: 700px;
  background: rgb(190, 190, 190);
  background: linear-gradient(9deg, rgba(190, 190, 190, 1) 0%, rgba(255, 255, 255, 1) 54%, rgba(180, 175, 175, 1) 100%);
  border-radius: 50px;
}

.headImg {
  position: relative;
  left: -30px;
  top: -30px;
  width: 150px;
  height: 150px;
  background-color: darkseagreen;
  border-radius: 100%;
  padding: 10px;
  box-shadow: 0 0 20px olivedrab;
}

.headImg img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.buttonControl {
  text-align: center;
}

.input {
  width: 85%;
}

.headText {
  position: absolute;
  width: 250px;
  text-align: center;
  top: 50px;
  right: 100px;
  font-weight: bold;
  font-size: 45px;
  background: -webkit-linear-gradient(#47d1c1, #2dbafd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 98px;
  box-shadow: 0 0 35px cornflowerblue;
}

</style>
