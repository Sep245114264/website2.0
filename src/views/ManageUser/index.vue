<template>
  <el-card>
    <common-table :data="tableData" :config="tableConfig"></common-table>
  </el-card>
</template>

<script>
import commonTable from '@/components/commonTable';

const tableConfig = [
  { label: '用户名', prop: 'username' },
  { label: '权限', prop: 'authority' },
  { label: '创建时间', prop: 'createTime' },
  { label: '修改时间', prop: 'updateTime' },
];

export default {
  name: 'manage-article',
  components: {
    commonTable,
  },
  data() {
    return {
      tableConfig,
      tableData: [],
    };
  },
};
</script>
