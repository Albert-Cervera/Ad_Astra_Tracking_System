import { createRouter, createWebHashHistory } from 'vue-router'

import { HOME_ROUTE } from '@/constants/routes'

const routes = [
  {
    path: HOME_ROUTE,
    component: () => import('@/views/Home'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
