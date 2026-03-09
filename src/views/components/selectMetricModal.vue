<script lang="ts" setup>
import { useDesignerStore } from '@/store'
import { useAsideHook } from '@/hooks'
import { createComponent } from '@/packages'

const emit = defineEmits(['add'])

const visible = defineModel('modelValue', {
  type: Boolean,
  default: false,
})

const { menuOptions } = useAsideHook()

const designerStore = useDesignerStore()
const gridConfig = computed(() => designerStore.gridConfig)

const activeKey = ref(menuOptions[0]?.key)

const selectedWidget = ref<Partial<WidgetItem>>({})

watch(visible, (newVal) => {
  if (!newVal) {
    selectedWidget.value = {}
    // activeKey.value = menuOptions[0]?.key
  }
})

async function handleClick(item: ComponentItem) {
  const newComponent = await createComponent(item)
  const { chart, config } = newComponent
  selectedWidget.value = { ...item, ...chart, config }
  console.log(selectedWidget.value)
}

function handleAdd() {
  emit('add', selectedWidget.value)
}

const handleCancel = () => {
  visible.value = false
}
</script>

<template>
  <a-modal v-model:open="visible" title="选择指标卡" @cancel="handleCancel">
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane v-for="tab in menuOptions" :key="tab.key" :tab="tab.name">
        <div class="components">
          <template v-for="item in tab.list" :key="item.name">
            <div v-if="item.name" class="components-cate">
              <setting-title>{{ item.name }}</setting-title>
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
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <a-flex>
        <a-select
          v-if="Object.keys(selectedWidget).length > 0"
          style="width: 100px; text-align: center"
          v-model:value="selectedWidget.w"
        >
          <template v-for="i in [4, 3, 2, 1]" :key="i">
            <a-select-option :value="gridConfig.colNum / i">
              {{ i === 1 ? '1' : `1/${i}` }}
            </a-select-option>
          </template>
        </a-select>
        <a-flex style="margin-left: auto">
          <a-button @click="handleCancel">取消</a-button>
          <a-button
            type="primary"
            :disabled="Object.keys(selectedWidget).length === 0"
            @click="handleAdd"
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
    margin: 8px 0;
    font-weight: bold;
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
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
