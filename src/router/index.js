import { createRouter, createWebHistory } from 'vue-router'
import middleware from '../service/middleware'
import DataBarang from '../views/DataBarang.vue'
import KonversiBarang from '../views/KonversiBarang.vue'
import testPage from '../views/testPage.vue'
import LoginView from '../views/LoginView.vue'
import DataPelanggan from '../views/DataPelanggan.vue'
import DataSupplier from '../views/DataSupplier.vue'
import DataUser from '../views/DataUser.vue'
import PemasukanBarang from '../views/PemasukanBarang.vue'
import ProduksiBarang from '../views/ProduksiBarang.vue'
import PengeluaranBarang from '../views/PengeluaranBarang.vue'
import PengirimanBarang from '../views/PengirimanBarang.vue'
import LaporanStok from '../views/LaporanStok.vue'
import LaporanPemasukan from '../views/LaporanPemasukan.vue'
import LaporanPengeluaran from '../views/LaporanPengeluaran.vue'
import LaporanPengiriman from '../views/LaporanPengiriman.vue'
import LogView from '../views/LaporanLog.vue'
import notPage from '../views/notPage.vue'
const router = createRouter({
  history: createWebHistory('/inventori'),
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
      path: '/test-page',
      name: 'testPage',
      component: testPage,
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
      path: '/barang-konversi',
      name: 'KonversiBarang',
      meta: {
        middleware: [middleware]
      },
      component: KonversiBarang,
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
      name: 'ProduksiBarang',
      meta: {
        middleware: [middleware]
      },
      component: ProduksiBarang,
    },
    {
      path: '/pengeluaran',
      name: 'PengeluaranBarang',
      meta: {
        middleware: [middleware]
      },
      component: PengeluaranBarang,
    },
    {
      path: '/pengiriman',
      name: 'PengirimanBarang',
      meta: {
        middleware: [middleware]
      },
      component: PengirimanBarang,
    },
    {
      path: '/laporan-stok',
      name: 'LaporanStok',
      meta: {
        middleware: [middleware]
      },
      component: LaporanStok,
    },
    {
      path: '/laporan-pemasukan',
      name: 'LaporanPemasukan',
      meta: {
        middleware: [middleware]
      },
      component: LaporanPemasukan,
    },
    {
      path: '/laporan-pengeluaran',
      name: 'LaporanPengeluaran',
      meta: {
        middleware: [middleware]
      },
      component: LaporanPengeluaran,
    },
    {
      path: '/laporan-pengiriman',
      name: 'LaporanPengiriman',
      meta: {
        middleware: [middleware]
      },
      component: LaporanPengiriman,
    },
    {
      path: '/laporan-log',
      name: 'log',
      meta: {
        middleware: [middleware]
      },
      component: LogView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notPage',
      component: notPage,
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