<template>
  <a-popover trigger="click" ref="poper">
    <template #content>
      <section>
        <div class="main-wrapper">
          <hue-slider ref="hue" />
          <!-- <sv-panel ref="svPanel" /> -->
        </div>
        <!-- <alpha-slider ref="alpha" /> -->
        <!-- <predefine /> -->
        <div class="btns">
          <span class="color-value">
            <a-input v-model="customInput" />
          </span>
          <a-button @click="clear">清除</a-button>
          <a-button @click="confirmValue">确认</a-button>
        </div>
      </section>
    </template>
    <div class="color-picker">颜色</div>
  </a-popover>
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, watch, defineComponent } from 'vue';
import Color from './color';
import { nextTick } from 'process';
export default defineComponent({
  name: 'ColorPicker',
  props: {
    modelValue: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    predefine: Array,
  },
  setup(props, { emit }) {
    const hue = ref();
    const svPanel = ref();
    const alpha = ref();
    const poper = ref(null);

    const color = reactive(new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat as string,
    }));
    const showPicker = ref(false);
    const showPanelColor = ref(false);
    const customInput = ref('');

    function displayedRgb(color: Color, showAlpha: boolean) {
      const { r, g, b } = color.toRgb();
      return showAlpha ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
        : `rgb(${r}, ${g}, ${b})`
    }

    const displayedColor = computed(() => {
      if (!props.modelValue && !showPanelColor.value) {
        return 'transparent';
      }
      return displayedRgb(color as Color, props.showAlpha);
    });
    const colorDisabled = computed(() => {
      return props.disabled;
    });
    const currentColor = computed(() => {
      return !props.modelValue && !showPanelColor.value ? '' : color.value;
    })

    watch(() => props.modelValue, newVal => {
      if (!newVal) {
        showPanelColor.value = false;
      } else if (newVal && newVal !== color.value) {
        color.fromString(newVal);
      }
    });
    watch(() => currentColor.value, val => {
      customInput.value = val as string;
      emit('active-change', val);
    });
    watch(() => color.value, () => {
      if (!props.modelValue && !showPanelColor.value) {
        showPanelColor.value = true;
      }
    })

    function setShowPicker(value: boolean) {
      showPicker.value = value;
    }
    function resetColor() {
      nextTick(() => {
        if (props.modelValue) {
          color.fromString(props.modelValue);
        } else {
          showPanelColor.value = false;
        }
      })
    }
    function hide() {
      setShowPicker(false);
      resetColor();
    }
    function confirmValue() {
      const value = color.value;
      emit('active-change', value);
      emit('change', value);
      setShowPicker(false);
      nextTick(() => {
        const newColor = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat as string,
        });
        newColor.fromString(props.modelValue);
        if (!color.compare(newColor)) {
          resetColor();
        }
      })
    }
    function clear() {
      setShowPicker(false);
      emit('active-change', null);
      emit('change', null);
      resetColor();
    }
    function handleConfirm() {
      color.fromString(customInput.value as string);
    };
    onMounted(() => {
      if (props.modelValue) {
        color.fromString(props.modelValue);
        customInput.value = currentColor.value as string;
      }
    })
    watch(() => showPicker.value, () => {
      nextTick(() => {
        // eslint-disable-next-line no-unused-expressions
        hue.value?.update();
        // eslint-disable-next-line no-unused-expressions
        svPanel.value?.update();
        // eslint-disable-next-line no-unused-expressions
        alpha.value?.update();
      })
    })
    return {
      color,
      colorDisabled,
      displayedColor,
      showPanelColor,
      showPicker,
      customInput,
      handleConfirm,
      hide,
      clear,
      confirmValue,
      hue,
      svPanel,
      alpha,
      poper,
    }
  }
})
</script>
