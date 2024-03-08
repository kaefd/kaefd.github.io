import { createRouter, createWebHistory, createWebHashHistory } from '@ionic/vue-router';
import { RouteLocationNormalized, RouteRecordRaw, Router } from 'vue-router';
import middleware from '@/router/middleware'
import mode from '@/mode';

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
    title: 'Dashboard',
    key: 'dashboard',
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
        key: 'barang',
        title: 'Data Barang',
        icon: 'ri-stack-line',
        path: 'data-barang',
        meta: {
          middleware: [middleware]
        },
            component: () => import('@/views/master/data-barang/DataBarang.vue')
      },
      {
        name: 'Data Pelanggan',
        key: 'pelanggan',
        title: 'Data Pelanggan',
        icon: 'ri-stack-line',
        path: 'data-pelanggan',
        meta: {
          middleware: [middleware]
        },
            component: () => import('@/views/master/data-pelanggan/DataPelanggan.vue')
      },
      {
        name: 'Data Supplier',
        key: 'supplier',
        title: 'Data Supplier',
        icon: 'ri-stack-line',
        path: 'data-supplier',
        meta: {
          middleware: [middleware]
        },
            component: () => import('@/views/master/data-supplier/DataSupplier.vue')
      },
      {
        name: 'Data User',
        key: 'user',
        title: 'Data User',
        icon: 'ri-stack-line',
        path: 'data-user',
        meta: {
          middleware: [middleware]
        },
            component: () => import('@/views/master/data-user/DataUser.vue')
      },
    ]
  },
  {
    name: 'Transaksi',
    subname: 'Transaksi Barang',
    path: '/transaksi',
    icon: 'ri-flow-chart',
    middleware: [middleware],
    component: () => import('@/views/transaksi/Transaksi.vue'),
    children: [
      {
        name: 'Pembelian',
        key: 'Pembelian',
        title: 'Pemasukan Barang',
        subname: 'Data Pemasukan barang',
        icon: 'ri-stack-line',
        path: 'pemasukan',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/transaksi/pemasukan/Pemasukan.vue'),
      },
      {
        name: 'Produksi',
        key: 'Produksi',
        title: 'Produksi Barang',
        subname: 'Data Produksi barang',
        icon: 'ri-stack-line',
        path: 'produksi',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/transaksi/produksi/Produksi.vue'),
      },
      {
        name: 'Penjualan',
        key: 'pengeluaran',
        title: 'Pengeluaran Barang',
        subname: 'Data Pengeluaran barang',
        icon: 'ri-stack-line',
        path: 'pengeluaran',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/transaksi/pengeluaran/Pengeluaran.vue'),
      },
      {
          name: 'Pengiriman',
          key: 'Pengiriman',
          title: 'Pengiriman Barang',
          subname: 'Data Pengiriman barang',
          icon: 'ri-stack-line',
          path: 'pengiriman',
          meta: {
              middleware: [middleware]
          },
          component: () => import('@/views/transaksi/pengiriman/Pengiriman.vue'),
      },
    ]
  },
  {
    name: 'Laporan',
    subname: 'Laporan',
    path: '/laporan',
    icon: 'ri-file-list-3-line',
    middleware: [middleware],
    component: () => import('@/views/laporan/Laporan.vue'),
    children: [
      {
        name: 'Laporan Stok Barang',
        key: 'stokbarang',
        title: 'Laporan Stok Barang',
        subname: 'Data Laporan Stok barang',
        icon: 'ri-stack-line',
        path: 'stok-barang',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/stok-barang/StokBarang.vue'),
      },
      {
        name: 'Laporan Pembelian',
        key: 'pembelian',
        title: 'Laporan Pemasukan Barang',
        subname: 'Data Laporan Pemasukan barang',
        icon: 'ri-stack-line',
        path: 'pemasukan',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/pemasukan/Pemasukan.vue'),
      },
      {
        name: 'Laporan Penjualan',
        key: 'pengeluaran',
        title: 'Laporan Pengeluaran Barang',
        subname: 'Data Laporan Pengeluaran barang',
        icon: 'ri-stack-line',
        path: 'pengeluaran',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/pengeluaran/Pengeluaran.vue'),
      },
      {
        name: 'Laporan Pengiriman',
        key: 'pengiriman',
        title: 'Laporan Pengiriman Barang',
        subname: 'Data Laporan Pengiriman barang',
        icon: 'ri-stack-line',
        path: 'pengiriman',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/pengiriman/Pengiriman.vue'),
      },
      {
        name: 'Laporan Detail Pengeluaran',
        key: 'pengeluaran',
        title: 'Laporan Detail Pengeluaran',
        subname: 'Data Laporan Detail Pengeluaran',
        icon: 'ri-stack-line',
        path: 'detail-pengeluaran',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/detail-pengeluaran/DetailPengeluaran.vue'),
      },
      {
        name: 'Laporan Log User',
        key: 'loguser',
        title: 'Laporan Log User',
        subname: 'Data Laporan Log User',
        icon: 'ri-stack-line',
        path: 'log-user',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/laporan/log-user/LogUser.vue'),
      },
    ]
  },
  {
    name: 'User',
    subname: 'User',
    path: '/user',
    icon: 'ri-file-list-3-line',
    middleware: [middleware],
    component: () => import('@/views/user/User.vue'),
    children: [
      {
        name: 'Log User',
        key: 'stokbarang',
        title: 'Log User',
        subname: 'Data Log User',
        path: 'log',
        meta: {
            middleware: [middleware]
        },
          component: () => import('@/views/user/log/LogActivity.vue'),
      },
    ]}
]



const router = createRouter({
  history: mode.routeMode == 'webHistory' ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
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