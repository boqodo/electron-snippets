import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/IndexPage').default
    },
    {
      path: '/index',
      name: 'index-page',
      component: require('@/components/IndexPage').default
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
