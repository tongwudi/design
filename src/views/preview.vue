<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { message, Modal } from 'ant-design-vue'

const contentStyle: CSSProperties = {
  overflow: 'auto',
  backgroundColor: '#eee',
}

// const route = useRoute()
const router = useRouter()

const layout = ref([])

const formState = ref<any>({})

// const id = route.meta.menuId as string

// onMounted(() => {
//   getTemplateDetail()
// })

// async function getTemplateDetail() {
//   const { data } = await designApis.getTemplateDetail({ params: { id } })
//   layout.value = JSON.parse(data?.extraAttrs || '[]')
//   formState.value = data
// }

async function removeTemplate() {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定删除当前页面吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      // await designApis.deleteTemplate({ id })
      message.success('删除成功')
      setTimeout(() => {
        router.push('/').then(() => {
          window.location.reload()
        })
      }, 1500)
    },
  })
}

function editTemplate() {
  sessionStorage.setItem('TEMPLATE_ID', formState.value.id)
  setTimeout(() => {
    router.push({ name: 'Designer' })
  }, 100)
}
</script>

<template>
  <a-layout class="preview-layout">
    <a-layout-content :style="contentStyle">
      <CenterGrid v-model="layout" preview />
    </a-layout-content>
    <div class="toolbar">
      <a-space :size="0">
        <template #split>
          <a-divider type="vertical" />
        </template>
        <a-tooltip title="删除" placement="bottom">
          <a-typography-link type="secondary" @click="removeTemplate">
            <DeleteOutlined />
          </a-typography-link>
        </a-tooltip>
        <a-tooltip title="编辑" placement="bottom">
          <a-typography-link type="secondary" @click="editTemplate">
            <EditOutlined />
          </a-typography-link>
        </a-tooltip>
      </a-space>
    </div>
  </a-layout>
</template>

<style scoped lang="less">
.preview-layout {
  height: 100%;
  position: relative;
  .toolbar {
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px 8px;
    border-bottom-left-radius: 8px;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.12s ease;
  }
  &:hover .toolbar {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
