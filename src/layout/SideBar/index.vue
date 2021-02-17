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

<script lang="ts">
import { computed } from 'vue';
import menuItem from './MenuItem.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

interface MenuInfo {
  item: object;
  key: string;
  keyPath: string[];
  domEvent: MouseEvent;
}

export default {
  name: 'side-bar',
  components: {
    // 'sub-menu': SubMenu,
    menuItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const permissionRoutes = computed(() => store.state.permission.routes);
    const activeMenu = computed(() => route.path.split('/').slice(0, 2).join('/'));

    function handleClick(e: MenuInfo) {
      const path = e.key;
      router.push(path);
    }
    return {
      permissionRoutes,
      activeMenu,
      handleClick,
    }
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  height: inherit;
}
</style>
