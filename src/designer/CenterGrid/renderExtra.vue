<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { Dayjs, OpUnitType } from 'dayjs'
import dayjs from 'dayjs'

const config = defineModel('modelValue', {
  type: Object,
  default: () => ({}),
})

const searchValue = ref<[string, string] | [Dayjs, Dayjs]>()

const presets = [
  { label: '当天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: '本季度', value: [dayjs().startOf('quarter' as OpUnitType), dayjs().endOf('quarter' as OpUnitType)] },
  { label: '本年', value: [dayjs().startOf('year'), dayjs().endOf('year')] },
]

async function handleChange(value: [string, string] | [Dayjs, Dayjs]) {
  config.value.searchParams = value
}
</script>

<template>
  <a-range-picker
    v-model:value="searchValue"
    style="width: 200px;"
    show-time
    value-format="YYYY-MM-DD HH:mm:ss"
    :presets="presets"
    @change="handleChange"
  />
</template>
