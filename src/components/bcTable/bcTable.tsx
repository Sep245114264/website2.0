import customTable from './customTable.jsx.vue';
import customPagination from './customPagination.vue';
import { computed, reactive, ref, PropType, defineComponent, toRefs, watch, toRaw } from 'vue';
import { AnyObject, TableColumnCtx } from 'element-plus/packages/table/src/table.type';
interface ColspanOptions {
  includes: string[];
  parentProp?: string;
}
export default defineComponent({
  name: 'bc-table',
  inheritAttrs: false, // 不被作为props的attributes不会暴露在组件的根元素上
  components: {
    customTable,
    customPagination,
  },
  props: {
    colspanOptions: Object as PropType<ColspanOptions>,
    rowSpan: {
      type: Array,
      default: () => [],
    },
    padding: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    rows: {
      type: Number,
      default: 20,
    },
    custom: {
      type: Boolean,
      default: true,
    },
    data: Array,
    filter: Function,
    immediate: {
      type: Boolean,
      default: true,
    },
    pagination: Boolean,
    api: Function,
    params: Object,
    config: Array,
    total: {
      type: Number,
      default: 0,
    },
    simple: Boolean,
  },
  setup(props, { emit }) {
    const bcTableRef = ref();

    const arrayData = ref([]);
    const arrayTotal = ref(0);
    const rowSpanConfig = reactive({});
    const simpleTable = reactive({
      page: 1,
      pageSize: 5,
    })
    const searchModel: AnyObject = ref({});

    if (props.custom) {
      props.api && props.immediate && props.api();
    } else {
      // eslint-disable-next-line
      props.api && props.immediate && getList();
    }

    const tableData = computed<{[key: string]: string}[]>(() => {
      if (props.custom) {
        return toRaw([...props.data || []]);
      } else {
        console.log('enter')
        return toRaw(props.filter ? props.filter(arrayData.value) : arrayData.value);
      }
    });
    const totalColumn = computed(() => {
      const { includes = [], parentProp = null } = props.colspanOptions || {};
      const totalColumn: {[key: string]: any} = {};
      const whiteList: { [key: string]: number } = {};
      includes.forEach(item => {
        whiteList[item] = 0;
      });
      tableData.value.forEach(item => {
        Object.keys(item).forEach(key => {
          if (!Object.keys(whiteList).includes(key)) {
            return;
          }
          const spanKey = parentProp
            ? `${item[parentProp]}_${key}_${item[key]}`
            : `${key}_${item[key]}`;
          const column = totalColumn[spanKey];
          if (!item[key]) {
            whiteList[key] += 1;
            return;
          }
          if (column != null) {
            Object.assign(totalColumn[spanKey], { num: column.num + 1 });
          } else {
            totalColumn[spanKey] = {
              index: whiteList[key],
              num: 1
            };
          }
          whiteList[key] += 1;
        })
      })
      return totalColumn;
    })
    const simpleData = computed(() => {
      const { page, pageSize } = simpleTable;
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      return (props.data as []).slice(start, end);
    })
    watch(() => props.params, (newVal: object) => {
      searchModel.value = newVal;
    })

    function toggleRadio(row: object, selected: boolean) {
      bcTableRef.value.toggleRadio(row, selected);
    }
    function spanMethod({ row, column, rowIndex, columnIndex }:
      {
        row: AnyObject;
        column: TableColumnCtx;
        rowIndex: number;
        columnIndex: number;
      }) {
      const { includes = [], parentProp = null } = props.colspanOptions || {};
      const key = column.property;
      const spanKey = parentProp
        ? `${row[parentProp]}_${key}_${row[key]}`
        : `${key}_${row[key]}`;
      if (!includes.includes(key) || row[key] == null) {
        return {
          colspan: 1,
          rowspan: 1,
        };
      }
      if (rowIndex === totalColumn.value[spanKey].index) {
        return {
          colspan: 1,
          rowspan: totalColumn.value[spanKey].num,
        }
      } else {
        return [0, 0];
      }
    }
    function getPathValue(data: AnyObject, keys: string, index: number): void {
      const key = keys[index];
      if (data[key] instanceof Object && !Array.isArray(data[key])) {
        return getPathValue(data[key], keys, index + 1);
      } else {
        return data[key];
      }
    }
    function getList() {
      return props?.api && props.api().then(({ data }: AnyObject) => {
        arrayData.value = data.list || [];
        arrayTotal.value = data.total || 0;
        return Promise.resolve(arrayData.value);
      })
    };
    function getListData() {
      return tableData;
    };
    function calData(data: AnyObject[], key: number) {
      let total = 0;
      return data.reduce((count, curr) => {
        if (count[curr[key]]) {
          ++count[curr[key]].num;
        } else {
          count[curr[key]] = {
            index: total,
            num: 1,
          }
        }
        ++total;
        return count;
      }, {})
    };
    function handleSimplePageChange(page: number) {
      simpleTable.page = page;
    };
    function handleSimpleRowsChange(pageSize: number) {
      simpleTable.pageSize = pageSize;
    };
    function handlePageChange(page: number) {
      searchModel.value.page = page;
      if (props.custom) {
        props.api && props.api();
      } else {
        getList();
      }
    };
    function handleRowsChange(pageSize: number) {
      searchModel.value.pageSize = pageSize;
      searchModel.value.page = 1;
      handlePageChange(1);
    };
    function clearSelection() {
      bcTableRef.value.clearSelection();
    };
    function clearFilter(columnKey: string) {
      bcTableRef.value.clearFilter(columnKey);
    };
    function toggleRowSelection(row: AnyObject, selected: boolean) {
      bcTableRef.value.toggleRowSelection(row, selected);
    };
    function toggleRowExpansion(row: AnyObject, expanded: boolean) {
      bcTableRef.value.toggleRowExpansion(row, expanded);
    };
    return {
      simpleData,
      tableData,
      searchModel,
      arrayTotal,
      simpleTable,
      handlePageChange,
      handleRowsChange,
      handleSimplePageChange,
      handleSimpleRowsChange,
      spanMethod,
    }
  },
  render() {
    return (
      <div class={['bc-table', { padding: this.padding }]}>
        <custom-table
          ref="bcTableRef"
          config={this.config}
          data={this.simple ? this.simpleData : this.tableData}
          spanMethod={this.$attrs['span-method'] || (this.colspanOptions ? this.spanMethod : null)}
          hidden-current={!!this.colspanOptions}
          body-border={this.$attrs['body-border'] || !!this.colspanOptions}
          v-slots={this.$slots}
          {...{
            ...this.$attrs,
          }}
        />
        {this.pagination && !this.simple &&
          <custom-pagination
            currentPage={this.searchModel.page}
            pageSize={this.searchModel.pageSize}
            total={this.custom ? this.total : this.arrayTotal}
            on-current-change={this.handlePageChange}
            on-size-change={this.handleRowsChange}
          />
        }
        {this.simple &&
          <custom-pagination
            currentPage={this.simpleTable.page}
            pageSize={this.simpleTable.pageSize}
            total={this.tableData.length}
            layout="prev, pager, next"
            on-current-change={this.handleSimplePageChange}
            on-size-change={this.handleSimpleRowsChange}
          />
        }
      </div>
    )
  }
});
