import { designApis } from '@/api/designer'

export function useChartData(chartType: string) {
  async function fetchChartData(config: DefaultConfig) {
    const { multiple = true, metrics, lordMetricsId, searchParams: date, selectParams } = config
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
    if (chartType === 'Statistic') {
      params.metricsId = metricsStr
      const { data } = await designApis.getStatisticDetail({ params })
      if (!data) {
        return
      }
      return {
        title: data.metricsName,
        count: data.total,
      }
    }
    else if (chartType === 'Pies') {
      let fetchApi
      if (metrics.length === 1 && !lordMetricsId) {
        params.metricsId = metricsStr
        fetchApi = designApis.getPieDetailBySingle
      }
      else {
        params.metricsIdList = metricsStr
        params.lordMetricsId = lordMetricsId?.[1] || 0
        fetchApi = designApis.getPieDetailByMultiple
      }
      const { data } = await fetchApi({ params })
      const pieData = data.pieData || []
      return pieData.map((item: any) => ({
        value: item.amount,
        id: item.metricsId,
        name: item.metricsName || item.periodDate,
      })) ?? []
    }
    else if (chartType === 'Lines' || chartType === 'Bars'){
      params.metricsIdList = metricsStr
      params.displayDimension = selectParams
      const { data } = await designApis.getLineOrBarDetailByMultiple({ params })
      return data || []
    }
  }
  return {
    fetchChartData,
  }
}
