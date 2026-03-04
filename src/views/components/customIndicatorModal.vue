<script lang="ts" setup>
import type { CascaderProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
// import { useAsideHook } from '@/hooks'
import dataJson from '../data.json'
// import { cardConfig } from '@/components/index'

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const emit = defineEmits(['submit'])

// const { menuOptions } = useAsideHook()

const formRef = ref()
const formConfig = ref<Partial<DefaultConfig>>({})
const rules: Record<string, Rule[]> = {
  template: [
    {
      type: 'array',
      required: true,
      message: '请选择模板',
      trigger: ['change'],
    },
  ],
}
const widgetConfig = ref<Partial<LayoutItem>>({})

const metricOptions = processOptions(dataJson)

function processOptions(options: any[]): CascaderProps['options'] {
  return options.map((item: any) => ({
    label: item.businessName || item.category,
    value: item.id || item.category,
    children: item.children ? processOptions(item.children) : undefined,
  }))
}

// const handleChangeType: CascaderProps['onChange'] = (
//   _value,
//   selectedOptions,
// ) => {
//   const { category, key } = selectedOptions[1] as ComponentItem
//   formConfig.value = {
//     ...formConfig.value,
//     ...cardConfig?.[category]?.[key],
//   }
//   widgetConfig.value = {
//     ...selectedOptions[1],
//     config: {},
//   }
// }

async function handleSubmit() {
  try {
    await formRef.value.validate()
    const { template, ...rest } = formConfig.value
    widgetConfig.value.config = { ...rest }
    emit('submit', widgetConfig.value)
    handleCancel()
  } catch (error) {
    console.log(error)
  }
}

function handleCancel() {
  visible.value = false
  formRef.value.resetFields()
}
</script>

<template>
  <a-modal
    v-model:open="visible"
    title="自定义指标卡"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" layout="vertical" :model="formConfig" :rules="rules">
      <!-- <a-form-item label="选择模板" name="template">
        <a-cascader
          v-model:value="formConfig.template"
          :options="menuOptions"
          :field-names="{ label: 'name', value: 'key', children: 'children' }"
          @change="handleChangeType"
        />
      </a-form-item> -->
      <a-form-item label="指标卡标题" name="title">
        <a-input v-model:value="formConfig.title" />
      </a-form-item>
      <a-form-item label="选择指标" name="metrics">
        <a-cascader
          v-model:value="formConfig.metrics"
          :options="metricOptions"
          :max-tag-count="1"
          :multiple="formConfig.multiple ?? true"
          show-checked-strategy="SHOW_CHILD"
        />
      </a-form-item>
      <template v-if="formConfig.showlordMetrics">
        <a-form-item label="选择主指标" name="lordMetricsId">
          <a-cascader
            v-model:value="formConfig.lordMetricsId"
            :options="metricOptions"
          >
            <template #displayRender="{ labels }">
              {{ labels[labels.length - 1] }}
            </template>
          </a-cascader>
        </a-form-item>
      </template>
      <a-form-item label="是否显示搜索框" name="showSearch">
        <a-switch v-model:checked="formConfig.showSearch" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
