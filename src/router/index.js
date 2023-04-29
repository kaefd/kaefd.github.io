import { createRouter, createWebHistory } from 'vue-router'
// import Middleware from '../middleware/Middleware'
// import auth from '../middleware/auth';
// import log from '../middleware/log';
import store from '../middleware/store'
import guest from '../middleware/guest'
import auth from '../middleware/auth'
import middlewarePipeline from '../middleware/middlewarePipeline'
import ItemsView from '../views/ItemsView.vue'
import LoginView from '../views/LoginView.vue'
import CustomerView from '../views/CustomerView.vue'
import SupplierView from '../views/SupplierView.vue'
import UserView from '../views/UserView.vue'
import InItems from '../views/InItems.vue'
import ProductView from '../views/ProductView.vue'
import OutItem from '../views/OutItem.vue'
import SendView from '../views/SendView.vue'
import StockReport from '../views/StockReport.vue'
import InReport from '../views/InReport.vue'
import OutReport from '../views/OutReport.vue'
import LogView from '../views/LogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: "items",
        meta: {
                middleware: [auth],
              },
    }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        middleware: [guest],
      },
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: SupplierView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/users',
      name: 'users',
      component: UserView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/in',
      name: 'initems',
      component: InItems,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/production',
      name: 'productions',
      component: ProductView,
      meta: {
        middleware: [auth],
      },
    },
    {
      path: '/out',
      name: 'outitems',
      component: OutItem,
      meta: {
                middleware: [auth],
              },
    },
    {
      path: '/send',
      name: 'send',
      component: SendView,
      meta: {
                middleware: [auth],
              },
    },
    {
      path: '/stock-report',
      name: 'stockreport',
      component: StockReport,
      meta: {
                middleware: [auth],
              },
    },
    {
      path: '/in-report',
      name: 'inreport',
      component: InReport,
      meta: {
                middleware: [auth],
            },
    },
    {
      path: '/out-report',
      name: 'outreport',
      component: OutReport,
      meta: {
                middleware: [auth],
            },
    },
    {
      path: '/log-report',
      name: 'log',
      component: LogView,
      meta: {
                middleware: [auth],
            },
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
})

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