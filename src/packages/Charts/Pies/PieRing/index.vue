<script lang="ts" setup>
import * as echarts from 'echarts'
import { useChartData } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData('Pies')

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const defaultData = [
  { value: 20, name: '每月统计用户数据' },
  { value: 10, name: '每月统计用户登录数量' },
]

async function initChart() {
  const requestData = await fetchChartData(props.chartConfig)
  const dataSource = requestData?.length > 0 ? requestData : defaultData
  if (!chartRef.value) {
    return
  }
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
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '60%'],
        label: {
          show: false,
        },
        data: dataSource,
      },
    ],
  }
  chartInstance.setOption(option, true)
}

watch(
  () => props.chartConfig.searchParams,
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
