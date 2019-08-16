<template>
  <div class="nav-container">
    <div class="right">
      <search class="right-item"></search>
      <el-dropdown class="avatar-container right-item" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img src="" -->
        </div>
        <span>头像</span>
        <el-dropdown-menu>个人信息</el-dropdown-menu>
        <el-dropdown-menu>注销</el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import search from './Search.vue';

export default {
  name: 'nav-bar',
  components: {
    search,
  },
};
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  height: 50px;
  box-shadow: 0px 4px 20px 0px rgba(110, 110, 110, 0.3);
  .right {
    float: right;
    .right-item {
      display: inline-block;
      height: 100%;
    }
    .avatar-container {
      cursor: pointer;
    }
  }
}
</style>
