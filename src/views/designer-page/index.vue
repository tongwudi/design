<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Modal } from 'ant-design-vue'
// import { useGridLayout } from '@/hooks'
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

const layout = computed({
  get: () => designerStore.layout,
  set: newLayout => designerStore.updateLayout(newLayout),
})
const gridConfig = computed(() => designerStore.gridConfig)
const selectedConfig = computed(() => designerStore.selectedConfig)
const selectedWidgetId = computed(() => designerStore.selectedWidgetId)

// const {
//   drag,
//   dragend,
//   setLayoutRef,
//   setItemRef,
// } = useGridLayout(layout, gridConfig)

const layoutRef = ref<any>({})
const itemRefs = ref<any>({})
const mouseXY = { x: 0, y: 0 }
let DragPos: any = {}

onMounted(() => {
  document.addEventListener('dragover', (e) => {
    mouseXY.x = e.clientX
    mouseXY.y = e.clientY
  }, false)
})

function setLayoutRef(el: HTMLElement) {
  layoutRef.value = el
}

function setItemRef(el: HTMLElement, item: any) {
  itemRefs.value[item.i] = el
}

async function drag(component: any) {
  const parentRect = document.getElementById('grid-layout')?.getBoundingClientRect() as DOMRect
  let mouseInGrid = false
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    mouseInGrid = true
  }
  const index = layout.value.findIndex(item => item.i === 'drop')
  if (mouseInGrid === true && (index === -1)) {
    designerStore.addWidget({
      ...component,
      i: 'drop',
      x: (layout.value.length * 2) % gridConfig.value.colNum,
      y: layout.value.length + gridConfig.value.colNum,
    })
    await nextTick()
  }
  const itemRef = itemRefs.value.drop
  if (!itemRef) {
    return
  }
  if (index === -1) {
    return
  }
  if (itemRef.el.style) {
    itemRef.el.style.display = 'none'
  }
  const new_pos = itemRef.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
  if (mouseInGrid === true) {
  // dragEvent的参数分别是：[eventName, i, x, y, h, w]
    layoutRef.value.emitter.emit('dragEvent', ['dragstart', 'drop', new_pos.x, new_pos.y, component.h, component.w])
    DragPos = {
      ...layout.value[index],
      i: String(new Date().getTime()),
    }
  }
  else {
    layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', new_pos.x, new_pos.y])
    layout.value = layout.value.filter(obj => obj.i !== 'drop')
    await nextTick()
  }
}

async function dragend() {
  const parentRect = document.getElementById('grid-layout')?.getBoundingClientRect() as DOMRect
  let mouseInGrid = false
  if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
    mouseInGrid = true
  }
  if (mouseInGrid === true) {
    layoutRef.value.emitter.emit('dragEvent', ['dragend', 'drop', DragPos.x, DragPos.y])
    layout.value = layout.value.filter(obj => obj.i !== 'drop')
    designerStore.addWidget({ ...DragPos })
    await nextTick()
    layoutRef.value.emitter.emit('dragEvent', ['dragend', DragPos.i, DragPos.x, DragPos.y])
  }
}

function clearAll() {
  Modal.confirm({
    title: '操作提示',
    type: 'warning',
    content: '确定清空所有组件吗?',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      designerStore.clearLayout()
    },
  })
}

function preview() {
  designerStore.saveLayout(layout.value)
  const { href } = router.resolve({
    path: '/preview',
  })
  window.open(href, '_blank')
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
      <HeaderBar @preview="preview" @clear-all="clearAll" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider :style="siderStyle" :width="200">
        <LeftPanel @drag="drag" @dragend="dragend" />
      </a-layout-sider>
      <a-layout-content id="grid-layout" :style="contentStyle">
        <div v-if="layout.length === 0" class="empty">
          <a-empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description="暂无组件,请通过左侧组件菜单添加组件"
            style="color: #2aa198"
          />
        </div>
        <RenderGrid
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
      <a-layout-sider :style="siderStyle" :width="300">
        <RightSetting v-if="selectedWidgetId !== ''" v-model="selectedConfig" />
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.empty {
  height: calc(100vh - var(--header-height));
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
