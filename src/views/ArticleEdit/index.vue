<template>
  <div class="article-edit">
    <el-form class="article-edit__body" ref="form" :model="article" :rules="rules">
      <el-form-item prop="title" label="标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item prop="columns" label="分类">
        <el-select v-model="article.columns" multiple placeholder="请选择类别">
          <el-option
            v-for="item in columnOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <textarea :id="tinymceId" />
      </el-form-item>
    </el-form>
    <div class="operate">
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import load from './load';

const cdnTinymce = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';
const rules = {
  title: { required: true, message: '请输入标题', trigger: 'blur' },
  columns: { required: true, message: '请选择类别', trigger: 'blur' },
  content: { required: true, message: '请输入内容', trigger: 'blur' },
};

export default {
  name: 'tinymce',
  data() {
    return {
      rules,
      tinymceId: `tinymce-${Date.now()}`,
      submited: false,
      article: {
        title: '',
        columns: '',
        content: '',
      },
      columnOptions: [
        { label: 'python3', value: 'python3' },
        { label: 'javascript', value: 'javascript' },
        { label: 'web', value: 'web' },
      ],
    };
  },
  methods: {
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false;
        }
        const { title, columns, content } = this.article;
        this.submited = true;
        const result = {
          title,
          columns,
          content,
        };
        this.$api.postArticle(result).then((res) => {
          console.log(res);
        });
        return true;
      });
    },
    handleCancel() {

    },
    init() {
      // console.log('enter');
      load(cdnTinymce, (error) => {
        error ? this.$message.error(error.message) : this.initTinymce();
      });
    },
    initTinymce() {
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: 'zh_CN',
        height: 300,
        width: 800,
        paste_data_images: true,
        // menubar: 'file edit',
        toolbar: ['fontsizeselect searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample hr', 'bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        contextmenu: 'cut paste copy',
        init_instance_callback: (editor) => {
          editor.on('KeyUp Change', () => {
            this.article.content = editor.getContent();
          });
        },
        // images_upload_url: '/upload/image',
        images_upload_handler: (blobInfo, success, failure) => {
          this.$api.postImage({ base64: blobInfo.base64() }).then((res) => {
            this.$message({
              type: 'success',
              message: '上传成功',
            });
            success(res.location);
          });
        },
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.article-edit {
  margin-top: 30px;
  margin-left: 40px;
  overflow: hidden;
}
.article-edit__body {
  /deep/ .el-form-item__content {
    margin-left: 60px;
  }
  /deep/ .el-input,
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
