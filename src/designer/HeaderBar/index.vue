<script lang="ts" setup>
import * as Icons from '@ant-design/icons-vue'

const props = defineProps<{
  title: string
  btns: {
    title: string
    icon: keyof typeof Icons
    isDanger?: boolean
    show?: boolean
    clickFn?: () => void
  }[]
}>()

const getBtns = computed(() => {
  return props.btns?.map(btn => ({
    ...btn,
    show: btn.show ?? true,
  })) || []
})

function getIconComponent(iconName: keyof typeof Icons): Component {
  return Icons[iconName]
}
</script>

<template>
  <a-row justify="space-between">
    <div class="header-title">
      {{ title || '仪表盘设计器' }}
    </div>
    <a-space>
      <template v-for="(btn, idx) in getBtns" :key="idx">
        <a-button v-if="btn.show" type="link" :danger="btn.isDanger" @click="btn.clickFn">
          <template #icon>
            <component :is="getIconComponent(btn.icon)" />
          </template>
          {{ btn.title }}
        </a-button>
      </template>
    </a-space>
  </a-row>
</template>

<style lang="less" scoped>
.ant-btn-link {
  padding: 4px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
}
</style>
