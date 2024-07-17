import { createRouter, createWebHistory } from 'vue-router'
import FallbackPage from '../components/FallbackPage.vue'
import ProjectTable from '../components/ProjectTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'fallback',
      component: FallbackPage
    },
    {
      path: '/:workspaceId/projects/:projectId',
      name: 'project',
      component: ProjectTable,
      props: (route) => ({
        workspaceId: route.params.workspaceId,
        projectId: route.params.projectId,
      })
    },
  ]
})

export default router
