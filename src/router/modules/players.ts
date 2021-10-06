import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const playerRoutes:RouteConfig = {
  path: '/players',
  component: Layout,
  name: 'players',
  meta: {
    title: 'playersMgt', // i18n信息处理
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/player/list.vue'),
      meta: {
        title: 'playerList',
        icon: 'list'
      }
    }
  ]
}

export default playerRoutes
