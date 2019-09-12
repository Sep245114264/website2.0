<template>
  <!-- 通过v-if让组件dialog在不显示时从dom中删除 -->
  <!-- 以此达到下次打开重新加载内部组件的目的-->
  <!-- 不用在关闭dialog时清除校验结果和清空数据了 -->
  <el-dialog
    v-if="isVisible"
    class="dynamic-dialog"
    :visible.sync="isVisible"
    :title="title"
    @closed="handleCloseDialog"
  >
    <slot name="header"></slot>
    <!-- 根据type决定dialog默认显示的主要组件类型 -->
    <common-table v-if="config.type === 'list'" :tableConfig="config.config" :tableData="data" />
    <common-form
      v-else-if="config.type === 'object'"
      ref="commonSearch"
      v-model="data"
      :config="config.config"
    ></common-form>
    <!-- 如果需要其它的额外组件，就通过插槽手动添加 -->
    <template v-else>
      <div v-for="name in config.type" :key="name">
        <slot :name="name" />
      </div>
    </template>
    <slot />
    <slot name="pagination" />
    <!-- <slot v-else :name="config.type" />
    <slot />-->
    <!-- 根据主要组件的类型决定是否存在底部的具名插槽 -->
    <!-- <div :slot="config.type === 'object' ? 'footer' : ''"><slot name="footer"></slot></div> -->
    <div slot="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
import commonForm from './commonForm.vue';
import commonTable from './commonTable.vue';

export default {
  name: 'common-dialog-form',
  components: {
    commonForm,
    commonTable,
  },
  props: {
    isDialogVisible: {
      default: false,
      required: true,
      type: Boolean,
    },
    title: {
      default: '',
      required: true,
      type: String,
    },
    config: {
      type: Object,
    },
    value: {
      type: [Object, Array],
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.isDialogVisible;
      },
      set() {
        this.$emit('closeDialog');
      },
    },
    data: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    // type() {
    //   // return this.config.config instanceof Array ? 'list' : 'object'
    //   console.log(this.config.type);
    //   return this.config.type;
    // }
  },
  methods: {
    handleCloseDialog() {
      // this.$refs.commonSearch.$refs[this.formConfig.ref].clearValidate();
      this.isVisible = false;
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>
.dynamic-dialog >>> .form-label {
  font-size: 12px;
}
.dynamic-dialog >>> .el-form-item__content {
  line-height: 34px;
}
/* .service-provid-apply >>> .el-input__inner {
  width: 180px;
} */
</style>
