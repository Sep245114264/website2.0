<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    className: {
      default: '',
      type: String,
    },
  },
  computed: {
    svgClass() {
      const { className } = this;
      return className ? `svg-icon ${className}` : 'svg-icon';
    },
    iconName() {
      const { icon } = this;
      return `#icon-${icon}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
