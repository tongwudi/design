import type { AxiosRequestConfig } from 'axios'
import http from '@/utils/http'

export const designApis = {
  // 查询指标模板菜单列表
  getTemplateList: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/template/list`, config),
  // 保存指标模板
  saveTemplate: (data: any): any =>
    http.post(`/statistics/metrics/template/save`, data),
  // 删除指标模板
  deleteTemplate: (data: any): any =>
    http.post(`/statistics/metrics/template/delete`, {}, { params: data }),
  // 更新指标模板
  updateTemplate: (data: any): any =>
    http.post(`/statistics/metrics/template/edit`, data),
  // 查询指标模板详情
  getTemplateDetail: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/template/detail`, config),
  // 获取指标列表
  getBusinessList: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/bi/category/business/list`, config),
  // 获取饼图详情-单指标
  getPieDetailBySingle: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/bi/pie/single`, config),
  // 获取饼图详情-多指标
  getPieDetailByMultiple: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/bi/pie/multiple`, config),
  // 获取折线图/柱状图详情-多指标
  getLineOrBarDetailByMultiple: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/bi/line/multiple`, config),
  // 获取统计数值详情
  getStatisticDetail: (config?: AxiosRequestConfig): any =>
    http.get(`/statistics/metrics/bi/amount/last`, config),
}
