<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { GridItem, GridLayout } from 'vue-grid-layout-v3'
import { componentInstall, fetchChartComponent } from '@/utils'

const props = defineProps({
  gridConfig: {
    type: Object,
    default: () => ({}),
  },
  preview: {
    type: Boolean,
    default: false,
  },
  selectedId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select', 'remove'])

const layout = defineModel('modelValue', {
  type: Object,
  default: () => ({}),
})

function select(id: string) {
  if (props.preview) {
    return
  }
  emit('select', id)
}

function remove(id: string | number) {
  emit('remove', id)
}

function renderComponent(item: ComponentItem) {
  componentInstall(item.key, fetchChartComponent(item))
  return item.key
}
</script>

<template>
  <GridLayout
    v-model:layout="layout"
    v-bind="gridConfig"
    :is-draggable="!preview"
    :is-resizable="false"
  >
    <GridItem
      v-for="item in layout"
      :key="item.i"
      :i="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
    >
      <div class="full-card_wrapper">
        <!-- :class="{ active: selectedId === item.i }" -->
        <a-card
          class="full-card"
          :title="item.config.title"
          @click.stop="select(item.i)"
        >
          <template v-if="item.config.showSearch" #extra>
            <render-extra v-model="item.config" :item="item" />
          </template>
          <component :is="renderComponent(item)" :chart-config="item.config" />
        </a-card>
        <div v-if="!preview" class="toolbar">
          <a-space :size="0">
            <template #split>
              <a-divider type="vertical" />
            </template>
            <a-tooltip title="删除" placement="bottom">
              <a-typography-link type="secondary" @click="remove(item.i)">
                <DeleteOutlined />
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
