import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteLocationNormalized, RouteRecordRaw, Router } from 'vue-router';
import middleware from '@/router/middleware'

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/layout/Login.vue'),
  },
  {
    path: '/',
    meta: {
      middleware: [middleware]
    },
    redirect: {
      name: "Dashboard"
    }
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'ri-home-5-line',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/dashboard/Dashboard.vue')
  },
  {
    name: 'Master',
    subname: 'Master Data',
    path: '/master',
    icon: 'ri-database-2-line',
    meta: {
      middleware: [middleware]
    },
    // redirect: '/master/data-barang',
    component: () => import('@/views/master/Master.vue'),
    children: [
      {
        name: 'Data Barang',
        path: 'data-barang',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/master/DataBarang.vue')
      },
      {
        name: 'Konversi Barang',
        path: 'konversi-barang',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/master/KonversiBarang.vue')
      },
      {
        name: 'Data Pelanggan',
        path: 'data-pelanggan',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/master/DataPelanggan.vue')
      },
      {
        name: 'Data Supplier',
        path: 'data-supplier',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/master/DataSupplier.vue')
      },
      {
        name: 'Data User',
        path: 'data-user',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/master/DataUser.vue')
      },
    ]
  },
  {
    name: 'Pemasukan Barang',
    subname: 'Data pemasukan barang',
    path: '/pemasukan',
    icon: 'ri-inbox-archive-line',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/pemasukan/Pemasukan.vue'),
  },
  {
    name: 'Produksi Barang',
    subname: 'Data Produksi barang',
    path: '/produksi',
    icon: 'ri-donut-chart-fill',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/produksi/Produksi.vue'),
  },
  {
    name: 'Pengeluaran Barang',
    subname: 'Data Pengeluaran barang',
    path: '/pengeluaran',
    icon: 'ri-inbox-unarchive-line',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/pengeluaran/Pengeluaran.vue'),
  },
  {
    name: 'Pengiriman Barang',
    subname: 'Data Pengiriman barang',
    path: '/pengiriman',
    icon: 'ri-send-plane-line',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/pengiriman/Pengiriman.vue'),
  },
  {
    name: 'Laporan',
    subname: 'Laporan',
    path: '/laporan',
    icon: 'ri-file-list-3-line',
    // redirect: '/laporan/laporan-pemasukan',
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/laporan/Laporan.vue'),
    children: [
      {
        name: 'Laporan Stok Barang',
        path: 'laporan-stok',
        meta: {
          middleware: [middleware]
        },
        component: () => import('@/views/laporan/LaporanStokBarang.vue')
      },
      {
        name: 'Laporan Pemasukan',
        path: 'laporan-pemasukan',
        meta: {
          middleware: [middleware]
        },
        component: () => import('@/views/laporan/LaporanPemasukan.vue')
      },
      {
        name: 'Laporan Pengeluaran',
        path: 'laporan-pengeluaran',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/laporan/LaporanPengeluaran.vue')
      },
      {
        name: 'Laporan Pengiriman',
        path: 'laporan-pengiriman',
        meta: {
          middleware: [middleware]
        },
            component: () => import('@/views/laporan/LaporanPengiriman.vue')
      },
      {
        name: 'Laporan Log User',
        path: 'log-user',
        meta: {
      middleware: [middleware]
    },
        component: () => import('@/views/laporan/LaporanLogUser.vue')
      },
    ],
  },
  {
    name: 'Log Aktivitas',
    subname: 'histori',
    path: '/log-aktivitas',
    icon: false,
    meta: {
      middleware: [middleware]
    },
    component: () => import('@/views/user/LogActivity.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const middleware: any = to.meta.middleware;

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

function middlewarePipeline(context: { from?: RouteLocationNormalized; next: any; router?: Router; to?: RouteLocationNormalized; }, middleware: { [x: string]: any; }, index: number) {
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