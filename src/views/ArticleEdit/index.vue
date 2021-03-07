<template>
  <div class="article-edit">
    <el-form class="article-edit__body" ref="formRef" :model="article" :rules="rules">
      <el-form-item name="title" label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item name="columns" label="分类">
        <el-select
          multiple
          v-model="article.columns"
          style="width: 120px"
          ref="select"
         >
           <el-option value="lucy">Lucy</el-option>
           <el-option value="disabled" disabled>Disabled</el-option>
           <el-option value="Yiminghe">yiminghe</el-option>
         </el-select>
      </el-form-item>
      <el-form-item name="content" label="内容" class="editor-content">
        <editor v-model="article.content" test="123" />
      </el-form-item>
    </el-form>
    <div class="operate">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import editor from './editor.vue';
import { getCurrentInstance, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
// import tinymce from './tinymce';

const rules = {
  title: { required: true, message: '请输入标题', trigger: 'blur' },
  columns: { required: true, message: '请选择类别', trigger: 'blur', type: 'array' },
  content: { required: true, message: '请输入内容', trigger: 'blur' },
};

export default {
  name: 'article-edit',
  components: {
    editor,
  },
  setup() {
    const instance = getCurrentInstance();
    const api = instance && instance.appContext.config.globalProperties.$api;
    const router = useRouter();
    const route = useRoute();
    const id = route.query.id;
    const formRef = ref();
    const article = ref({});
    if (id) {
      api.getArticle(id).then(({ data }: { data: { content: string; title: string }}) => {
        // article.content = data.content;
        // article.title = data.title;
        article.value = data;
        console.log(article.value);
      })
    } else {
      article.value = {
        title: '123',
        columns: [],
        content: '',
      }
    }

    function handleSave() {
      formRef.value.validate().then(() => {
        instance && instance.appContext.config.globalProperties.$api.postArticle(article.value).then(() => {
          router.back();
        })
      }).catch(() => {
        message.warning('请完整填写');
      })
    };
    function handleCancel() {
      router.back();
    };

    return {
      formRef,
      article,
      rules,
      handleSave,
      handleCancel,
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-content:deep(.ant-form-item-control) {
  z-index: 0;
}
.article-edit {
  margin-top: 30px;
  margin-left: 40px;
  overflow: hidden;
}
.article-edit__body {
  :deep(.el-form-item__content) {
    margin-left: 60px;
  }
  :deep(.el-input),
  .el-select {
    width: 300px;
    display: inline-block;
  }
}
.operate {
  position: absolute;
  right: 100px;
  margin-bottom: 50px;
}
</style>
