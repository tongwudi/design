<script  lang="ts" setup>
import { Modal } from 'ant-design-vue'

const emit = defineEmits<{
  clearAll: []
  preview: [fn: () => void]
}>()

const router = useRouter()

function clearAll() {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定清空所有组件吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      emit('clearAll')
    },
  })
}

function preview() {
  emit('preview', () => {
    const { href } = router.resolve({
      path: '/preview',
    })
    window.open(href, '_blank')
  })
}
</script>

<template>
  <a-row justify="space-between">
    <div class="header-title">
      仪表盘设计器
    </div>
    <a-space>
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
      <a-button type="link">
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
