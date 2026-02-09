import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/designer/index.vue'),
    name: 'DesignerPage',
  },
  {
    path: '/preview',
    component: () => import('@/views/preview.vue'),
    name: 'Preview',
  },
]
export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
