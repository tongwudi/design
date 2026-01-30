<script lang="ts" setup>
const formConfig = defineModel('modelValue', {
  type: Object,
  required: true,
})

const searchTypeOptions = [
  { value: 'date', label: '日期选择框' },
  { value: 'input', label: '文本框' },
  { value: 'select', label: '下拉选择框' },
]
const dataKeyOptions = [
  { value: 'static', label: '静态数据' },
  { value: 'api', label: '动态数据' },
]
const methodOptions = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
]

const activeKey = ref('basic')

function handleChange() {
  formConfig.value.searchValue = ''
}
</script>

<template>
  <a-tabs v-model:active-key="activeKey" centered>
    <a-tab-pane key="basic" tab="基础" />
    <a-tab-pane key="dataSource" tab="数据" />
  </a-tabs>
  <div class="setting-box">
    <template v-if="activeKey === 'basic'">
      <a-form layout="vertical" :model="formConfig">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formConfig.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="是否显示搜索框" name="showSearch">
          <a-switch v-model:checked="formConfig.showSearch" />
        </a-form-item>
        <template v-if="formConfig.showSearch">
          <a-form-item label="搜索框类型" name="searchType">
            <a-select v-model:value="formConfig.searchType" placeholder="请选择搜索框类型" :options="searchTypeOptions" @change="handleChange" />
          </a-form-item>
          <a-form-item label="搜索框字段" name="searchKey">
            <a-input v-model:value="formConfig.searchKey" placeholder="请输入搜索框字段" />
          </a-form-item>
        </template>
      </a-form>
    </template>
    <template v-if="activeKey === 'dataSource'">
      <a-form layout="vertical" :model="formConfig">
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
        </template>
      </a-form>
    </template>
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
