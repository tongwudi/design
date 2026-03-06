<script lang="ts" setup>
import type { OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

const config = defineModel<DefaultConfig>('modelValue', {
  type: Object,
  default: () => ({}),
})

interface FormState {
  selectValue: string
  searchValue: [string, string]
}

const formState = ref({} as FormState)

const options = [
  { label: '天', value: 'DAY' },
  { label: '周', value: 'WEEK' },
  { label: '月', value: 'MONTH' },
  { label: '季度', value: 'QUARTER' },
  { label: '年', value: 'YEAR' },
]
const presets = [
  { label: '当天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  {
    label: '本季度',
    value: [
      dayjs().startOf('quarter' as OpUnitType),
      dayjs().endOf('quarter' as OpUnitType),
    ],
  },
  { label: '本年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
]

watch(
  formState,
  (newValue) => {
    config.value.selectParams = newValue.selectValue
    config.value.searchParams = newValue.searchValue
  },
  { deep: true },
)
</script>

<template>
  <a-form layout="inline">
    <a-form-item v-if="config.showSelect" label="显示维度" name="selectValue">
      <a-select
        v-model:value="formState.selectValue"
        style="width: 85px"
        allow-clear
        :options="options"
      />
    </a-form-item>
    <a-form-item v-if="config.metrics?.length > 0" name="searchValue">
      <a-range-picker
        v-model:value="formState.searchValue"
        style="width: 200px"
        show-time
        value-format="YYYY-MM-DD HH:mm:ss"
        :presets="presets"
      />
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
.ant-form-item {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
