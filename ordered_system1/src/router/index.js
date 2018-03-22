import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = (resolve) => {
  import('components/home/home.vue').then((module) => {
    resolve(module)
  })
}
const UserCenter = (resolve) => {
  import('components/user-center/user-center.vue').then((module) => {
    resolve(module)
  })
}
const OrderDetail = (resolve) => {
  import('components/order-detail/order-detail.vue').then((module) => {
    resolve(module)
  })
}
const CheckTable = (resolve) => {
  import('components/check-table/check-table.vue').then((module) => {
    resolve(module)
  })
}
const Checkpend = (resolve) => {
  import('components/checkpend/checkpend.vue').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: ':id',
          component: OrderDetail
        }
      ]
    },
    {
      path: '/user-center',
      component: UserCenter
    },
    {
      path: '/user-center/:id',
      component: Checkpend
    },
    {
      path: '/check-table',
      component: CheckTable
    }
  ]
})
