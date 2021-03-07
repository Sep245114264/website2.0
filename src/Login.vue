<template>
  <div class="login-container">
    <div class="title">登录系统</div>
    <el-form class="login-form" :model="loginFormData" ref="loginForm" :rules="loginRules">
      <el-form-item prop="username">
        <el-input
          v-model="loginFormData.username"
          placeholder="用户名"
          @keyup.enter="handleLogin"
        >
          <svg-icon class="svg-container" icon="user" />
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginFormData.password"
          type="password"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <svg-icon class="svg-container" icon="password" />
        </el-input>
      </el-form-item>

      <el-button
        class="login-button"
        type="primary"
        :loading="loading"
        @click="handleLogin"
      >登录</el-button>
    </el-form>
    <el-button type="text" @click="handleRegister">注册</el-button>
    <el-dialog v-model="visible" title="注册用户">
      <el-form ref="registerForm" :model="registerFormData" label-width="80px">
        <el-form-item prop="username">
          <el-input v-model="registerFormData.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label prop="password">
          <el-input v-model="registerFormData.password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" @click="submitRegister">注册</el-button>
        <el-button @click="visible = false">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
const loginRules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};
export default {
  name: 'login',
  setup() {
    const loginForm = ref();
    const loginFormData = reactive({
      username: '',
      password: '',
    });
    const registerForm = ref();
    const registerFormData = reactive({
      username: '',
      password: '',
    })
    return {
      loginFormData,
      loginForm,
      registerForm,
      registerFormData,
    }
  },
  data() {
    return {
      loading: false,
      loginRules,
      visible: false,
    };
  },
  methods: {
    submitRegister() {
      this.registerForm.validate().then(() => {
        this.$api.postRegister(this.registerFormData).then((res) => {
          console.log(res);
        });
      })
    },
    handleRegister() {
      this.visible = true;
    },
    handleLogin() {
      this.loginForm.validate().then(() => {
        this.loading = true;
        this.$store.dispatch('user/login', this.loginFormData)
          .then(() => {
            this.loading = false;
            try {
              this.$router.replace({ path: '/dashboard' });
            } catch (err) {
              console.error(err);
            }
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
  height: 100vh;
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
