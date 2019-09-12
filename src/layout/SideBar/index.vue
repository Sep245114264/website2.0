<template>
  <el-menu
    class="side-bar"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="activeMenu"
    router
  >
    <menu-item
      v-for="item in permissionRoutes"
      :key="item.path"
      :item="item"
      :base-path="item.path"
    ></menu-item>
  </el-menu>
</template>

<script>
import menuItem from './MenuItem';

export default {
  name: 'side-bar',
  components: {
    menuItem,
  },
  computed: {
    permissionRoutes() {
      console.log('permission', this.$store.state.permission.routes);
      return this.$store.state.permission.routes;
    },
    activeMenu() {
      return this.$route.path.split('/').slice(0, 2).join('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  height: inherit;
}
</style>
