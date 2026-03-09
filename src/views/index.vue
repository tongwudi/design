<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { message, Modal } from 'ant-design-vue'
// import { designApis } from '@/api/designer'
import { useDesignerStore } from '@/store'
import HeaderBar from '@/designer/HeaderBar/index.vue'
import GridCanvas from '@/designer/GridCanvas/index.vue'
import AddMetricModal from '@/designer/components/addMetricModal.vue'
import ConfigModal from '@/designer/components/configModal.vue'
import SaveModal from '@/designer/components/saveModal.vue'

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
const designerStore = useDesignerStore()

const layout = computed({
  get: () => designerStore.layout,
  set: (newLayout) => designerStore.updateLayout(newLayout),
})
// const gridConfig = computed(() => designerStore.gridConfig)
const selectedId = computed(() => designerStore.selectedId)

const id = computed(() => route.meta.menuId as string)
const title = computed(() => (id.value ? '更新模板' : '保存模板'))

const btns: any = computed(() => [
  // {
  //   title: '编辑',
  //   icon: 'EditOutlined',
  //   show: id.value,
  // },
  {
    title: '退出编辑',
    icon: 'CloseOutlined',
    isDanger: true,
    show: menuTitle.value,
    clickFn: close,
  },
  {
    title: '选择指标卡',
    icon: 'PlusOutlined',
    clickFn: openModal,
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

const showModal = ref(false)

const showConfigModal = ref(false)
const formConfig = ref<DefaultConfig>()
const confirmLoading = ref(false)

const show = ref(false)
const formState = ref<Record<string, string>>({})
const loading = ref(false)
const menuTitle = ref('')

onMounted(() => {
  id.value && getData()
  // getData()
})

async function getData() {
  // const { data } = await designApis.getTemplateDetail({ params: { id: id.value } })
  // designerStore.updateLayout(JSON.parse(data?.extraAttrs || '[]'))
  // formState.value = data
  // menuTitle.value = data.title
  const extraAttrs = [
    {
      category: 'Pies',
      categoryName: '饼图',
      key: 'PieRing',
      title: '环形图',
      package: 'Charts',
      w: 12,
      h: 8,
      config: {
        showlordMetrics: true,
      },
      i: 'a7a4caf2-fa30-49cb-8b97-d8cde03dc580',
      x: 12,
      y: 0,
    },
    {
      category: 'Bars',
      categoryName: '柱状图',
      key: 'BarCommon',
      title: '基础柱状图',
      package: 'Charts',
      w: 12,
      h: 8,
      config: {
        showSelect: true,
        showlordMetrics: false,
        metrics: [
          ['用户相关统计', '2014137236251660290'],
          ['用户相关统计2', '2015983101094354947'],
        ],
        title: '风帆股份',
      },
      i: '86e56084-f0cd-4235-b408-e7e0df1eeceb',
      x: 0,
      y: 0,
    },
  ]
  designerStore.updateLayout(extraAttrs)
}

function onClose() {
  designerStore.clearAllLayout()
  menuTitle.value = ''
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
  designerStore.addWidget(widget)
  showModal.value = false
}

function handleSubmit(config: DefaultConfig) {
  designerStore.updateSelectedConfig(selectedId.value, config)
  showConfigModal.value = false
}

async function handleSave(params: Record<string, string>) {
  console.log(params, layout.value)
  loading.value = true
  // const params = {
  //   ...formState.value,
  //   extraAttrs: JSON.stringify(layout.value),
  // }
  // const fetchApi = id.value ? designApis.updateTemplate : designApis.saveTemplate
  // await fetchApi(params)
  message.success(id.value ? '更新成功' : '保存成功')
  loading.value = false
  show.value = false
  // onClose()
  // setTimeout(() => {
  //   window.location.reload()
  // }, 1500)
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

function openModal() {
  showModal.value = true
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
  show.value = true
}

function toolbar(action: 'setting' | 'remove', item: WidgetItem) {
  switch (action) {
    case 'setting':
      designerStore.setSelectedId(item.i)
      showConfigModal.value = true
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
          designerStore.removeWidget(item.i)
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
              description="暂无组件, 请通过左侧组件菜单添加组件"
            />
          </div>
          <GridCanvas v-else v-model="layout" @toolbar="toolbar" />
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
