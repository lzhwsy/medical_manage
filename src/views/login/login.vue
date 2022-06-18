<template>
  <div class="login">
    <div class="box">
      <div class="headImg">
        <img src="~assets/img/headImg.png" alt="">
      </div>
      <div class="headText">医疗app后台管理系统</div>
      <el-form ref="form" :model="formData" :rules="rules" label-width="150px" class="content">
        <el-form-item label="账号" prop="username">
          <el-input class="input" v-model="formData.username" prefix-icon="avatar"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="input" type="password" v-model="formData.password" prefix-icon="lock">
          </el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
          <el-button type="info" @click="resetForm('form')">重置</el-button>
          <el-button type="warning" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {LoginRequest} from 'network/login'

export default {
  name: "login",
  data() {
    return {
      formData: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, message: '账号至少有三位', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '最少6个密码', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          LoginRequest(this.formData.username, this.formData.password).then(res => {
            if (res.success) {
              this.$message.success('登录成功')
              console.log(res.user)
              this.$router.push({name: 'home'})
            } else {
              this.$message.error('登录失败，没有账号或者密码错误');
            }
            window.sessionStorage.setItem('token', res.token)
            window.sessionStorage.setItem('user',res.user.username)
            window.sessionStorage.setItem('userId',res.user.user_id)
            window.sessionStorage.setItem('userHeadImg',res.user.userImg)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push({name: 'register'})
    },
  }
}
</script>

<style scoped>
.login {
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
  height: 400px;
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

.buttons {
  display: flex;
  justify-content: space-around;
}

.input {
  width: 85%;
}

.headText {
  position: absolute;
  top: 50px;
  right: 15px;
  font-weight: bold;
  font-size: 32px;
  background: -webkit-linear-gradient(#3f5efb, #21d1cf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 98px;
  box-shadow: 0 0 20px springgreen;
  width: 350px;
  text-align: center;
}


</style>
