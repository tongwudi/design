<script lang="ts" setup>
import { useDesignerStore } from '@/store'
import { useAsideHook } from '@/hooks'
import { createComponent } from '@/components'

const emit = defineEmits(['confirm'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const { menuOptions } = useAsideHook()

const designerStore = useDesignerStore()
const gridConfig = computed(() => designerStore.gridConfig)

const selectedWidget = ref<Partial<LayoutItem>>({})

watch(visible, newVal => {
  if (!newVal) {
    selectedWidget.value = {}
  }
})

async function handleClick(item: ComponentItem) {
  const newComponent = await createComponent(item)
  const { chart, config } = newComponent
  selectedWidget.value = { ...item, ...chart, config }
}

function handleChange(w: number) {
  selectedWidget.value.w = w
}

function handleConfirm() {
  emit('confirm', selectedWidget.value)
}

const handleCancel = () => {
  visible.value = false
}
</script>

<template>
  <a-modal v-model:open="visible" title="选择指标卡" @cancel="handleCancel">
    <div class="components">
      <template v-for="item in menuOptions" :key="item.name">
        <div class="components-cate">
          {{ item.name }}
        </div>
        <ul class="components-list">
          <template v-for="widget in item.list" :key="widget.key">
            <li
              class="components-item"
              :class="{ active: selectedWidget.key === widget.key }"
              :title="widget.title"
              @click="handleClick(widget)"
            >
              {{ widget.title }}
            </li>
          </template>
        </ul>
      </template>
    </div>
    <template #footer>
      <a-flex>
        <a-space v-if="Object.keys(selectedWidget).length > 0">
          <template #split>
            <a-divider type="vertical" />
          </template>
          <template v-for="i in [4, 3, 2, 1]" :key="i">
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
            @click="handleConfirm"
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
