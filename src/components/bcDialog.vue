<script lang="tsx">
import { defineComponent, getCurrentInstance, ref, SetupContext, withScopeId } from 'vue';
import { injectScopeId } from '@/utils/tool';
export default defineComponent({
  name: 'bc-dialog',
  inheritAttrs: false, // 不被作为props的attributes不会暴露在组件的根元素上
  props: {
    noFooter: Boolean
  },
  setup(props, context: SetupContext) {
    const { attrs, slots, emit } = context;
    const fullscreen = ref(false);
    const isFullscreen = ref(false);

    fullscreen.value = !!attrs.fullscreen;
    isFullscreen.value = !!attrs.fullscreen || attrs.fullscreen === '';

    function handleFullScreen() {
      fullscreen.value = !fullscreen.value;
    }
    function handleCancel() {
      emit('update:modelValue', false);
      emit('cancel');
    }

    const dialog = () => {
      const footer = injectScopeId(() => (
        <footer>
          <el-button on-click={handleCancel}>取消</el-button>
          <el-button type="primary" onClick={() => emit('submit')}>确认</el-button>
        </footer>
      ));
      const title = injectScopeId(() => (
        <header class="dialog-title">
          <span class="text">{attrs.title}</span>
          {!isFullscreen.value && <i class="icon el-icon-full-screen" onClick={handleFullScreen}></i>}
        </header>
      ))
      return (
        <el-dialog
          close-on-click-modal={false}
          {...{
            ...attrs,
            fullscreen: fullscreen.value,
          }}
          v-slots={{
            title,
            footer: () => (!props.noFooter && ((slots.footer) || footer()))
          }}
        >
          <el-scrollbar ref="scrollbar" class={['scrollbar', { isFullscreen: attrs.fullscreen || attrs.fullscreen === '' }]}>
            {slots.default && slots.default()}
          </el-scrollbar>
        </el-dialog>
      )
    }
    return dialog;
  },
})
</script>

<style lang="scss" scoped>
.dialog-title {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  .icon {
    cursor: pointer;
  }
  .text {
    font-size: 18px;
  }
}
.scrollbar {
  &::v-deep(.el-scrollbar__wrap) {
    max-height: 500px;
    padding-bottom: 17px;
  }
  &::v-deep(.el-scrollbar__view) {
    padding-right: 14px;
  }
}
.isFullscreen {
  &:deep(.el-scrollbar__wrap) {
    max-height: calc(100vh - 200px);
  }
}
</style>
