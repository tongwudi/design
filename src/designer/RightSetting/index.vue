<script lang="ts" setup>
import type { CascaderProps } from 'ant-design-vue'
// import { designApis } from '@/apis/design'
import { useDesignerStore } from '@/store'

const designerStore = useDesignerStore()

const formConfig = computed({
  get: () => designerStore.getSelectedConfig as DefaultConfig,
  set: (newConfig: DefaultConfig) => {
    designerStore.updateConfig(newConfig)
  },
})

// const activeKey = ref('card')

// const dataKeyOptions = [
//   { value: 'static', label: '静态数据' },
//   { value: 'api', label: '动态数据' },
// ]
// const methodOptions = [
//   { value: 'GET', label: 'GET' },
//   { value: 'POST', label: 'POST' },
// ]

const metricOptions = ref<CascaderProps['options']>([])
// function processOptions(options: any[]): CascaderProps['options'] {
//   return options.map((item: any) => ({
//     label: item.businessName || item.category,
//     value: item.id || item.category,
//     children: item.children ? processOptions(item.children) : undefined,
//   }))
// }

// onMounted(async () => {
//   const { data } = await designApis.getBusinessList()
//   metricOptions.value = processOptions(data)
// })

function handleMetricsChange(value: any[]) {
  if (value.length === 0) {
    formConfig.value.showSearch = false
  }
}
</script>

<template>
  <!-- <a-tabs v-model:active-key="activeKey" centered>
    <a-tab-pane key="card" tab="卡片" />
    <a-tab-pane key="interface" tab="数据" />
  </a-tabs> -->
  <div class="setting-box">
    <a-form layout="vertical" :model="formConfig">
      <!-- <template v-if="activeKey === 'card'"> -->
      <a-form-item label="标题" name="title">
        <a-input v-model:value="formConfig.title" />
      </a-form-item>
      <a-form-item label="指标列表" name="metrics">
        <a-cascader
          v-model:value="formConfig.metrics"
          :options="metricOptions"
          :max-tag-count="1"
          :multiple="formConfig.multiple ?? true"
          show-checked-strategy="SHOW_CHILD"
          placeholder="请选择指标"
          @change="handleMetricsChange"
        />
      </a-form-item>
      <template v-if="formConfig.showlordMetrics">
        <a-form-item label="主指标" name="lordMetricsId">
          <a-cascader
            v-model:value="formConfig.lordMetricsId"
            :options="metricOptions"
            placeholder="请选择主指标"
          >
            <template #displayRender="{ labels }">
              {{ labels[labels.length - 1] }}
            </template>
          </a-cascader>
        </a-form-item>
      </template>
      <template v-if="formConfig.metrics?.length">
        <a-form-item label="是否显示搜索框" name="showSearch">
          <a-switch v-model:checked="formConfig.showSearch" />
        </a-form-item>
      </template>
      <!-- </template> -->
      <!-- <template v-if="activeKey === 'interface'">
        <a-form-item label="数据源类型" name="type">
          <a-select v-model:value="formConfig.type" placeholder="请选择数据源类型" :options="dataKeyOptions" />
        </a-form-item>
        <template v-if="formConfig.type === 'api'">
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
            <a-button type="primary" block>
              测试
            </a-button>
          </a-form-item>
        </template>
      </template> -->
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
