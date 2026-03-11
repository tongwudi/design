<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { message, Modal } from 'ant-design-vue'
import { v4 as uuidv4 } from 'uuid'
// import { designApis } from '@/apis'
import AddMetricModal from '@/designer/components/addMetricModal.vue'
import ConfigModal from '@/designer/components/configModal.vue'
import SaveModal from '@/designer/components/saveModal.vue'
import GridCanvas from '@/designer/GridCanvas/index.vue'
import HeaderBar from '@/designer/HeaderBar/index.vue'
// import { useDesignerStore } from '@/store'

const headerStyle: CSSProperties = {
  height: 'var(--header-height)',
  lineHeight: 'var(--header-height)',
  paddingInline: '20px',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#fff',
}

const contentStyle: CSSProperties = {
  overflow: 'auto',
  backgroundColor: '#f4f6fc',
}

const route = useRoute()
// const designerStore = useDesignerStore()
// const gridConfig = computed(() => designerStore.gridConfig)

const layout = ref<WidgetItem[]>([])
const cacheLayout = ref<WidgetItem[]>([])
const selectedId = ref()

const id = computed(() => route.meta.menuId as string)
const title = computed(() => (id.value ? '更新' : '保存'))
const preview = ref(false)
const menuTitle = ref('')

const showModal = ref(false)

const showConfigModal = ref(false)
const formConfig = ref<DefaultConfig>()
const confirmLoading = ref(false)

const show = ref(false)
const formState = ref<Record<string, string>>({})
const loading = ref(false)

const btns: any = computed(() => [
  {
    title: '编辑',
    icon: 'EditOutlined',
    show: preview.value,
    clickFn: () => {
      preview.value = false
      cacheLayout.value = [...layout.value]
    },
  },
  {
    title: '删除',
    isDanger: true,
    icon: 'DeleteOutlined',
    show: preview.value,
    clickFn: removePage,
  },
  {
    title: '退出编辑',
    icon: 'CloseOutlined',
    isDanger: true,
    show: !!id.value && !preview.value,
    clickFn: () => {
      Modal.confirm({
        title: '操作提示',
        type: 'warning',
        content: '确定要退出编辑吗？退出编辑后将无法保存',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          preview.value = true
          layout.value = [...cacheLayout.value]
        },
      })
    },
  },
  {
    title: '选择指标卡',
    icon: 'PlusOutlined',
    show: !preview.value,
    clickFn: () => {
      showModal.value = true
    },
  },
  {
    title: '清空',
    icon: 'DeleteOutlined',
    show: !preview.value,
    clickFn: clearAll,
  },
  {
    title,
    icon: 'SaveOutlined',
    show: !preview.value,
    clickFn: savePage,
  },
])

onMounted(() => {
  id.value && getData()
})

async function getData() {
  // const { data } = await designApis.getTemplateDetail({ params: { id: id.value } })
  // layout.value = JSON.parse(data?.extraAttrs || '[]')
  // formState.value = data
  // menuTitle.value = data.title
  preview.value = true
}

function handleAdd(item: WidgetItem) {
  // const lastItem = layout.value[layout.value.length - 1] || {
  //   x: 0,
  //   y: 0,
  //   w: 0,
  //   h: 0,
  // }
  // const curRowUsedWidth = lastItem.x + lastItem.w
  // let newX, newY
  // if (curRowUsedWidth + item.w <= gridConfig.value.colNum) {
  //   newX = curRowUsedWidth
  //   newY = lastItem.y
  // } else {
  //   newX = 0
  //   newY = lastItem.y + lastItem.h
  // }
  const widget = {
    ...item,
    i: uuidv4(),
    x: 0,
    y: 0,
  }
  layout.value.push(widget)
  showModal.value = false
}

function handleSubmit(config: DefaultConfig) {
  const index = layout.value.findIndex(obj => obj.i === selectedId.value)
  if (index !== -1) {
    layout.value[index]!.config = { ...config }
  }
  showConfigModal.value = false
}

async function handleSave(data: Record<string, string>) {
  console.log(data)
  loading.value = true
  // const params = {
  //   ...data,
  //   extraAttrs: JSON.stringify(layout.value),
  // }
  // const fetchApi = id.value ? designApis.updateTemplate : designApis.saveTemplate
  // await fetchApi(params)
  message.success(id.value ? '更新成功' : '保存成功')
  loading.value = false
  show.value = false
  setTimeout(() => {
    window.location.reload()
  }, 1500)
}

function removePage() {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定删除当前页面吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      // await designApis.deleteTemplate({ id: id.value })
      message.success('删除成功')
      // setTimeout(() => {
      //   router.push('/').then(() => {
      //     window.location.reload()
      //   })
      // }, 1500)
    },
  })
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
      layout.value = []
      selectedId.value = ''
    },
  })
}

function savePage() {
  if (layout.value.length === 0) {
    Modal.error({
      title: '操作提示',
      content: '请先添加组件',
    })
    return
  }
  show.value = true
}

function toolbar(action: 'setting' | 'remove', item: WidgetItem) {
  switch (action) {
    case 'setting':
      showConfigModal.value = true
      selectedId.value = item.i
      formConfig.value = { ...item.config }
      break
    case 'remove':
      Modal.confirm({
        title: '操作提示',
        type: 'warning',
        content: '确定删除该指标卡吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          layout.value = layout.value.filter(obj => obj.i !== item.i)
        },
      })
  }
}
</script>

<template>
  <div class="designer">
    <a-layout style="height: 100%">
      <a-layout-header :style="headerStyle">
        <HeaderBar :title="menuTitle" :btns="btns" />
      </a-layout-header>
      <a-layout>
        <a-layout-content :style="contentStyle">
          <div v-if="layout.length === 0" class="empty">
            <a-empty
              style="color: #2aa198"
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            />
          </div>
          <GridCanvas
            v-else
            v-model="layout"
            :preview="preview"
            @toolbar="toolbar"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>

    <AddMetricModal v-model="showModal" @add="handleAdd" />

    <ConfigModal
      v-model="showConfigModal"
      :record="formConfig"
      :confirm-loading="confirmLoading"
      @submit="handleSubmit"
    />

    <SaveModal
      v-model="show"
      :title="title"
      :record="formState"
      :confirm-loading="loading"
      @save="handleSave"
    />
  </div>
</template>

<style lang="less" scoped>
.designer {
  height: 100%;
}
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
    color: #2aa198;
  }
}
</style>
