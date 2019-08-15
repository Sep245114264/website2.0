<template>
  <el-menu>
    <menu-item v-for="item in permissionRoutes" :key="item.path" :item="item"></menu-item>
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
      console.log(this.$store.state.permission.routes);
      return this.$store.state.permission.routes;
    },
  },
};
</script>
