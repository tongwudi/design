<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { message, Modal } from 'ant-design-vue'
// import { designApis } from '@/apis/design'
import { useDragLayout } from '@/hooks/use-drag-layout'
import { useDesignerStore } from '@/store'

const headerStyle: CSSProperties = {
  height: 'var(--header-height)',
  lineHeight: 'var(--header-height)',
  paddingInline: '20px',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#fff',
}

const siderStyle: CSSProperties = {
  backgroundColor: '#fff',
}

const contentStyle: CSSProperties = {
  height: 'calc(100vh - var(--header-height))',
  overflow: 'auto',
  borderLeft: '1px solid rgba(5, 5, 5, 0.06)',
  borderRight: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#eee',
}

const router = useRouter()
const designerStore = useDesignerStore()

const gridConfig = computed(() => designerStore.gridConfig)
const selectedWidgetId = computed(() => designerStore.selectedWidgetId)

const { layout, setLayoutRef, setItemRef, drag, dragend } = useDragLayout(gridConfig.value)

const open = ref(false)
const formState = ref<Record<string, string>>({})
const loading = ref(false)

let id = ''

onMounted(() => {
  const templateId = sessionStorage.getItem('TEMPLATE_ID')
  if (templateId) {
    id = templateId
  }
  // getData()
})

// async function getData() {
//   if (!id)
//     return
//   const { data } = await designApis.getTemplateDetail({ params: { id } })
//   designerStore.updateLayout(JSON.parse(data?.extraAttrs || '[]'))
//   formState.value = data
// }

function close() {
  sessionStorage.removeItem('TEMPLATE_ID')
  designerStore.clearAllLayout()
  formState.value = {}
}

function clearAll() {
  if (layout.value.length === 0) {
    Modal.error({
      title: '操作提示',
      content: '请先添加组件',
    })
    return
  }
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定清空所有组件吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      designerStore.clearAllLayout()
    },
  })
}

function preview() {
  if (layout.value.length === 0) {
    Modal.error({
      title: '操作提示',
      content: '请先添加组件',
    })
    return
  }
  designerStore.saveLayout()
  const { href } = router.resolve({
    path: '/preview',
  })
  window.open(href, '_blank')
}

function save() {
  if (layout.value.length === 0) {
    Modal.error({
      title: '操作提示',
      content: '请先添加组件',
    })
    return
  }
  if (id) {
    handleUpdate()
  }
  else {
    open.value = true
  }
}

async function saveFn() {
  // loading.value = true
  // const params = {
  //   ...formState.value,
  //   extraAttrs: JSON.stringify(layout.value),
  // }
  // const fetchApi = id ? designApis.updateTemplate : designApis.saveTemplate
  // await fetchApi(params)
  // message.success(id ? '更新成功' : '保存成功')
  // loading.value = false
}

async function handleUpdate() {
  await saveFn()
}

async function handleSubmit() {
  await saveFn()
  setTimeout(() => {
    window.location.reload()
  }, 1500)
  open.value = false
}

function selectWidget(id: string) {
  designerStore.setSelectedWidgetId(id)
}

function removeWidget(id: string) {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定删除该组件吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      designerStore.removeWidget(id)
    },
  })
}
</script>

<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <HeaderBar
        :title="formState.title"
        @close="close"
        @clear-all="clearAll"
        @preview="preview"
        @save="save"
      />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="siderStyle" :width="200">
        <LeftPanel @drag="drag" @dragend="dragend" />
      </a-layout-sider>
      <a-layout-content id="grid-layout" :style="contentStyle">
        <div v-if="layout.length === 0" class="empty">
          <a-empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="暂无组件, 请通过左侧组件菜单添加组件"
            style="color: #2aa198"
          />
        </div>
        <CenterGrid
          v-else
          v-model="layout"
          :grid-config="gridConfig"
          :selected-id="selectedWidgetId"
          @select-widget="selectWidget"
          @remove-widget="removeWidget"
          @set-layout-ref="setLayoutRef"
          @set-item-ref="setItemRef"
        />
      </a-layout-content>
      <a-layout-sider v-if="selectedWidgetId !== ''" :style="siderStyle" :width="300">
        <RightSetting />
      </a-layout-sider>
    </a-layout>
  </a-layout>

  <a-modal v-model:open="open" title="保存模板" :confirm-loading="loading" @ok="handleSubmit">
    <a-form :model="formState">
      <a-form-item label="菜单分组" name="category">
        <a-input v-model:value="formState.category" />
      </a-form-item>
      <a-form-item label="菜单标题" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style lang="less" scoped>
.empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ant-empty {
  :deep(&-image img) {
    margin: auto;
  }
  &-description {
    color: #2aa198
  }
}
</style>
