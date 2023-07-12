<script setup>
import functions from '../service/functions';
import { VDataTable } from 'vuetify/labs/VDataTable'
import LogBarang from '../views/LogBarang.vue';
import dialogMaster from './dialog/dialogMaster.vue';
import barang from '../service/page/barang';
import dialogConfirm from './dialog/dialogConfirm.vue';
import menuList from './menu/menuList.vue';
import PemasukanDetail from '../views/PemasukanDetail.vue';
import pemasukan from '../service/page/pemasukan';
import btnCancel from './button/btnCancel.vue';
import BtnOrange from './button/btnOrange.vue';
</script>
<script>
export default {
    components: {
      PemasukanDetail,
      VDataTable,
      dialogMaster,
      LogBarang,
      dialogConfirm,
      btnCancel,
      menuList,
        BtnOrange,
    },
    // props: ['loading', 'stokbarang', 'barang', 'groupbarang', 'laporanstok', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', '', 'toolbar_title', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect', 'ishidden'],
    props: ['stokbarang', 'groupbarang', 'laporanstok', 'masuk', 'supplier', 'pembeliandetl', 'view', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', 'toolbar_title', 'form', 'noselect', 'ishidden', 'pageTitle'],
    
    data () {
      return {
        dialog: [],
        totaldata: this.items.length,
        confirmdialog: [],
        list: [
          {title: 'Edit Data', key: 'edit', icon: 'mdi-pencil'},
          {title: 'Hapus Data', key: 'hapus', icon: 'mdi-delete'},
        ],
        list2: [
          {title: 'Lihat Data', key: 'lihat'},
        ],
      }
    },
    methods:{
      result(value, i) {
        return value != 'hapus' ? this.dialog[i] = true : this.confirmdialog[i] = true
      },
      edit(value) {
        return this.$emit('edit', value)
      },
      del(v, i) {
        this.confirmdialog[i] =  false
        return this.$emit('del', v)
      },
      confirm(head, detail) {
        this.$emit('confirm', head, detail)
      }
    },
    mounted() {
    }
}
</script>
<template>
    <v-sheet height="90%">
      <!-- TABEL DATA -->
      <v-data-table
        items-per-page="10"
        :headers="headers"
        :items="items"
        :search="search"
        :hover="true"
        :fixed-header="true"
        density="compact"
        class="text-caption py-3 h-100"
        height="100%"
      >
    <!-- CUSTOM PAGINATION STYLE -->
    <!-- ACTION DELETE & EDIT -->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.kategori_barang="{ item }">
          {{ barang.slotitem(item.raw.kode_barang, items, 'k') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.nama_barang="{ item }">
          {{ barang.slotitem(item.raw.kode_barang, items, 'nm') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.hs_code="{ item }">
          {{ barang.slotitem(item.raw.kode_barang, items, 'hc') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.satuan="{ item }">
          {{ barang.slotitem(item.raw.kode_barang, items, 's') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.stok_akhir="{item}">
          {{ barang.sumStok(item.raw.kode_barang, stokbarang) }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.actions="{item}">
        <LogBarang :headers="headers" :barang="items" :groupbarang="groupbarang" :stokbarang="stokbarang" :item="item.raw" :kode_group="item.raw.kode_group" :kode_barang="item.raw.kode_barang"/>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="!laporanstok && !masuk" v-slot:item.actions="{ item, index }">
          <menuList v-if="!view" :items="list" icon="mdi-dots-vertical" :submenu="true" @result="result" :index="index" />
          <menuList v-if="view" :items="list2" icon="mdi-dots-vertical" :submenu="true" @result="result" :index="index" />
        <dialogMaster v-model="dialog[index]" :view="view" editbtn="true" :ishidden="true" :keyform="keyform" :intable="true" :disabled="disabled" :noselect="noselect" :form="item.raw" @edit="edit" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :toolbar_title="toolbar_title"  :alpha="alpha">
          <template #cancel>
            <btnCancel @click=" dialog[index] = false" btn_title="Batal" />  
          </template>
        </dialogMaster>
        <!-- DIALOG CONFIRM -->
      <dialogConfirm v-model="confirmdialog[index]" :object="pageTitle">
        <template #yesButton>
            <btn-orange class="ms-2" type="submit" @click="del(item.raw, index)" btn_title="Ya"/>
        </template>
        <template #cancelButton>
          <btn-cancel @click="confirmdialog[index] = false" btn_title="Batal" />
        </template>
      </dialogConfirm>
      </template>
       <!-- eslint-disable-next-line vue/valid-v-slot -->
       <template v-if="masuk" v-slot:item.tgl_pembelian="{item}">{{ functions.formatDate(item.raw.tgl_pembelian) }}</template>
       <!-- eslint-disable-next-line vue/valid-v-slot -->
       <template v-if="masuk" v-slot:item.actions="{item}">
            <PemasukanDetail
            batalbtn="Pemasukan"
            @confirm="confirm"
            :supplier="supplier"
            :namaSupplier="pemasukan.dataTable(item.raw.kode_supplier, 'nama', supplier, pembeliandetl)"
            :pembelian="pemasukan.dataTable(item.raw.no_pembelian, 'pembelian', supplier, pembeliandetl)"
            :edit="true"
            :itemDetail="itemDetail"
            :datatext="datatext"
            :btn="btn"
            :headDetails="pemasukan.data().headDetails"
            :details="[details]"
            :headers="pemasukan.data().headers"
            :items="item.raw"
            :search="search"
            :category="pemasukan.data().tipedokumen"
            :selectCategory="selectCategory"
            :pageTitle="pageTitle"/>
      </template>
    </v-data-table>
    </v-sheet>
</template>
