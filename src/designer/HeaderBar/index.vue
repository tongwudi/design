<script  lang="ts" setup>
defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  close: []
  clearAll: []
  preview: []
  save: []
}>()

function close() {
  emit('close')
}

function clearAll() {
  emit('clearAll')
}

function preview() {
  emit('preview')
}

function save() {
  emit('save')
}
</script>

<template>
  <a-row justify="space-between">
    <div class="header-title">
      {{ title || '仪表盘设计器' }}
    </div>
    <a-space>
      <a-button v-if="title" type="link" danger @click="close">
        <template #icon>
          <CloseOutlined />
        </template>
        取消
      </a-button>
      <a-button type="link" @click="clearAll">
        <template #icon>
          <DeleteOutlined />
        </template>
        清空
      </a-button>
      <a-button type="link" @click="preview">
        <template #icon>
          <EyeOutlined />
        </template>
        预览
      </a-button>
      <a-button type="link" @click="save">
        <template #icon>
          <SaveOutlined />
        </template>
        保存
      </a-button>
    </a-space>
  </a-row>
</template>

<style lang="less" scoped>
.ant-btn-link {
  padding: 4px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
}
</style>
