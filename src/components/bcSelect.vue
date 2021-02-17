<template>
  <el-select
    v-if="api !== 'ips' && !onlyDisplay"
    :modelValue="modelValue"
    @update:modelValue="val => $emit('update:modelValue', val)"
    @change="(val) => $emit('update:label', getLabel(val))"
    :style="{ width: selectWidth }"
    v-bind="{ clearable: true, ...$attrs}"
  >
    <el-option
      v-for="item in selectOptions"
      :key="item[optionKey || customValue]"
      :label="item[customLabel] || item[customValue] || item"
      :value="item[customValue] == null ? item : item[customValue]"
      :disabled="itemDisabled && itemDisabled(item)"
    >
      <slot v-bind="{...item}"/>
    </el-option>
  </el-select>
  <span v-else>{{displayText}}</span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { AnyObject } from './@types/select';
export default defineComponent({
  name: 'bc-select',
  props: {
    immediate: {
      type: Boolean,
      default: true,
    },
    onlyDisplay: Boolean,
    optionKey: {
      type: String,
      default: 'value',
    },
    width: String,
    modelValue: {
      required: true
    },
    options: {
      type: Array as PropType<AnyObject[]>,
    },
    customLabel: {
      type: String,
      default: 'name'
    },
    customValue: {
      type: String,
      default: '_id'
    },
    itemDisabled: Function,
    api: {
      type: Function,
    },
  },
  setup(props) {
    const apiOptions = ref<AnyObject[]>([]);

    const selectOptions = computed((): AnyObject[] => {
      return [...(props.options || apiOptions.value)];
    });
    const displayText = computed(() => {
      const value = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
      const res: AnyObject[] = []
      value.forEach(item => {
        let obj: AnyObject = {};
        if (props.modelValue instanceof Object) {
          obj = props.modelValue
        } else {
          obj = selectOptions.value.find(each => each[props.customValue] === item) || {};
        }
        res.push(obj ? obj[props.customLabel] : '');
      })
      return res.join(',')
    });
    const selectWidth = computed(() => {
      if (!props.width) {
        return;
      }
      return parseInt(props.width) + 'px';
    });

    props.immediate && getList();

    function getList() {
      props.api && props.api().then((data: AnyObject) => {
        if (data.data) {
          apiOptions.value = data.data.rows || data.data;
        } else {
          apiOptions.value = data.rows || data;
        }
      });
    }
    function getObject(value: string) {
      const res = selectOptions.value.find(item => item[props.customValue] === value);
      if (!res) {
        return {};
      }
      return res;
    }
    function getLabel(value: string) {
      const res = selectOptions.value.find(item => item[props.customValue] === value);
      if (!res) {
        return '';
      }
      return res[props.customLabel];
    }
    function getOptions() {
      return selectOptions.value;
    }
    return {
      displayText,
      selectWidth,
      selectOptions,

      getObject,
      getLabel,
      getOptions,
    }
  },
})
</script>
