<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { useChartData } from '@/hooks'

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

const statisticData = ref<{ title: string; count: number }>(defaultData)

async function initChart() {
  const requestData = await fetchChartData()
  statisticData.value = requestData || defaultData
}

watch(
  () => props.chartConfig.searchParams,
  (newValue) => {
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
  <a-statistic :title="statisticData.title" :value="statisticData.count" />
</template>

<style lang="less" scoped>
.ant-statistic {
  line-height: 1.2;
  :deep(&-content) {
    font-size: 22px;
  }
}
</style>
