<template>
  <div class="nav-container">
    <div class="left">
      <span class="title">站点管理</span>
    </div>
    <div class="right">
      <!-- <search class="right-item"></search> -->
      <el-dropdown class="avatar-container right-item" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <el-avatar src="/static/img/18-4-14.jpg" alt="头像" fit="contain" :size="60" style="width: 100%" />
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
// import search from './Search.vue';

export default {
  name: 'nav-bar',
  // components: {
  //   search,
  // },
  methods: {
    handleCommand(command) {
      const commandMap = {
        userInfo: () => { console.log('个人信息'); },
        logout: () => {
          this.$api.logout().then(({ code, message }) => {
            this.$message({
              type: code === 200 ? 'success' : 'error',
              message,
            });
            if (code !== 200) {
              return false;
            }
            this.$store.commit('user/CLEAR_LOGIN');
            this.$store.commit('permission/CLEAR_ROUTES');
            this.$router.push({ name: 'login' });
            return true;
          });
        },
      };
      commandMap[command]();
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  height: 60px;
  line-height: 60px;
  padding: 10px 40px;
  box-shadow: 0px 4px 20px 0px rgba(110, 110, 110, 0.3);
  margin-bottom: 20px;
  .left {
    float: left;
    .title {
      font-size: 32px;
    }
  }
  .right {
    float: right;
    .right-item {
      display: inline-block;
      height: 100%;
    }
    .avatar-container {
      position: relative;
      width: 40px;
      height: 40px;
      cursor: pointer;
      img {
        width: 100%;
      }
      i {
        position: absolute;
        bottom: 0;
      }
    }
  }
}
</style>
