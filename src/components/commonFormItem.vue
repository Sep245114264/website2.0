<script>
export default {
  name: 'commone-search-item',
  props: {
    item: {
      required: true,
      type: Object,
    },
    value: {
      default: '',
      required: true,
    },
  },
  data() {
    return {
      requestOptions: [],
    };
  },
  render() {
    const pickerOptions = {
      disabledDate(value) {
        return value < new Date().setDate(new Date().getDate() - 1);
      },
    };
    const components = {
      input: () => (
        <el-input
          value={this.value}
          style={`width: ${this.item.width}`}
          type={this.item.formType}
          disabled={this.item.disabled}
          clearable={this.item.clearable}
          placeholder={this.item.placeholder}
          {...{ on: this.$listeners }}
        ></el-input>
      ),
      select: () => (
        <el-select
          value={this.value}
          style={`width: ${this.item.width}`}
          value-key={this.item.valueKey}
          multiple={this.item.multiple}
          filterable={this.item.filterable}
          remote={this.item.remote}
          clearable={this.item.clearable}
          no-data-text={this.item.noDataText}
          placeholder={this.item.placeholder}
          remote-method={this.item.remote && this.remoteMethod}
          {...{ on: this.$listeners }}>
          {(this.requestOptions).map(each => (
            <el-option
              label={each.label}
              value={each.value}>
            </el-option>
          ))}
        </el-select>
      ),
      datePicker: () => (
        <el-datePicker
          value={this.value}
          // type={`${this.item.componentType}`}
          type="datetime"
          style={`width: ${this.item.width}`}
          picker-options={this.item.banTime && pickerOptions}
          value-format={this.item.valueFormat || 'yyyy-MM-dd HH:mm:ss'}
          {...{ on: this.$listeners }}>
        </el-datePicker>
      ),
      label: () => (
        <div id={this.item.id} class={this.item.class || 'form-label'}>{this.value}</div>
      ),
      radio: () => (
        <el-radio-group
          value={this.value}
          {...{ on: this.$listeners }}
          disabled={this.item.disabled}>
          {this.item.options && this.item.options.map(each => (
            <el-radio label={each.value}>{each.label}</el-radio>
          ))}
        </el-radio-group>
      ),
    };

    const formItem = (
      <el-form-item
        id={this.item.id}
        class={this.item.class}
        label={this.item.label}
        rules={this.item.rules}
        prop={this.item.key}>
        {components[this.item.type]()}
      </el-form-item>
    );
    const colItem = (
      <el-col span={this.item.colSpan}> {formItem} </el-col>
    );
    return this.item.colSpan ? colItem : formItem;
  },
  mounted() {
    const { api } = this.item;
    const options = [...this.item.options || []];
    if (api) {
      this.$http[api]().then((res) => {
        this.requestOptions = [...options, ...res.data || []];
        // this.item.options = [...res.data]
      });
    } else {
      this.requestOptions = options;
    }
  },
  methods: {
    remoteMethod(query) {
      this.$http[this.item.api](query).then((res) => {
        this.requestOptions = res.data;
      });
    },
  },
};
</script>
