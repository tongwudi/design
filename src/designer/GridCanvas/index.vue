<script lang="ts" setup>
import { GridItem, GridLayout } from 'vue-grid-layout-v3'
import { componentInstall } from '@/utils'
import { fetchChartComponent } from '@/packages'
import { useDesignerStore } from '@/store'
import RenderExtra from './renderExtra.vue'

const props = defineProps({
  preview: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toolbar'])

const layout = defineModel('modelValue', {
  type: Object,
  default: () => ({}),
})

const designerStore = useDesignerStore()
const gridConfig = computed(() => designerStore.gridConfig)
const selectedId = computed(() => designerStore.selectedId)

function toolbar(action: 'setting' | 'remove', item: WidgetItem) {
  emit('toolbar', action, item)
}

function getComponent(item: WidgetItem) {
  componentInstall(item.key, fetchChartComponent(item))
  return item.key
}
</script>

<template>
  <GridLayout
    v-model:layout="layout"
    v-bind="gridConfig"
    :is-draggable="!preview"
    :is-resizable="!preview"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <GridItem
      v-for="item in layout"
      :key="item.i"
      :i="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :min-w="gridConfig.colNum / 6"
      :min-h="gridConfig.colNum / 6"
    >
      <div class="full-card_wrapper">
        <a-card
          class="full-card"
          :class="{ active: selectedId === item.i }"
          :head-style="{ padding: '12px' }"
          :body-style="{ padding: '12px' }"
          :title="item.config.title"
        >
          <template #extra>
            <render-extra
              v-if="item.config.metrics?.length > 0"
              v-model="item.config"
            />
          </template>
          <component :is="getComponent(item)" :chart-config="item.config" />
        </a-card>
        <div v-if="!preview" class="toolbar">
          <a-space :size="0">
            <template #split>
              <a-divider type="vertical" />
            </template>
            <a-tooltip title="删除" placement="bottom">
              <a-typography-link
                type="secondary"
                @click="toolbar('remove', item)"
              >
                <DeleteOutlined />
              </a-typography-link>
            </a-tooltip>
            <a-tooltip title="配置" placement="bottom">
              <a-typography-link
                type="secondary"
                @click="toolbar('setting', item)"
              >
                <SettingOutlined />
              </a-typography-link>
            </a-tooltip>
          </a-space>
        </div>
      </div>
    </GridItem>
  </GridLayout>
</template>

<style lang="less" scoped>
.full-card_wrapper {
  height: 100%;
  position: relative;
  .full-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    :deep(.ant-card-body) {
      flex: 1;
      overflow: hidden;
    }
    &.active {
      box-shadow: 0px 0px 4px #1677ff;
    }
  }
  .toolbar {
    position: absolute;
    top: 0;
    left: 0;
    padding: 4px 8px;
    border: 1px solid #e8e8e8;
    border-bottom-right-radius: 8px;
    background-color: #fff;
    transition: 0.1s linear;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  &:hover .toolbar {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
}
</style>
