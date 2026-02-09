/* eslint-disable no-console */
import type { Dayjs } from 'dayjs'
// import { designApis } from '@/api/design'

export function useChartData(config: DefaultConfig, chartType: string) {
  async function fetchChartData(date: [string, string] | [Dayjs, Dayjs]) {
    const { multiple = true, metrics, lordMetricsId } = config.card
    if (!metrics || metrics?.length === 0) {
      return
    }
    // 多选是二维数组，单选是一维数组
    const metricsStr = multiple ? metrics.map((v: any[]) => v[1]).join(',') : metrics[1]
    // 时间为空也可以发送请求
    const params: any = {
      startTime: date?.[0],
      endTime: date?.[1],
    }
    console.log(chartType, metricsStr, lordMetricsId, params)

    // if (chartType === 'statistic') {
    //   params.metricsId = metricsStr
    //   const { data } = await designApis.getStatisticDetail({ params })
    //   if (!data) {
    //     return
    //   }
    //   return {
    //     title: data.metricsName,
    //     count: data.total,
    //   }
    // }
    // else if (chartType === 'pie') {
    //   let fetchApi
    //   if (metrics.length === 1 && !lordMetricsId) {
    //     params.metricsId = metricsStr
    //     fetchApi = designApis.getPieDetailBySingle
    //   }
    //   else {
    //     params.metricsIdList = metricsStr
    //     params.lordMetricsId = lordMetricsId?.[1] || 0
    //     fetchApi = designApis.getPieDetailByMultiple
    //   }
    //   const { data } = await fetchApi({ params })
    //   const pieData = data?.pieData || []
    //   if (pieData.length === 0) {
    //     return
    //   }
    //   return pieData.map((item: any) => ({
    //     value: item.amount,
    //     id: item.metricsId,
    //     name: item.metricsName || item.periodDate,
    //   }))
    // }
    // else {
    //   params.metricsIdList = metricsStr
    //   const { data = [] } = await designApis.getLineOrBarDetailByMultiple({ params })
    //   if (data.length === 0) {
    //     return
    //   }
    //   return {
    //     xAxisData: data[0]?.dates || [],
    //     seriesData: data.map((item: any) => ({
    //       name: item.metricsName,
    //       type: chartType,
    //       data: item.amounts || [],
    //     })),
    //   }
    // }
  }
  return {
    fetchChartData,
  }
}
