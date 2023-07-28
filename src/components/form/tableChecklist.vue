<script setup>
import otoritas from '../../service/page/otoritas';
import BtnCancel from '../button/btnCancel.vue';
import BtnOrange from '../button/btnOrange.vue';

</script>
<script>
export default {
    components: {
        BtnCancel,
        BtnOrange
},
    props: ['headers', 'items', 'user_otoritas', 'edit'],
    data () {
      return {
        ubah: this.edit,
        ds: {
          data_barang: null,
        }
      }
    },
    mounted() {
    }
}
</script>
<template>
    <v-div v-if="edit" class="d-flex me-0 ms-auto">
      <btn-cancel color="red" btn_title="Hapus Akun" />
      <btn-cancel @click="edit = false" btn_title="Batal" class="mx-2" />
      <btn-orange btn_title="Simpan" />
    </v-div>
</template>
<v-table density="compact" class="my-3" fixed-header height="30vh">
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
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Barang') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_barang" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Barang Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_barang" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Barang') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.ubah_barang" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Barang') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.hapus_barang" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Data Pelanggan</td>
      <td>
        <v-checkbox v-if="!edit && !tambah && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Pelanggan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_pelanggan" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pelanggan Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pelanggan" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Ubah Pelanggan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.ubah_pelanggan"/>
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Hapus Pelanggan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.hapus_pelanggan" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Data Supplier</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data Supplier') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_supplier"/>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Data User</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Data User') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.data_user" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Pemasukan</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pembelian') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.pembelian" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pembelian Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pembelian"/>
      </td>
      <td></td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pembelian') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_pembelian" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Produksi</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Produksi') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.produksi" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Produksi Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_produksi" />
      </td>
      <td></td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Produksi') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_produksi" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Pengeluaran</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Penjualan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.penjualan" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Penjualan Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_penjualan" />
      </td>
      <td></td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Penjualan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_penjualan" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Pengiriman</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Pengiriman') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.pengiriman" />
      </td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Tambah Pengiriman Baru') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.tambah_pengiriman" />
      </td>
      <td></td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Batal Pengiriman') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.batal_pengiriman" />
      </td>
    </tr>
    <tr>
      <td class="text-caption">Laporan</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan" />
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Laporan Stok Barang</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Stok Barang') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_stok_barang" />
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Laporan Pemasukan</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Pembelian') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_pembelian"/>
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Laporan Produksi</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Produksi') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_produksi" />
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Laporan Pengeluaran</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Penjualan') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_penjualan" />
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td class="text-caption">Laporan Log User</td>
      <td>
        <v-checkbox v-if="!edit && !tambah" hide-details color="orange" class="radio-small" :model-value="otoritas.routes(user_otoritas, 'Laporan Log User') ? true : false" readonly />
        <v-checkbox v-if="edit || tambah" hide-details color="orange" class="radio-small" v-model="ds.laporan_log_user" />
      </td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</v-table>
