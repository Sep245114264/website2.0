<template>
  <el-table ref="dataTable" class="style-table" :row-key="rowKey" :data="data" v-on="$listeners">
    <slot name="selection" />
    <el-table-column
      v-for="(item, index) in config"
      :key="index"
      #default="{row, column, $index}"
      :width="item.width"
      :label="item.label"
      :prop="item.prop"
      :align="item.align"
      :sortable="item.sort"
      :fixed="item.fixed"
      :show-overflow-tooltip="item.showOverflowTooltip"
    >
      <span v-if="!item.slotName">
        <template v-if="!editable">{{row[item.prop]}}</template>
        <div v-else>
          <el-input v-model="row[item.prop]" @blur="handleBlur(row, $index)" />
        </div>
      </span>
      <slot v-else :name="item.slotName" v-bind="{row, column, $index}"></slot>
    </el-table-column>
    <!-- <slot name="extraDialog" /> -->
    <!-- <slot name="operate"></slot> -->
  </el-table>
</template>

<script>
export default {
  name: 'common-table',
  props: {
    data: {
      require: true,
      type: Array,
    },
    config: {
      require: true,
      type: Array,
    },
    editable: {
      default: false,
      type: Boolean,
    },
    rowKey: {
      type: [String, Function],
    },
  },
  methods: {
    $_isFilled(row) {
      return Object.keys(row).some(key => row[key] !== '');
    },
    handleBlur(row, index) {
      const isFilled = this.$_isFilled(row);
      const needEmpty = this.$_isFilled(this.data[this.data.length - 1]);
      // 当填写了一行中任意一个输入框，且该行为表格的最后一行
      // 添加一个空白行
      if (isFilled && needEmpty) {
        const obj = {};
        Object.keys(row).forEach((key) => {
          obj[key] = '';
        });
        this.data.push({ ...obj });
      } else if (!isFilled && index !== this.data.length - 1) {
        // 当该行为空白行，且该行不是最后一行
        // 删除最后一行空白行
        this.data.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.style-table >>> .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.isEdit >>> .el-input__inner {
  background-color: #edfae0;
}
</style>
