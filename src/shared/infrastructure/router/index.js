/**
 * @file index.js
 * @summary Vue Router configuration with semantic routes and child routes per bounded context.
 * @author Brianna Salinas Guzman
 */
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/shared/presentation/views/home-view.vue')
  },
  {
    path: '/planning',
    children: [
      {
        path: 'tournaments',
        name: 'tournaments',
        component: () => import('@/tournamenting/presentation/views/tournament-list-view.vue')
      },
      {
        path: 'tournaments/:tournamentId/edit',
        name: 'edit-tournament',
        component: () => import('@/tournamenting/presentation/views/tournament-edit-view.vue'),
        props: true
      },
      {
        path: 'tournaments/:tournamentId/games/new',
        name: 'new-tournament-game',
        component: () => import('@/tournamenting/presentation/views/tournament-game-new-view.vue'),
        props: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared/presentation/views/not-found-view.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
