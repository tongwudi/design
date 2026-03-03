<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { message, Modal } from 'ant-design-vue'
// import { designApis } from '@/api/design'
import { useDesignerStore } from '@/store'
import SelectIndicatorModal from '@/views/components/selectIndicatorModal.vue'
import CustomIndicatorModal from '@/views/components/customIndicatorModal.vue'

const headerStyle: CSSProperties = {
  height: 'var(--header-height)',
  lineHeight: 'var(--header-height)',
  paddingInline: '20px',
  borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#fff',
}

const contentStyle: CSSProperties = {
  overflow: 'auto',
  borderLeft: '1px solid rgba(5, 5, 5, 0.06)',
  borderRight: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#f4f6fc',
}

const designerStore = useDesignerStore()

const layout = computed({
  get: () => designerStore.layout,
  set: newLayout => designerStore.updateLayout(newLayout),
})
const gridConfig = computed(() => designerStore.gridConfig)
const selectedWidgetId = computed(() => designerStore.selectedWidgetId)

const menuTitle = ref('')

const showModal2 = ref(false)
const showModal = ref(false)

const id = ref(sessionStorage.getItem('TEMPLATE_ID') || '')
const open = ref(false)
const loading = ref(false)
const title = computed(() => (id.value ? '更新模板' : '保存模板'))
const formState = ref<Record<string, string>>({})
const rules = reactive({
  category: [{ required: true, message: '请输入菜单分组' }],
  title: [{ required: true, message: '请输入菜单标题' }],
})

const btns: any = computed(() => [
  {
    title: '退出编辑',
    icon: 'CloseOutlined',
    isDanger: true,
    show: menuTitle.value,
    clickFn: close,
  },
  {
    title: '自定义指标卡',
    icon: 'PlusOutlined',
    clickFn: custom,
  },
  {
    title: '选择指标卡',
    icon: 'PlusOutlined',
    clickFn: select,
  },
  {
    title: '清空',
    icon: 'DeleteOutlined',
    clickFn: clearAll,
  },
  {
    title: '保存',
    icon: 'SaveOutlined',
    clickFn: save,
  },
])

onMounted(() => {
  id.value && getData()
})

async function getData() {
  // const { data } = await designApis.getTemplateDetail({ params: { id: id.value } })
  // designerStore.updateLayout(JSON.parse(data?.extraAttrs || '[]'))
  // formState.value = data
  // menuTitle.value = data.title
}

function handleSubmit2(widget: DragWidget) {
  localStorage.setItem('widget', JSON.stringify(widget))
}

function onClose() {
  sessionStorage.removeItem('TEMPLATE_ID')
  designerStore.clearAllLayout()
  id.value = ''
  formState.value = {}
  menuTitle.value = ''
}

function close() {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定要退出编辑吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      onClose()
    },
  })
}

function custom() {
  showModal2.value = true
}

const ccc = ref<Partial<LayoutItem>>({})
function select() {
  ccc.value = JSON.parse(localStorage.getItem('widget') || '{}')
  showModal.value = true
}

function handleSelect(info: ComponentItem) {
  const lastItem = layout.value[layout.value.length - 1] || {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  }
  const curRowUsedWidth = lastItem.x + lastItem.w
  let newX, newY
  if (curRowUsedWidth + info.w <= gridConfig.value.colNum) {
    newX = curRowUsedWidth
    newY = lastItem.y
  } else {
    newX = 0
    newY = lastItem.y + lastItem.h
  }
  const widget = {
    ...info,
    i: uuidv4(),
    x: newX,
    y: newY,
  } as DragWidget
  designerStore.addWidget(widget)
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

function save() {
  if (layout.value.length === 0) {
    Modal.error({
      title: '操作提示',
      content: '请先添加组件',
    })
    return
  }
  open.value = true
}

async function handleSubmit() {
  loading.value = true
  // const params = {
  //   ...formState.value,
  //   extraAttrs: JSON.stringify(layout.value),
  // }
  // const fetchApi = id.value ? designApis.updateTemplate : designApis.saveTemplate
  // await fetchApi(params)
  message.success(id.value ? '更新成功' : '保存成功')
  loading.value = false
  onClose()
  open.value = false
  setTimeout(() => {
    window.location.reload()
  }, 1500)
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
              description="暂无组件, 请通过左侧组件菜单添加组件"
            />
          </div>
          <CenterGrid
            v-else
            v-model="layout"
            :selected-id="selectedWidgetId"
            @select="selectWidget"
            @remove="removeWidget"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>

    <CustomIndicatorModal v-model="showModal2" @submit="handleSubmit2" />

    <SelectIndicatorModal
      v-model="showModal"
      :ccc="[ccc]"
      @select="handleSelect"
    />

    <a-modal
      v-model:open="open"
      :title="title"
      :confirm-loading="loading"
      @ok="handleSubmit"
    >
      <a-form :model="formState" :rules="rules">
        <a-form-item label="菜单分组" name="category">
          <a-input v-model:value="formState.category" />
        </a-form-item>
        <a-form-item label="菜单标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
      </a-form>
    </a-modal>
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
