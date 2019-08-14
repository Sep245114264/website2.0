<template>
  <el-form :data="loginForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" />
    </el-form-item>
    <el-button type="primary" @click="handleLogin">登陆</el-button>
  </el-form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          console.log('success');
        });
    },
  },
};
</script>
