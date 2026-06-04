<script lang="ts" setup>
import * as Icons from '@ant-design/icons-vue'

type IconKey = keyof typeof Icons
interface MenuItem {
  text: string
  icon: IconKey
  isDanger?: boolean
  show?: boolean
  handler: () => void
}

const props = defineProps<{
  title: string
  menus: MenuItem[]
}>()

const getMenus = computed(() => {
  return props.menus.map(menu => ({
    ...menu,
    show: menu.show ?? true,
  }))
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
      <template v-for="(btn, idx) in getMenus" :key="idx">
        <a-button v-if="btn.show" type="link" :danger="btn.isDanger" @click="btn.handler">
          <template #icon>
            <component :is="getIconComponent(btn.icon)" />
          </template>
          {{ btn.text }}
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
