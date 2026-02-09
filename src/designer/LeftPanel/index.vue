<script lang="ts" setup>
import { useAsideHook } from '@/hooks'

const emit = defineEmits<{
  drag: [component: ComponentItem]
  dragend: []
}>()

const { menuOptions } = useAsideHook()

function drag(element: any) {
  emit('drag', element)
}

function dragend() {
  emit('dragend')
}
</script>

<template>
  <div class="components-list">
    <template v-for="item in menuOptions" :key="item.name">
      <div v-if="item.name" class="widget-cate">
        {{ item.name }}
      </div>
      <ul class="widget-list">
        <li
          v-for="component in item.children"
          :key="component.name"
          :title="component.name"
          class="widget-item"
          unselectable="on"
          draggable="true"
          @drag="drag(component)"
          @dragend="dragend"
        >
          {{ component.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<style lang="less" scoped>
.components-list {
  padding: 4px 0;
  .widget-cate {
    padding: 8px 12px;
    font-size: 13px;
  }
  .widget-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 12px 10px;
    .widget-item {
      width: calc(50% - 4px);
      line-height: 84px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      color: #333;
      border: 1px solid #f4f6fc;
      background-color: #f4f6fc;
      cursor: move;
      &:hover {
        color: #1890ff;
        border: 1px dashed #1890ff;
      }
    }
  }
}
</style>
