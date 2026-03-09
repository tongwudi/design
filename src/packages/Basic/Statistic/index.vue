<script lang="ts" setup>
import { useChartData } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as () => DefaultConfig,
    required: true,
  },
})

const { fetchChartData } = useChartData('Statistic')

const defaultData = {
  title: '每月统计用户数据',
  count: 0,
}

const statisticData = ref<{ title: string; count: number }>(defaultData)

async function initChart() {
  const requestData = await fetchChartData(props.chartConfig)
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
  <a-statistic :value="statisticData.count">
    <template #title>
      <span :title="statisticData.title">{{ statisticData.title }}</span>
      <!-- <a-tooltip>
        <template #title>
          <span>{{ statisticData.title }}</span>
        </template>
        <span>{{ statisticData.title }}</span>
      </a-tooltip> -->
    </template>
  </a-statistic>
</template>

<style lang="less" scoped>
.ant-statistic {
  height: 100%;
  line-height: 1.5;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  :deep(&-title) {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(&-content) {
    font-size: 28px;
  }
}
</style>
