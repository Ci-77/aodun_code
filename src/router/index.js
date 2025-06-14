import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/', component: () => import('@/views/layout/index.vue'),
    children:[
        { path: '', component: () => import('@/views/home/index.vue') },
        { path: 'doc/:id', component: () => import('@/views/doc/index.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router