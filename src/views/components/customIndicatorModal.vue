<script lang="ts" setup>
import type { CascaderProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useDesignerStore } from '@/store'
import dataJson from '../data.json'

const props = defineProps({
  record: {
    type: Object as () => DefaultConfig,
    default: () => {},
  },
})

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const emit = defineEmits(['submit'])

const designerStore = useDesignerStore()

const formConfig = computed(() => props.record)

const formRef = ref()
const rules: Record<string, Rule[]> = {}
const metricOptions = processOptions(dataJson)

watch(visible, newVal => {
  if (!newVal) {
    formRef.value.resetFields()
    designerStore.setSelectedId('')
  }
})

function processOptions(options: any[]): CascaderProps['options'] {
  return options.map((item: any) => ({
    label: item.businessName || item.category,
    value: item.id || item.category,
    children: item.children ? processOptions(item.children) : undefined,
  }))
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    emit('submit', formConfig.value)
  } catch (error) {
    console.log(error)
  }
}

function handleCancel() {
  visible.value = false
}
</script>

<template>
  <a-modal
    v-model:open="visible"
    title="自定义指标卡2"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" layout="vertical" :model="formConfig" :rules="rules">
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
    </a-form>
  </a-modal>
</template>
