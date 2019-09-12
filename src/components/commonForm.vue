<template>
  <el-form
    :ref="config.ref"
    :class="config.class"
    :model="value"
    :inline="config.inline"
    :label-width="config.labelWidth"
  >
    <slot name="front" />
    <template v-if="config.layout">
      <el-row v-for="(row,index) in config.list" :gutter="config.gutter" :key="index">
        <common-Form-item
          v-for="item in row"
          :key="item.key"
          :item="item"
          :value="value[item.key]"
          @input="handleInput($event, item.key)"
        >
          <slot v-if="item.slotName" :name="item.slotName" />
        </common-Form-item>
      </el-row>
    </template>
    <template v-else>
      <common-Form-item
        v-for="item in config.list"
        :key="item.key"
        :item="item"
        :value="value[item.key]"
        @input="handleInput($event, item.key)"
      >
        <slot v-if="item.slotName" :name="item.slotName" />
      </common-Form-item>
    </template>
    <slot name="back" />
  </el-form>
</template>

<script>
import commonFormItem from './commonFormItem';

export default {
  name: 'common-search',
  props: {
    config: {
      required: true,
      type: Object,
    },
    value: {
      required: true,
      type: Object,
    },
  },
  components: {
    commonFormItem,
  },
  mounted() {
    this.setDefaultValue();
  },
  methods: {
    handleInput(value, key) {
      this.$emit('input', { ...this.value, [key]: value });
    },
    setDefaultValue() {
      const searchValue = { ...this.value };
      // console.log(searchValue);
      this.config.list.forEach(({ key, value }) => {
        // 如果表单原来就有值就放弃赋初值
        searchValue[key] = searchValue[key] ? searchValue[key] : value;
      });
      this.$emit('input', searchValue);
    },
  },
};
</script>

<style scoped>
</style>
