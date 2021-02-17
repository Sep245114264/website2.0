<template>
  <div class="color-hue-slider">
    <div ref="bar" class="bar"></div>
    <div ref="thumb" class="thumb" :style="{left: thumbLeft + 'px', top: thumbTop + 'px'}">
  </div>
</template>

<script lang="ts">
import draggable from '../draggable';
import { computed, getCurrentInstance, onMounted, PropType, ref, watch } from 'vue';
import Color from '../color';
export default {
  name: 'ColorHueSlider',
  props: {
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
    vertical: Boolean,
  },
  setup(props) {
    const instance = getCurrentInstance();

    const thumb = ref<HTMLElement | null>(null);
    const bar = ref<HTMLElement | null>(null);

    const thumbLeft = ref(0);
    const thumbTop = ref(0);

    const hueValue = computed(() => {
      return props.color.get('hue');
    });

    watch(() => hueValue.value, () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      update();
    })

    function handleDrag(event: Event) {
      const el = instance?.vnode.el as HTMLElement;
      const rect = el.getBoundingClientRect();
      let hue;

      if (!thumb.value || !bar.value) {
        return;
      }
      if (!props.vertical) {
        let left = (event as MouseEvent).clientX - rect.left;
        left = Math.min(left, rect.width - thumb.value.offsetWidth / 2);
        left = Math.max(thumb.value.offsetWidth / 2, left);

        hue = Math.round((left - thumb.value.offsetWidth / 2) / (rect.width - thumb.value.offsetWidth) * 360);
      } else {
        let top = (event as MouseEvent).clientY - rect.top;
        top = Math.min(top, rect.height - thumb.value.offsetHeight / 2);
        top = Math.max(thumb.value.offsetHeight / 2, top);
        hue = Math.round((top - thumb.value.offsetHeight / 2) / (rect.height - thumb.value.offsetHeight) * 360);
      }
      props.color.set('hue', hue);
    }
    function getThumbLeft() {
      const el = instance?.vnode.el;
      if (props.vertical) return 0;

      const hue = props.color.get('hue');
      if (!el || !thumb.value) return 0;
      return Math.round(hue * (el.offsetWidth - thumb.value?.offsetWidth / 2) / 360);
    }
    function getThumbTop() {
      const el = instance?.vnode.el;
      if (!props.vertical) return 0;

      const hue = props.color.get('hue');
      if (!el || !thumb.value) return 0;
      return Math.round(hue * (el.offsetHeight - thumb.value.offsetHeight / 2) / 360);
    }
    function update() {
      thumbLeft.value = getThumbLeft();
      thumbTop.value = getThumbTop();
    }

    onMounted(() => {
      const dragConfig = {
        drag: (event: Event) => {
          handleDrag(event);
        },
        end: (event: Event) => {
          handleDrag(event);
        }
      }

      bar.value && draggable(bar.value, dragConfig);
      thumb.value && draggable(thumb.value, dragConfig);
      update();
    })
  }
}
</script>
