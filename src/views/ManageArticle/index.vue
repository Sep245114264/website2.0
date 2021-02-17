<template>
  <div class="article-search-button">
    <el-form inline>
      <el-form-item label="作者">
        <el-input v-model="query.conditions.author" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="query.conditions.title" />
      </el-form-item>
      <el-form-item label="分类">
        <bc-select v-model="query.conditions.columns" :api="getColumns" />
      </el-form-item>
      <el-button @click="handleSearch">搜索</el-button>
      <el-button type="primary" @click="handleClick('create')">写文章</el-button>
    </el-form>
  </div>
  <bc-table
    :data="tableData"
    :config="tableConfig"
    row-key="_id"
  >
    <template #columns="{row}">
      <span v-for="tag in row.columns" :key="tag">
        <el-tag>{{tag}}</el-tag>
      </span>
    </template>
    <template #operate="{row: record}">
      <el-button type="primary" @click="handleClick('edit', record)">编辑</el-button>
      <el-button type="danger" @click="handleClick('delete', record)">删除</el-button>
    </template>
  </bc-table>
</template>

<script>
import bcTable from '@/components/bcTable'

const tableConfig = [
  { label: '标题', prop: 'title', editable: true },
  { label: '作者', prop: 'author' },
  { label: '类别', prop: 'columns' },
  { label: '创建时间', prop: 'createAt' },
  { label: '修改时间', prop: 'updateAt' },
  { label: '操作', prop: 'operate' },
];

export default {
  name: 'manage-article',
  components: {
    // generateForm,
    bcTable,
  },
  data() {
    return {
      tooltipContent: '',
      currentPage: 1,
      queryData: {},
      tableConfig,
      tableData: [],
      query: {
        conditions: {
          author: '',
          title: '',
          columns: '',
        },
        page: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  methods: {
    getColumns() {
      return this.$api.getColumns();
    },
    handleSearch() {
      this.getList();
    },
    handleCurrentChange(val) {
      this.query.page = val;
      this.getList();
    },
    handleClick(action, row) {
      const actionMap = {
        create: () => {
          this.$router.push({ name: 'articleEdit' });
        },
        edit: ({ _id }) => {
          this.$router.push({ name: 'articleEdit', query: { id: _id } });
        },
        delete: ({ _id }) => {
          this.$api.deleteArticle({ id: _id }).then(() => {
            this.getList();
          });
        },
      };
      actionMap[action](row);
    },
    getList() {
      this.$api.getArticles(this.query).then(({ data }) => {
        const { list, total } = data;
        this.tableData = list;
        this.query.total = total;
      });
    },
  },
  mounted() {
    console.log('getList');
    this.getList();
  },
};
</script>

<style scoped>
.article-search {
  display: inline-block;
}
.article-search-button {
  display: inline-block;
  vertical-align: top;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
