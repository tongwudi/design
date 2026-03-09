<script lang="ts" setup>
import * as echarts from 'echarts'
import { useChartData } from '@/hooks'
import { generateSourceData } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData('Lines')

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const defaultData = [
  {
    metricsName: '统计数量',
    dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    amounts: [150, 230, 224, 218, 135, 147, 260],
  },
]

async function initChart() {
  const requestData = await fetchChartData(props.chartConfig)
  const result = requestData?.length > 0 ? requestData : defaultData
  const dataSource = generateSourceData(result)
  if (!chartRef.value) {
    return
  }
  chartInstance?.dispose()
  chartInstance = echarts.init(chartRef.value)
  const option = {
    legend: {
      type: 'scroll',
      top: 0,
    },
    tooltip: {},
    grid: {
      top: 40,
      bottom: 0,
      left: 10,
      right: 10,
      containLabel: true,
    },
    xAxis: { type: 'category' },
    yAxis: { type: 'value' },
    dataset: { source: dataSource },
    series: result.map(() => ({ type: 'bar' })),
  }
  chartInstance.setOption(option, true)
}

watch(
  () => [props.chartConfig.selectParams, props.chartConfig.searchParams],
  () => {
    initChart()
  },
)

onMounted(() => {
  setTimeout(initChart, 200)
  initResizeObserver()
})

onUnmounted(() => {
  chartInstance?.dispose()
  resizeObserver?.disconnect()
})

function initResizeObserver() {
  if (!chartRef.value) {
    return
  }
  resizeObserver = new ResizeObserver(() => {
    chartInstance?.resize()
  })
  resizeObserver.observe(chartRef.value)
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%" />
</template>
