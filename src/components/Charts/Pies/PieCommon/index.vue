<script lang="ts" setup>
import * as echarts from 'echarts'
import { useChartData } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData(props.chartConfig, 'pie')

const chartRef = ref<HTMLDivElement | null>(null)
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const defaultData = [
  { value: 0, id: '2015983101094354947', name: '每月统计用户数据' },
  { value: 0, id: '2014137236251660290', name: '每月统计用户登录数量' },
]

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
    series: [
      {
        type: 'pie',
        name: '',
        center: ['50%', '60%'],
        radius: '60%',
        label: {
          show: false,
        },
        data: requestData || defaultData,
      },
    ],
  }
  chartInstance.setOption(option, true)
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
