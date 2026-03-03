<script lang="ts" setup>
import { useDesignerStore } from '@/store'

defineProps({
  ccc: {
    type: Array as any,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

const visible = defineModel('modelValue', {
  default: false,
  type: Boolean,
})

const designerStore = useDesignerStore()
const gridConfig = computed(() => designerStore.gridConfig)

const selectedWidget = ref<Partial<DragWidget>>({})

function handleClick(widget: ComponentItem) {
  selectedWidget.value = { ...widget }
}

function handleChange(w: number) {
  selectedWidget.value.w = w
}

function handleSelect() {
  emit('select', selectedWidget.value)
  handleCancel()
}

const handleCancel = () => {
  selectedWidget.value = {}
  visible.value = false
}
</script>

<template>
  <a-modal v-model:open="visible" title="选择指标卡" @cancel="handleCancel">
    <div class="components">
      <template v-for="item in ccc" :key="item.name">
        <div class="components-cate" @click="handleClick(item)">
          {{ item.name }}
        </div>
        <!-- <div class="components-cate">
          {{ item.name }}
        </div>
        <ul class="components-list">
          <template v-for="widget in item.children" :key="widget.name">
            <li
              class="components-item"
              :class="{ active: selectedWidget.name === widget.name }"
              :title="widget.name"
              @click="handleClick(widget)"
            >
              {{ widget.name }}
            </li>
          </template>
        </ul> -->
      </template>
    </div>
    <template #footer>
      <a-flex>
        <a-space v-if="Object.keys(selectedWidget).length > 0">
          <template #split>
            <a-divider type="vertical" />
          </template>
          <template v-for="i in [3, 2, 1]" :key="i">
            <a-typography-link
              type="secondary"
              :disabled="selectedWidget.w === gridConfig.colNum / i"
              @click="handleChange(gridConfig.colNum / i)"
            >
              {{ i === 1 ? '1' : `1/${i}` }}
            </a-typography-link>
          </template>
        </a-space>
        <a-flex style="margin-left: auto">
          <a-button type="primary" ghost>自定义指标卡</a-button>
          <a-button @click="handleCancel">取消</a-button>
          <a-button
            type="primary"
            :disabled="Object.keys(selectedWidget).length === 0"
            @click="handleSelect"
          >
            确定
          </a-button>
        </a-flex>
      </a-flex>
    </template>
  </a-modal>
</template>

<style lang="less" scoped>
.components {
  &-cate {
    padding-bottom: 8px;
    font-weight: bold;
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    & + .components-cate {
      margin-top: 8px;
    }
  }
  &-item {
    height: 100px;
    line-height: 100px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    background-color: #f4f6fc;
    color: #333;
    border: 1px solid #f4f6fc;
    &.active {
      color: #1890ff;
      border: 1px dashed #1890ff;
    }
  }
}
</style>
