<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Modal } from 'ant-design-vue'
import { useGridLayout } from '@/hooks'
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

const designerStore = useDesignerStore()

const layout = computed({
  get: () => designerStore.layout,
  set: newLayout => designerStore.updateLayout(newLayout),
})

const gridConfig = computed(() => designerStore.gridConfig)

const selectedConfig = computed(() => designerStore.selectedConfig)

const selectedWidgetId = computed(() => designerStore.selectedWidgetId)

const {
  drag,
  dragend,
  setLayoutRef,
  setItemRef,
} = useGridLayout(layout, gridConfig)

function clearAll() {
  designerStore.clearAllWidgets()
}

function preview(callback: () => void) {
  designerStore.updateLayout(layout.value)
  callback()
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
        <div v-for="item in layout" :key="item.i">
          {{ item }}
        </div>
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
