<template>
  <el-card>
    <common-form v-model="queryData" :config="queryConfig">
      <template #back>
        <el-button>搜索</el-button>
        <el-button type="primary" @click="handleClick('create')">写文章</el-button>
      </template>
    </common-form>
    <common-table :data="tableData" :config="tableConfig">
      <template #operate>
        <el-button type="primary" @click="handleClick('edit')">编辑</el-button>
        <el-button type="danger" @click="handleClick('delete')">删除</el-button>
      </template>
    </common-table>
  </el-card>
</template>

<script>
import commonForm from '@/components/commonForm';
import commonTable from '@/components/commonTable';

const tableConfig = [
  { label: '标题', prop: 'title' },
  { label: '作者', prop: 'author' },
  { label: '创建时间', prop: 'createTime' },
  { label: '修改时间', prop: 'updateTime' },
  { label: '操作', slotName: 'operate' },
];
const queryConfig = {
  inline: true,
  list: [
    {
      type: 'input',
      key: 'title',
      value: '',
      placeholder: '文章标题',
    },
    {
      type: 'input',
      key: 'author',
      value: '',
      placeholder: '作者',
    },
  ],
};

export default {
  name: 'manage-article',
  components: {
    commonForm,
    commonTable,
  },
  data() {
    return {
      queryConfig,
      queryData: {},
      tableConfig,
      tableData: [],
    };
  },
  methods: {
    handleClick(action) {
      const actionMap = {
        create: () => { console.log('create'); },
        edit: () => {
          this.$router.push({ name: 'articleEdit' });
        },
        delete: () => { console.log('delete'); },
      };
      actionMap[action]();
    },
    getList() {
      this.$api.getArticles({ tst: 'test' }).then(({ data }) => {
        this.tableData = data.list;
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
