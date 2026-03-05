<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps({
  record: {
    type: Object,
    default: () => {},
  },
})

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const emit = defineEmits(['submit'])

const formState = computed(() => props.record)

const formRef = ref()
const rules: Record<string, Rule[]> = {
  category: [{ required: true, message: '请输入菜单分组' }],
  title: [{ required: true, message: '请输入菜单标题' }],
}

async function handleSubmit() {
  try {
    await formRef.value.validate()
    emit('submit', formState.value)
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
    v-bind="$attrs"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item label="菜单分组" name="category">
        <a-input v-model:value="formState.category" />
      </a-form-item>
      <a-form-item label="菜单标题" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
