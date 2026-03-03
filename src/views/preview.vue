<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { useDesignerStore } from '@/store'

const contentStyle: CSSProperties = {
  backgroundColor: '#eee',
  position: 'relative',
}

const route = useRoute()
const router = useRouter()
const designerStore = useDesignerStore()

const layout = ref([])
const formState = ref<any>({})

const showToolbar = ref(false)

const id = route.meta.menuId as string

onMounted(() => {
  if (!id) {
    layout.value = designerStore.getLayout()
  }
  // getTemplateDetail()
})

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
  router.push({ name: 'Designer' })
}
</script>

<template>
  <a-layout style="min-height: 100%">
    <a-layout-content
      :style="contentStyle"
      @mouseenter="showToolbar = true"
      @mouseleave="showToolbar = false"
    >
      <CenterGrid v-model="layout" preview />
      <div v-if="id && showToolbar" class="toolbar">
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
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="less">
.toolbar {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px 8px;
  border-bottom-left-radius: 8px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
}
</style>
