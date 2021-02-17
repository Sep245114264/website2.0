<template>
  <el-button type="primary" @click="() => handleClick('add')">新增 +</el-button>
  <bc-table
    :custom="false"
    :config="config"
    :api="getList"
    :params="params"
    pagination
  >
    <template #color="{ row }">
      <el-tag class="tag-color" :style="`background: ${row.color}`">示例</el-tag>
    </template>
    <template #operate="{row}">
      <el-button type="primary" size="mini" @click="handleClick('edit', row)">编辑</el-button>
      <el-button type="danger" size="mini" @click="handleClick('delete', row)">删除</el-button>
    </template>
  </bc-table>
  <bc-dialog :title="isModify" v-model="visible" @submit="handleSubmit" >
    <el-form :model="formData" inline v-if="visible">
      <el-form-item name="name" label="名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item name="value" label="值">
        <el-input v-model="formData.value" />
      </el-form-item>
      <el-form-item name="color" label="颜色">
        <el-color-picker v-model="formData.color" />
        <!-- <photoshop /> -->
      </el-form-item>
      <template #footer>
        <footer>
          <el-button>取消</el-button>
          <el-button>确定</el-button>
        </footer>
      </template>
    </el-form>
  </bc-dialog>
</template>

<script lang="ts">
import { computed, getCurrentInstance, reactive, ref, shallowRef, toRaw, toRef, toRefs, unref } from 'vue';
import { useApi } from '@/api/index';
const config = [
  { label: '名称', prop: 'name' },
  { label: '值', prop: 'value' },
  { label: '颜色', prop: 'color', slots: { customRender: 'color' } },
  { label: '操作', prop: 'operate' },
];
export default {
  name: 'manage-columns',
  setup() {
    const api = useApi();
    const formData = ref<{ _id?: string }>({ _id: '' });
    const visible = ref(false);
    const params = reactive({
      page: 1,
      pageSize: 5,
    })
    const isModify = computed(() => {
      return formData.value._id ? '编辑' : '新增';
    });
    const tableData = ref([]);

    function handleClick(action: string, row: object) {
      formData.value = ref({ ...toRaw(row) }).value;
      visible.value = true;
      console.log(formData)
    }
    function handleSubmit() {
      api.postColumns(formData).then(() => {
        visible.value = false;
      })
    }
    function getList() {
      return api.getColumnList(params);
    }
    return {
      config,
      formData,
      visible,
      isModify,
      tableData,
      params,

      getList,

      handleClick,
      handleSubmit,
    }
  }
};
</script>

<style scoped>
/* .tag-color {
  color: white;
} */
</style>
