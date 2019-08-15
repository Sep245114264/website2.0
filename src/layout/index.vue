<template>
  <div class="container">
    <div class="header"></div>
    <div class="sidebar">
      <side-bar />
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import sideBar from './SideBar';

export default {
  name: 'layout',
  components: {
    sideBar,
  },
};
</script>
