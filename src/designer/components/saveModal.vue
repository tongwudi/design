<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'

const props = defineProps({
  record: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['save'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const formState = computed(() => props.record)

const formRef = ref()
const rules: Record<string, Rule[]> = {
  category: [{ required: true, message: '请输入菜单分组' }],
  title: [{ required: true, message: '请输入菜单标题' }],
}

watch(visible, (newVal) => {
  if (!newVal) {
    formRef.value.resetFields()
  }
})

async function handleSave() {
  try {
    await formRef.value.validate()
    emit('save', formState.value)
  }
  catch (error) {
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
    v-bind="$attrs"
    @ok="handleSave"
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
