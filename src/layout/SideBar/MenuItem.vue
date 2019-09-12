<template>
  <div v-if="!item.hidden">
    <template v-if="item.path === '/'">
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="item.path"
      />
    </template>
    <template v-else-if="hasShowChildren(item.children, item)">
      <el-menu-item :index="fullPath">{{menuItem.meta.title}}</el-menu-item>
    </template>
    <el-submenu v-else :index="fullPath">
      <template #title>
        <span>{{item.meta.title}}</span>
      </template>
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="item.path"
      ></menu-item>
    </el-submenu>
  </div>
</template>
<script>
import path from 'path';
import menuItem from './MenuItem';

export default {
  name: 'menu-item',
  components: {
    menuItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  computed: {
    fullPath() {
      console.log(path.resolve(this.basePath, this.menuItem.path));
      return path.resolve(this.basePath, this.menuItem.path);
    },
  },
  data() {
    return {
      menuItem: {},
    };
  },
  methods: {
    hasShowChildren(children = [], route) {
      const showMenu = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        this.menuItem = item;
        return true;
      });
      if (showMenu.length === 1) {
        return true;
      }
      if (showMenu.length === 0) {
        this.menuItem = { ...route };
        return true;
      }
      return false;
    },
    resolvePath(route) {
      console.log(this.basePath);
      return path.resolve(this.basePath, route);
    },
  },
};
</script>
