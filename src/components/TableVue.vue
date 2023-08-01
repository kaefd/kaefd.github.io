<script setup>
import functions from '../service/functions';
import { VDataTable } from 'vuetify/labs/VDataTable'
import LogBarang from '../views/LogBarang.vue';
import dialogMaster from './dialog/dialogMaster.vue';
import dialogConfirm from './dialog/dialogConfirm.vue';
import menuList from './menu/menuList.vue';
import PemasukanDetail from '../views/PemasukanDetail.vue';
import pemasukan from '../service/page/pemasukan';
import btnCancel from './button/btnCancel.vue';
import BtnOrange from './button/btnOrange.vue';
import UserDetail from '../views/userDetail.vue';
import otoritas from '../service/page/otoritas';
import laporan from '../service/page/laporan';
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
        UserDetail,
    },
    props: [ 'userdetail', 'editdata', 'stok', 'otority','logbrg', 'user_otoritas', 'j_otoritas', 'stokbarang', 'update', 'hapus', 'groupbarang', 'laporanstok', 'masuk', 'supplier', 'pembeliandetl', 'view', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', 'toolbar_title', 'form', 'noselect', 'ishidden', 'pageTitle', 'log'],
    
    data () {
      return {
        dialog: [],
        detail: [],
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
      result2(value, i) {
        return value != 'hapus' ? this.detail[i] = true : this.confirmdialog[i] = true
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
      },
      test(i) {
        return alert(i)
      }
    },
    mounted() {
    }
}
</script>
<template>
    <v-sheet height="90%" class="bg-transparent">
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
    <!-- ACTION DELETE & EDIT -->
    <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="userdetail" v-slot:item.actions="{item, index}">
        <menuList :items="list" icon="mdi-dots-vertical" :submenu="true" @result="result2" :index="index" />
        <user-detail v-model="detail[index]" :editdata="editdata" :user_otoritas="user_otoritas" :j_otoritas="j_otoritas" :userselect="item.raw.username" :otority="otoritas.all(otority, item.raw.username)" @submitUser="edit" >
          <template #cancel>
            <btn-cancel @click="detail[index] = false" btn_title="Batal" class="mx-2" />
          </template>
        </user-detail>
        <dialogConfirm v-model="confirmdialog[index]" :object="pageTitle">
        <template #yesButton>
            <btn-orange class="ms-2" type="submit" @click="del(item.raw.username, index)" btn_title="Ya"/>
        </template>
        <template #cancelButton>
          <btn-cancel @click="confirmdialog[index] = false" btn_title="Batal" />
        </template>
      </dialogConfirm>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.actions="{item}">
        <LogBarang :headers="headers" :logbrg="logbrg" :barang="groupbarang" :groupbarang="groupbarang" :detail="laporan.subDetail(stok, item.raw.kode_barang)" :kode_group="item.raw.kode_group" :kode_barang="item.raw.kode_barang"/>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="log" v-slot:item.tanggal="{ item }">
        {{ functions.formatDateTime(item.raw.tanggal) }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="!laporanstok && !masuk && update || view" v-slot:item.actions="{ item, index }">
          <menuList :items="view ? list2 : list" icon="mdi-dots-vertical" :submenu="true" @result="result" :index="index" />
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
            :hapus="hapus"
            batalbtn="Pemasukan"
            @confirm="confirm"
            :supplier="supplier"
            :namaSupplier="pemasukan.dataTable(item.raw.kode_supplier, 'nama', supplier, pembeliandetl)"
            :pembelian="pemasukan.dataTable(item.raw.no_pembelian, 'pembelian', supplier, pembeliandetl)"
            :edit="true"
            :itemDetail="itemDetail"
            :datatext="datatext"
            :btn="btn"
            :headDetails="pemasukan.headDetails"
            :details="[details]"
            :headers="pemasukan.headers"
            :items="item.raw"
            :search="search"
            :category="pemasukan.tipedokumen"
            :selectCategory="selectCategory"
            :pageTitle="pageTitle"/>
      </template>
    </v-data-table>
    </v-sheet>
</template>
