import { createRouter, createWebHashHistory } from 'vue-router'
import middleware from '../middleware'
import DataBarang from '../views/DataBarang.vue'
import LoginView from '../views/LoginView.vue'
import DataPelanggan from '../views/DataPelanggan.vue'
import DataSupplier from '../views/DataSupplier.vue'
import DataUser from '../views/DataUser.vue'
import PemasukanBarang from '../views/PemasukanBarang.vue'
import Produksi from '../views/Produksi.vue'
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
        name: "DataBarang"
        }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/data-barang',
      name: 'DataBarang',
      meta: {
        middleware: [middleware]
      },
      component: DataBarang,
    },
    {
      path: '/data-pelanggan',
      name: 'DataPelanggan',
      meta: {
        middleware: [middleware]
      },
      component: DataPelanggan,
    },
    {
      path: '/data-supplier',
      name: 'DataSupplier',
      meta: {
        middleware: [middleware]
      },
      component: DataSupplier,
    },
    {
      path: '/data-user',
      name: 'DataUser',
      meta: {
        middleware: [middleware]
      },
      component: DataUser,
    },
    {
      path: '/pemasukan',
      name: 'PemasukanBarang',
      meta: {
        middleware: [middleware]
      },
      component: PemasukanBarang,
    },
    {
      path: '/produksi',
      name: 'Produksi',
      meta: {
        middleware: [middleware]
      },
      component: Produksi,
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