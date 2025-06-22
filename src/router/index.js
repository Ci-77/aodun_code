import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/register', component: () => import('@/views/register/index.vue') },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    children: [
      { path: '', component: () => import('@/views/doc/home.vue') },
      { path: '/doc', component: () => import('@/views/doc/index.vue') },
      { path: '/user', component: () => import('@/views/doc/user.vue') },
      { path: '/setting', component: () => import('@/views/doc/setting.vue') },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
