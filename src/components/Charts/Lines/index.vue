<script lang="ts" setup>
import * as echarts from 'echarts'
import axios from 'axios'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const echartsRef = ref(null)
let myChart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const getMergedOption = async () => {
  if (props.chartConfig.url) {
    const response = await axios({
      url: props.chartConfig.url,
      method: props.chartConfig.method,
    })
    console.log(response.data)
  }
  const baseOption = {
    legend: {
      top: 'top',
    },
    tooltip: {},
    grid: {
      top: '12%',
      bottom: 0,
      left: '4%',
      right: '2%',
      containLabel: true,
    },
    dataset: {
      source: [
        ['product', '2015', '2016', '2017'],
        ['Matcha Latte', 43.3, 85.8, 93.7],
        ['Milk Tea', 83.1, 73.4, 55.1],
        ['Cheese Cocoa', 86.4, 65.2, 82.5],
        ['Walnut Brownie', 72.4, 53.9, 39.1],
      ],
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
  }
  return baseOption
}

async function initEChart() {
  if (!echartsRef.value) {
    return
  }
  if (myChart) {
    myChart.dispose()
  }
  myChart = echarts.init(echartsRef.value, null, { renderer: 'canvas' })
  myChart.setOption(await getMergedOption(), true)
}

function initResizeObserver() {
  if (!echartsRef.value) {
    return
  }
  resizeObserver = new ResizeObserver(() => {
    myChart?.resize()
  })
  resizeObserver.observe(echartsRef.value)
}

// watch(
//   () => props.chartConfig,
//   () => {
//     initEChart()
//   },
//   { deep: true },
// )

onMounted(() => {
  setTimeout(initEChart, 500)
  initResizeObserver()
})

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div ref="echartsRef" style="width: 100%; height: 100%" />
</template>
