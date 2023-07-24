<script setup>
import otoritas from '../../service/page/otoritas';

</script>
<script>
export default {
    components: {
},
    props: ['headers', 'items', 'user_otoritas'],
    data () {
      return {
        datauser: {}
      }
    },
    mounted() {
    }
}
</script>
<template>
    <v-table density="compact" class="my-3" fixed-header height="37vh">
      <thead class="bg-white">
        <tr class="text-center text-caption bg-white">
          <th>
            Jenis Otoritas
          </th>
          <th>
            Lihat Data
          </th>
          <th>
            Tambah Data
          </th>
          <th>
            Edit Data
          </th>
          <th>
            Batal/Hapus Data
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-caption">Data Barang</td>
          <td>
            <v-checkbox v-if="!edit" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Barang') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox v-if="!edit" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Barang Baru') ? true : false" readonly />
            <v-checkbox v-if="edit" hide-details color="orange" class="radio-small" />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Barang') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Barang') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Data Pelanggan</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Pelanggan') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pelanggan Baru') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Pelanggan') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Pelanggan') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Data Supplier</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Supplier') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-caption">Data User</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Pemasukan</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pembelian') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pembelian Baru') ? true : false" readonly />
          </td>
          <td></td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pembelian') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Produksi</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Produksi') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Produksi Baru') ? true : false" readonly />
          </td>
          <td></td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Produksi') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Pengeluaran</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Penjualan') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Penjualan Baru') ? true : false" readonly />
          </td>
          <td></td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Penjualan') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Pengiriman</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pengiriman') ? true : false" readonly />
          </td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pengiriman Baru') ? true : false" readonly />
          </td>
          <td></td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pengiriman') ? true : false" readonly />
          </td>
        </tr>
        <tr>
          <td class="text-caption">Laporan Stok Barang</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Stok Barang') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-caption">Laporan Pemasukan</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Pembelian') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-caption">Laporan Produksi</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Produksi') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-caption">Laporan Pengeluaran</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Penjualan') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td class="text-caption">Laporan Log User</td>
          <td>
            <v-checkbox hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Log User') ? true : false" readonly />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </v-table>
</template>
<style scoped>
.radio-small {
  display:  block !important;
  font-size: 10px !important;
  text-align: center !important;
}
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  background: inherit !important;
}
</style>