<script lang="ts" setup>
import type { Dayjs, OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

defineProps<{
  item: WidgetItem
}>()

const config = defineModel<DefaultConfig>('modelValue', {
  type: Object,
  default: () => ({}),
})

const selectValue = ref('')
const searchValue = ref<[Dayjs, Dayjs]>()

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
  { label: '本季度', value: [dayjs().startOf('quarter' as OpUnitType), dayjs().endOf('quarter' as OpUnitType)] },
  { label: '本年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
]

function handleSelectChange(value: any) {
  config.value.selectParams = value
}

function handleChange(value: [string, string] | [Dayjs, Dayjs]) {
  config.value.searchParams = value
}
</script>

<template>
  <a-form layout="inline">
    <a-form-item v-if="item.key === 'Line' || item.key === 'Bar'" label="显示维度">
      <a-select
        v-model:value="selectValue"
        style="width: 85px;"
        allow-clear
        :options="options"
        @change="handleSelectChange"
      />
    </a-form-item>
    <a-form-item v-if="item.config.metrics?.length > 0">
      <a-range-picker
        v-model:value="searchValue"
        style="width: 200px;"
        show-time
        value-format="YYYY-MM-DD HH:mm:ss"
        :presets="presets"
        @change="handleChange"
      />
    </a-form-item>
  </a-form>
</template>