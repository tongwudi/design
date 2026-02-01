<script lang="ts" setup>
import axios from 'axios'
import { useDesignerStore } from '@/store'

const designerStore = useDesignerStore()

const formConfig = computed({
  get: () => designerStore.selectedConfig as DefaultConfig,
  set: (newConfig: DefaultConfig) => {
    designerStore.updateSelectedConfig(newConfig)
  },
})

const searchTypeOptions = [
  { value: 'date', label: '日期选择框' },
  { value: 'input', label: '文本框' },
  { value: 'select', label: '下拉选择框' },
]
// const dataKeyOptions = [
//   { value: 'static', label: '静态数据' },
//   { value: 'api', label: '动态数据' },
// ]
const methodOptions = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
]

const activeKey = ref('basic')

async function testRequest() {
  try {
    const response = await axios({
      url: formConfig.value.url,
      method: formConfig.value.method,
      // params: formConfig.value.params,
    })
    console.log(response.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}
</script>

<template>
  <a-tabs v-model:active-key="activeKey" centered>
    <a-tab-pane key="basic" tab="基础" />
    <a-tab-pane key="dataSource" tab="数据" />
  </a-tabs>
  <div class="setting-box">
    <a-form layout="vertical" :model="formConfig">
      <template v-if="activeKey === 'basic'">
        <a-form-item label="标题" name="option.title">
          <a-input v-model:value="formConfig.option.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="是否显示搜索框" name="option.showSearch">
          <a-switch v-model:checked="formConfig.option.showSearch" />
        </a-form-item>
        <template v-if="formConfig.option.showSearch">
          <a-form-item label="搜索框类型" name="option.searchType">
            <a-select v-model:value="formConfig.option.searchType" placeholder="请选择搜索框类型" :options="searchTypeOptions" />
          </a-form-item>
          <a-form-item label="搜索框字段" name="option.searchKey">
            <a-input v-model:value="formConfig.option.searchKey" placeholder="请输入搜索框字段" />
          </a-form-item>
        </template>
      </template>
      <template v-if="activeKey === 'dataSource'">
        <!-- <a-form-item label="数据源类型" name="type">
          <a-select v-model:value="formConfig.type" placeholder="请选择数据源类型" :options="dataKeyOptions" />
        </a-form-item>
        <template v-if="formConfig.type === 'api'"> -->
        <a-form-item label="接口地址" name="url">
          <a-input v-model:value="formConfig.url" placeholder="请输入接口地址" />
        </a-form-item>
        <a-row :gutter="12">
          <a-col :span="12">
            <a-form-item label="请求方法" name="method">
              <a-select v-model:value="formConfig.method" placeholder="请选择请求方法" :options="methodOptions" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="数据路径" name="dataPath">
              <a-input v-model:value="formConfig.dataPath" placeholder="请输入数据路径" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <a-button type="primary" block @click="testRequest">测试</a-button>
        </a-form-item>
      </template>
      <!-- </template> -->
    </a-form>
  </div>
</template>

<style lang="less" scoped>
:deep(.ant-tabs-top > .ant-tabs-nav) {
  margin: 0 !important;
}

.setting-box {
  padding: 12px;
}
</style>
