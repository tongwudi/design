<script lang="ts" setup>
import * as echarts from 'echarts'

const echartsRef = ref(null)
let myChart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

function initEChart() {
  if (!echartsRef.value) {
    return
  }
  if (myChart) {
    myChart.dispose()
  }
  myChart = echarts.init(echartsRef.value, null, { renderer: 'canvas' })
  const option = {
    // title: {
    //   text: '柱状图',
    // },
    grid: {
      top: '8%',
      bottom: 0,
      left: '4%',
      right: '2%',
    },
    xAxis: {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 5],
      },
    ],
  }
  myChart.setOption(option)
}

function initResizeObserver() {
  if (!echartsRef.value) {
    return
  }
  resizeObserver = new ResizeObserver(() => {
    if (myChart) {
      myChart.resize()
    }
  })
  resizeObserver.observe(echartsRef.value)
}

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
  <div ref="echartsRef" style="width: 100%; height: 100%;" />
</template>
