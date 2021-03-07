<script>
export default {
  name: 'cell-edit',
  props: {
    modelValue: [String, Number],
    unit: String,
  },
  directives: {
    focus: {
      inserted: el => {
        el.querySelector('input').focus();
      }
    }
  },
  data() {
    return {
      editing: false,
      cell: '',
    }
  },
  methods: {
    save() {
      // this.toggleEdit();
      this.$refs.bcInput.blur();
      this.$emit('save', this.cell)
    },
    toggleEdit() {
      this.editing = !this.editing;
    },
    handleInput(e) {
      console.log(e)
    },
  },
  render() {
    return this.editing
      ? <el-input
        class="edit-input"
        v-focus
        ref="bcInput"
        modelValue={this.cell}
        {...{
          'onUpdate:modelValue': val => { this.cell = val },
        }}
        onFocus={() => { this.cell = this.modelValue }}
        onBlur={this.toggleEdit}
        nativeOnKeyup={(e) => { e.code === 'Enter' && this.save() }}
      >
        {!!this.unit && <div slot="suffix">{this.unit}</div>}
      </el-input>
      : <div class="cell-edit" onClick={this.toggleEdit}>{this.modelValue}</div>
  }
}
</script>

<style lang="scss" scoped>
.edit-input {
  font-size: 12px !important;
  &:deep(input) {
    font-family: YaHei;
    height: 23px;
    line-height: 23px;
  }
}
.cell-edit {
  padding: 0 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    padding: 0 14px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
  }
}
</style>
