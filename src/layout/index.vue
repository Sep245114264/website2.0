<template>
  <div class="container">
    <div class="sidebar">
      <side-bar />
    </div>
    <div class="main">
      <div class="header">
        <nav-bar />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import sideBar from './SideBar';
import navBar from './NavBar';

export default {
  name: 'layout',
  components: {
    sideBar,
    navBar,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .sidebar {
    position: fixed;
    height: 100%;
    width: 200px;
  }
  .main {
    margin-left: 200px;
  }
}
</style>
