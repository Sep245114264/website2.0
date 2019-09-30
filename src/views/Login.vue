<template>
  <div class="login-container">
    <div class="title">登录系统</div>

    <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="loginRules">
      <el-form-item prop="username">
        <el-input
          #prefix
          v-model="loginForm.username"
          placeholder="用户名"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon class="svg-container" icon="user" />
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          #prefix
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon class="svg-container" icon="password" />
        </el-input>
      </el-form-item>

      <el-button
        class="login-button"
        type="primary"
        :loading="loading"
        @click.native="handleLogin"
      >登录</el-button>
    </el-form>
    <el-button type="text" @click="handleRegister">注册</el-button>
    <el-dialog :visible.sync="visible" title="注册用户">
      <el-form ref="form" :model="registerData" label-width="80px">
        <el-form-item prop="username">
          <el-input v-model="registerData.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="registerData.password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" @click="submitRegister">注册</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const loginRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginRules,
      loginForm: {
        username: 'admin',
        password: '123',
      },
      registerData: {
        username: '',
        password: '',
      },
      visible: false,
    };
  },
  methods: {
    submitRegister() {
      this.$api.postRegister(this.registerData).then((res) => {
        console.log(res);
      });
    },
    handleRegister() {
      this.visible = true;
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        this.$store.dispatch('user/login', this.loginForm)
          .then(() => {
            this.loading = false;
            this.$router.push({ path: '/dashboard' });
          }).catch((error) => {
            // console.log('submit fail');
            console.log(error);
          });
        return true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  .title {
    color: #eee;
    font-size: 30px;
    margin-bottom: 30px;
  }
  .login-form {
    width: 400px;
    .svg-container {
      color: gray;
    }
  }
  .login-button {
    width: 100%;
  }
}
</style>
