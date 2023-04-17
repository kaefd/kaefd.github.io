import { createRouter, createWebHistory } from 'vue-router'
// import Middleware from '../middleware/Middleware'
import ItemsView from '../views/ItemsView.vue'
import LoginView from '../views/LoginView.vue'
import CustomerView from '../views/CustomerView.vue'
import SupplierView from '../views/SupplierView.vue'
import UserView from '../views/UserView.vue'
import InItems from '../views/InItems.vue'
// import ProductView from '../views/ProductView.vue'
// import OutItem from '../views/OutItem.vue'
// import SendView from '../views/SendView.vue'
// import StockReport from '../views/StockReport.vue'
// import StockIn from '../views/StockIn.vue'
// import StockOut from '../views/StockOut.vue'
// import LogView from '../views/LogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: "login"
    }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      // meta: {
      //   middleware: [Middleware]
      // }
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerView
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: SupplierView
    },
    {
      path: '/users',
      name: 'users',
      component: UserView
    },
    {
      path: '/in',
      name: 'initems',
      component: InItems
    },
    // {
    //   path: '/production',
    //   name: 'productions',
    //   component: ProductView
    // },
    // {
    //   path: '/out',
    //   name: 'outitems',
    //   component: OutItem
    // },
    // {
    //   path: '/send',
    //   name: 'send',
    //   component: SendView
    // },
    // {
    //   path: '/stock-report',
    //   name: 'stockreport',
    //   component: StockReport
    // },
    // {
    //   path: '/in-report',
    //   name: 'inreport',
    //   component: StockIn
    // },
    // {
    //   path: '/out-report',
    //   name: 'outreport',
    //   component: StockOut
    // },
    // {
    //   path: '/log',
    //   name: 'log',
    //   component: LogView
    // },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.middleware) {
//     const middleware = to.meta.middleware
//     const context = { to, from, next }

//     middleware[0]({
//       ...context,
//       next: middlewarePipeline(context, middleware, 1)
//     })
//   }else {
//     next()
//   }
// })

// function middlewarePipeline(context, middleware, index) {
//   const nextMiddleware = middleware[index]

//   if(!nextMiddleware){
//     return context.next
//   }

//   return () => {
//     nextMiddleware({
//       ...context,
//       next: middlewarePipeline(context, middleware, index + 1)
//     })
//   }
// }
export default router
