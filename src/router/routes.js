
const routes = [
  { path: '/', component: () => import('pages/Login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/dashboard', component: () => import('pages/Index.vue') },
      { path: '/databases', component: () => import('pages/Services/Databases.vue') },
      { path: '/docker', component: () => import('pages/Services/Docker')},
      { path: '/kubernetes', component: () => import('pages/Services/Kubernetes')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
