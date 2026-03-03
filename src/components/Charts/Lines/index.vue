<script lang="ts" setup>
import * as echarts from 'echarts'
import { useChartData } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData(props.chartConfig, 'line')

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const defaultData = {
  xAxisData: ['2026-01', '2026-02', '2026-03'],
  seriesData: [
    { name: '下载统计-每月统计下载数量', type: 'line', data: [22.00, 0, 0] },
    { name: '用户相关统计-每月统计用户登录数量', type: 'line', data: [50.00, 60.00, 0] },
  ],
}

async function initChart() {
  if (!chartRef.value) {
    return
  }
  const requestData = await fetchChartData()
  if (chartInstance) {
    chartInstance.dispose()
  }
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
    xAxis: {
      type: 'category',
      data: requestData?.xAxisData || defaultData.xAxisData,
    },
    yAxis: {},
    series: requestData?.seriesData || defaultData.seriesData,
  }
  chartInstance.setOption(option, true)
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
