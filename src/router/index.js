import { createRouter, createWebHashHistory } from 'vue-router'
import middleware from '../middleware'
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
  history: createWebHashHistory(),
  routes: [
    {
     path: '/',
     meta: {
        middleware: [middleware]
      },
      redirect: {
        name: "itemsView"
        }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/items',
      name: 'itemsView',
      meta: {
        middleware: [middleware]
      },
      component: ItemsView,
    },
    {
      path: '/customers',
      name: 'customers',
      meta: {
        middleware: [middleware]
      },
      component: CustomerView,
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      meta: {
        middleware: [middleware]
      },
      component: SupplierView,
    },
    {
      path: '/users',
      name: 'users',
      meta: {
        middleware: [middleware]
      },
      component: UserView,
    },
    {
      path: '/in',
      name: 'initems',
      meta: {
        middleware: [middleware]
      },
      component: InItems,
    },
    {
      path: '/production',
      name: 'productions',
      meta: {
        middleware: [middleware]
      },
      component: ProductView,
    },
    {
      path: '/out',
      name: 'outitems',
      meta: {
        middleware: [middleware]
      },
      component: OutItem,
    },
    {
      path: '/send',
      name: 'send',
      meta: {
        middleware: [middleware]
      },
      component: SendView,
    },
    {
      path: '/stock-report',
      name: 'stockreport',
      meta: {
        middleware: [middleware]
      },
      component: StockReport,
    },
    {
      path: '/in-report',
      name: 'inreport',
      meta: {
        middleware: [middleware]
      },
      component: InReport,
    },
    {
      path: '/out-report',
      name: 'outreport',
      meta: {
        middleware: [middleware]
      },
      component: OutReport,
    },
    {
      path: '/log-report',
      name: 'log',
      meta: {
        middleware: [middleware]
      },
      component: LogView,
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    from,
    next,
    router,
    to,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export default router