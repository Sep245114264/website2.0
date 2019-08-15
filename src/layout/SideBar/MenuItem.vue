<template>
  <el-menu-item v-if="!item.children" :index="item.path">{{item.meta.title}}</el-menu-item>
  <!-- <el-submenu index="">
    <el-menu-item index=""></el-menu-item>
  </el-submenu>-->
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
