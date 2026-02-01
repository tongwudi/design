<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { DatePicker, Input, Select } from 'ant-design-vue'
import { GridItem, GridLayout } from 'vue-grid-layout-v3'
import Bars from '@/components/Charts/Bars/index.vue'
import Lines from '@/components/Charts/Lines/index.vue'
import Pies from '@/components/Charts/Pies/index.vue'

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

const emit = defineEmits(['setLayoutRef', 'setItemRef', 'selectWidget', 'removeWidget'])

const layout = defineModel('modelValue', {
  type: Object,
  default: () => ({}),
})

const hoverKey = ref<string>('')

function setLayoutRef(el: HTMLElement) {
  if (props.preview) {
    return
  }
  emit('setLayoutRef', el)
}

function setItemRef(el: HTMLElement, item: any) {
  if (props.preview) {
    return
  }
  emit('setItemRef', el, item)
}

function selectWidget(id: string) {
  if (props.preview) {
    return
  }
  emit('selectWidget', id)
}

function removeWidget(id: string | number) {
  emit('removeWidget', id)
}

function getSearchComponent(type: string) {
  const componentMap: Record<string, any> = {
    date: DatePicker,
    input: Input,
    select: Select,
  }
  return componentMap[type] || componentMap.date
}

function renderComponentProps(type: string) {
  const componentMap: Record<string, any> = {
    date: {
      valueFormat: 'YYYY-MM-DD',
      onChange: (value: string) => {
        console.log(value)
      },
    },
    input: {
      onPressEnter: (e: any) => {
        console.log(e)
      },
    },
    select: {
      options: [],
    },
  }
  return componentMap[type] || componentMap.date
}
</script>

<template>
  <GridLayout
    :ref="setLayoutRef"
    v-model:layout="layout"
    v-bind="gridConfig"
    :is-draggable="!preview"
    :is-resizable="!preview"
  >
    <GridItem
      v-for="item in layout"
      :key="item.i"
      :ref="(el: HTMLElement) => setItemRef(el, item)"
      :i="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :min-w="item.minW"
      :min-h="item.minH"
    >
      <div
        v-if="item.i !== 'drop'"
        class="full-card_wrapper"
        @mouseenter="hoverKey = item.i"
        @mouseleave="hoverKey = ''"
      >
        <a-card
          class="full-card"
          :title="item.config.option.title"
          :class="{ active: selectedId === item.i }"
          @click.stop="selectWidget(item.i)"
        >
          <template v-if="item.config.option.showSearch" #extra>
            <component
              :is="getSearchComponent(item.config.option.searchType)"
              v-bind="renderComponentProps(item.config.option.searchType)"
              v-model:value="item.config.option.searchValue"
              style="width: 120px;"
            />
          </template>
          <Bars v-if="item.key === 'Bars'" :chart-config="item.config" />
          <Lines v-if="item.key === 'Lines'" :chart-config="item.config" />
          <Pies v-if="item.key === 'Pies'" :chart-config="item.config" />
        </a-card>
        <div v-if="!preview && hoverKey === item.i" class="toolbar">
          <a-space :size="0">
            <template #split>
              <a-divider type="vertical" />
            </template>
            <a-tooltip title="删除" placement="bottom">
              <a-typography-link type="secondary" @click="removeWidget(item.i)">
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
  }
}
</style>
