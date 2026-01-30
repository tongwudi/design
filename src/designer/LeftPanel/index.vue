<script lang="ts" setup>
const emit = defineEmits<{
  drag: [component: layoutChildItem]
  dragend: []
}>()

const componentList = [
  {
    name: '基础',
    children: [
      { name: '图片', w: 6, h: 8, minW: 2, minH: 2 },
      { name: '倒计时', w: 6, h: 8, minW: 2, minH: 2 },
      { name: '统计数值', w: 6, h: 8, minW: 2, minH: 2 },
      { name: '表格', w: 6, h: 8, minW: 2, minH: 2 },
    ],
  },
  {
    name: '图表',
    children: [
      { name: '柱状图', compType: 'BarChart', w: 8, h: 12, minW: 4, minH: 8 },
      { name: '饼状图', compType: 'PieChart', w: 8, h: 12, minW: 4, minH: 8 },
      { name: '折线图', compType: 'LineChart', w: 8, h: 12, minW: 4, minH: 8 },
    ],
  },
]

function drag(element: any) {
  emit('drag', element)
}

function dragend() {
  emit('dragend')
}
</script>

<template>
  <div class="components-list">
    <template v-for="item in componentList" :key="item.name">
      <div v-if="item.name" class="widget-cate">
        {{ item.name }}
      </div>
      <ul class="widget-list">
        <li v-for="component in item.children" :key="component.name" :title="component.name" class="widget-item" unselectable="on" draggable="true" @drag="drag(component)" @dragend="dragend">
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
