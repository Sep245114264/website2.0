<template>
  <div class="container">
    <div class="header"></div>
    <div class="sidebar"></div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout',
};
</script>
