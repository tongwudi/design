<!-- eslint-disable no-console -->
<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { useDesignerStore } from '@/store'

const contentStyle: CSSProperties = {
  height: '100vh',
  borderLeft: '1px solid rgba(5, 5, 5, 0.06)',
  borderRight: '1px solid rgba(5, 5, 5, 0.06)',
  backgroundColor: '#eee',
}

const designerStore = useDesignerStore()

const layout = computed(() => designerStore.layout)

const gridConfig = computed(() => designerStore.gridConfig)
</script>

<template>
  <a-layout>
    <a-layout-content :style="contentStyle">
      <RenderGrid v-model="layout" :grid-config="gridConfig" preview />
    </a-layout-content>
  </a-layout>
</template>
