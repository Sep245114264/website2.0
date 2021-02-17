<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import Editor from 'wangeditor';
import { onMounted, SetupContext, watchEffect, defineComponent } from 'vue';

export default defineComponent({
  name: 'wange-editor',
  props: {
    modelValue: String,
  },
  setup(props, context: SetupContext) {
    let editor: Editor;
    onMounted(() => {
      editor = new Editor('#editor');
      editor.config.onchange = function (newText: string) {
        context.emit('update:modelValue', newText);
      }
      editor.create();
      const stop = watchEffect(() => {
        editor.txt.html(props.modelValue)
        // console.log(props)
        stop && stop();
      })
    })
  },
})
</script>

<style scoped>
#editor {
  position: relative;
  z-index: 0;
}
</style>
