<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useChartData } from '@/hooks/use-chart-data'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData(props.chartConfig, 'statistic')

const defaultData = {
  title: 'Feedback',
  count: 0,
}

const statisticData = ref<{ title: string, count: number }>(defaultData)

async function initChart() {
  const { searchParams = [] } = props.chartConfig
  const requestData = await fetchChartData(searchParams)
  statisticData.value = requestData || defaultData
}

watch(
  () => props.chartConfig.searchParams,
  async (newValue) => {
    if (!newValue) {
      return
    }
    initChart()
  },
  { deep: true },
)

onMounted(() => {
  setTimeout(initChart, 200)
})
</script>

<template>
  <a-statistic
    :title="statisticData.title"
    :value="statisticData.count"
    :precision="2"
    suffix="%"
    :value-style="{ color: '#cf1322' }"
  >
    <template #prefix>
      <arrow-down-outlined />
    </template>
  </a-statistic>
</template>
