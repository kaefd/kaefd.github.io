<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import LogBarang from '../views/LogBarang.vue';
import dialogMaster from './dialog/dialogMaster.vue';
import barang from '../service/page/barang';
import dialogConfirm from './dialog/dialogConfirm.vue';
import squareButton from './button/squareButton.vue';
import menuList from './menu/menuList.vue';
import textButton from './button/textButton.vue';
import PemasukanDetail from '../views/PemasukanDetail.vue';
import pemasukan from '../service/page/pemasukan';
</script>
<script>
export default {
    components: {
      PemasukanDetail,
      VDataTable,
      dialogMaster,
      LogBarang,
      dialogConfirm,
      squareButton,
      textButton,
      menuList,
    },
    // props: ['loading', 'stokbarang', 'barang', 'groupbarang', 'laporanstok', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', '', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect', 'ishidden'],
    props: ['stokbarang', 'groupbarang', 'laporanstok', 'masuk', 'supplier', 'pembeliandetl', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect', 'ishidden', 'pageTitle'],
    
    data () {
      return {
        dialog: [],
        totaldata: this.items.length,
        confirmdialog: [],
        list: [
          {title: 'Edit Data', key: 'edit', icon: 'mdi-pencil'},
          {title: 'Hapus Data', key: 'hapus', icon: 'mdi-delete'},
        ],
      }
    },
    methods:{
      result(value, i) {
        return value == 'edit' ? this.dialog[i] = true : this.confirmdialog[i] = true
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
      <menuList :items="list" icon="mdi-dots-vertical" :submenu="true" @result="result" :index="index" />
        <dialogMaster v-model="dialog[index]" editbtn="true" :ishidden="true" :keyform="keyform" :intable="true" :disabled="disabled" :noselect="noselect" :form="item.raw" @edit="edit" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :iTitle="iTitle"  :alpha="alpha">
          <template #close>
            <textButton class="absolute" @click="dialog[index] = false" icon="mdi-close"/>
          </template>
        </dialogMaster>
        <!-- DIALOG CONFIRM -->
      <dialogConfirm v-model="confirmdialog[index]" :object="pageTitle">
        <template #yesButton>
            <squareButton type="submit" variant="outlined" color="orange-lighten-1" @click="del(item.raw, index)" btn_title="Ya"/>
        </template>
        <template #cancelButton>
          <squareButton type="submit" variant="outlined" color="grey" @click="confirmdialog[index] = false" btn_title="Batal" />
        </template>
      </dialogConfirm>
      </template>
       <!-- eslint-disable-next-line vue/valid-v-slot -->
       <template v-if="masuk" v-slot:item.actions="{item}">
            <PemasukanDetail
            batalbtn="Pemasukan"
            @confirm="confirm"
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
