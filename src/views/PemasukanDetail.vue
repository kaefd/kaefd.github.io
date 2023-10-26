<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import dialogScroll from '../components/dialog/dialogScroll.vue'
import functions from '../service/functions'
import datePicker from '../components/datepicker/datePicker.vue'
import textButton from '../components/button/textButton.vue'
import textFieldForm from '../components/form/textFieldForm.vue'
import dialogSearch from '../components/dialog/dialogSearch.vue'
import menuForm from '../components/menu/menuForm.vue'
import menuList from '../components/menu/menuList.vue'
import BtnCancel from '../components/button/btnCancel.vue'
import BtnOrange from '../components/button/btnOrange.vue'
import dialogVue from '../components/dialog/dialogVue.vue'
import CurrencyInput from '../components/form/currencyInput.vue'
import BtnInfo from '../components/button/btnInfo.vue'
import pemasukan from '../service/page/pemasukan'
import AlertVue from '../components/dialog/alertVue.vue'
</script>

<script>
export default {
  props: [
    'tema',
    'window',
    'windowH',
    'hapus',
    'total_nilai',
    'barang',
    'pembelianbaru',
    'laporan',
    'namaPelanggan',
    'total',
    'groupbarang',
    'batalbtn',
    'penjualan',
    'pemasukan',
    'alamatBongkar',
    'totalpenjualan',
    'namaTujuan',
    'datainput',
    'pageTitle',
    'pengeluaran',
    'dokumenpjl',
    'namaSupplier',
    'pengirimanDetail',
    'pembelian',
    'pelanggan',
    'supplier',
    'pembeliandetl',
    'edit',
    'kirim',
    'headers',
    'items',
    'search',
    'iVariant',
    'headDetails',
    'details',
    'disable',
    'btn',
    'datatext',
    'itemDetail',
    'category',
    'view_persentase'
  ],
  data() {
    return {
      dialog: false,
      valid: false,
      dial_alert: false,
      detaildial: [],
      tipe_dokumen: [
        { title: 'BC23', key: 'BC23' },
        { title: 'BC40', key: 'BC40' },
        { title: 'PPKEK dari LDP', key: 'PPKEK-LDP' },
        { title: 'PPKEK dari TDDP', key: 'PPKEK-TLDDP' }
      ],
      list: [
        { title: 'Lihat Data', key: 'lihat' },
        { title: 'Batal Pemasukan', key: 'batal' }
      ],
      viewOnly: [{ title: 'Lihat Data', key: 'lihat' }],
      item: '',
      searched: '',
      namasupplier: '',
      dataitem: this.items,
      nama_supplier: '',
      nama_pelanggan: '',
      tujuan_bongkar: '',
      message: '',
      pembelian_input: [],
      inputdata: this.datainput,
      kurs: '',
      pemasukan_detail: '',
      pembelian_detail: [this.pembelian],
      validated: Boolean,
      required: [
        (value) => {
          if (value) return true
          return this.message = 'kolom tidak boleh kosong !'
        }
      ],
      max_10: [
        (value) => {
          if(value > 100 || value < 0)
          return this.message = 'nilai persentase harus 0 - 100'
        }
      ]
    }
  },

  created() {
    if (this.edit) {
      let k = (this.dataitem.kurs / 1).toFixed(3).replace('.', ',')
      this.kurs = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    heightSizing() {
      let h = ''
      if (this.edit) {
        if (this.window > 1500) {
          if (this.windowH > 800) {
            h = '55vh'
          } else h = '40vh'
        } else if (this.window < 1500) {
          if (this.windowH > 800) {
            h = '55vh'
          } else h = '47vh'
        }
      } else if (!this.edit) {
        if (this.window > 1500) {
          if (this.windowH > 800) {
            h = '53vh'
          } else h = '40vh'
        } else if (this.window < 1500) {
          if (this.windowH > 800) {
            h = '40vh'
          } else h = '30vh'
        }
      }
      return h
    }
  },
  methods: {
    itemmasuk(v, total) {
      this.inputdata.total_nilai = total
      this.pembelian_input = v
    },
    menuAksi(v) {
      v == 'lihat' ? (this.dialog = true) : this.confirm()
    },
    confirm() {
      this.$emit('confirm', this.items, this.pembelian)
    },
    pilihObjek(s) {
      this.inputdata.kode_supplier = s.kode_supplier
      this.namasupplier = s.nama
    },
    pilihtipedokumen(v) {
      return (this.inputdata.tipe_dokumen = v)
    },
    deleteditem(del) {
      for (let i = 0; i < this.pembelian_input.length; i++) {
        if (del == this.pembelian_input[i]) {
          this.pembelian_input.splice(i, 1)
        }
      }
    },
    jumlahtotal(v, p) {
      let arr = []
      for (let i = 0; i < v.length; i++) {
        if (p == 'jumlah') {
          arr.push(v[i].jumlah)
        }
        if (p == 'nilai') {
          arr.push(v[i].nilai)
        }
      }
      return arr.reduce((total, current) => {
        return total + current
      }, 0)
    },
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        // inputata = head
        // pembelian_input = detail
        let a = []
        for (let i = 0; i < this.pembelian_input.length; i++) {
          a.push({
            no_pembelian: this.pembelian_input[i].no_pembelian,
            kode_barang: this.pembelian_input[i].kode_barang,
            nama_barang: this.pembelian_input[i].nama_barang,
            hs_code: this.pembelian_input[i].hs_code,
            jumlah: this.pembelian_input[i].jumlah,
            jumlah_diterima: this.pembelian_input[i].jumlah_diterima,
            satuan: this.pembelian_input[i].satuan,
            nilai: this.pembelian_input[i].nilai,
            no_urut: i + 1
          })
        }
        this.$emit('inputhead', this.inputdata, a)
        this.dialog = false
      } else {
        this.dial_alert = true
      }
    }
  }
}
</script>
<template>
  <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
    <template v-slot:activator="{ props }">
      <!-- TAMBAH -->
      <btn-info v-if="!edit" v-bind="props" icon="mdi-plus" btn_title="Tambah Baru" />
      <menuList
        v-if="edit"
        :submenu="true"
        icon="mdi-dots-vertical"
        :items="hapus ? list : viewOnly"
        @result="menuAksi"
      />
    </template>
    <!-- dialog content -->
    <v-card class="bg-light">
      <v-toolbar class="bg-blue-custom text-white fixed" height="50">
        <textButton
          icon="mdi-close"
          @click=";(pembelian_input = []), (inputdata = []), (dialog = false)"
          :color="white"
        />
        <v-toolbar-title class="text-button mt-1">{{ 'DETAIL ' + pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container class="h-100 d-flex flex-column mt-1">
        <!-- EDIT -->
        <div v-if="edit" class="d-flex justify-space-between w-100 rounded-lg bg-white py-5 px-3 mb-2 flex-wrap">
          <div style="width: 300px;">
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Pemasukan</span>
              <textFieldForm label="No Pemasukan" :model-value="items.no_pembelian" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tgl Pemasukan</span>
              <textFieldForm
                label="Tgl Pemasukan"
                :model-value="functions.formatDate(items.tgl_pembelian)"
                readonly
              />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Nama Supplier</span>
              <textFieldForm label="Nama Supplier" :model-value="items.kode_supplier" readonly />
            </div>
          </div>
          <div style="width: 300px;">
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tipe Dokumen</span>
              <textFieldForm label="Tipe Dokumen" :model-value="items.tipe_dokumen" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Dokumen</span>
              <textFieldForm label="No Dokumen" :model-value="items.no_dokumen" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tgl Dokumen</span>
              <textFieldForm label="Tgl Dokumen" :model-value="items.tgl_dokumen" readonly />
            </div>
            <div v-if="view_persentase" class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Persentase</span>
              <textFieldForm label="Persentase" type="number" :model-value="items.persentase" readonly />
            </div>
          </div>
          <div style="width: 300px;">
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Invoice</span>
              <textFieldForm label="No Invoice" :model-value="items.no_invoice" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Bl</span>
              <textFieldForm label="No BL" :model-value="items.no_bl" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Mata Uang</span>
              <textFieldForm label="Mata Uang" :model-value="items.mata_uang" readonly />
            </div>
            <div class="d-flex justify-space-between align-center">
              <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Kurs</span>
              <textFieldForm type="number" label="Kurs" :model-value="items.kurs" readonly />
            </div>
          </div>
        </div>
        <!-- TAMBAH PEMASUKAN -->
        <v-form v-if="!edit && pemasukan" @submit.prevent ref="form">
          <div class="d-flex justify-space-between w-100 flex-wrap bg-white px-3 py-5 rounded-lg mb-2">
            <div style="width: 300px;">
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Pemasukan</span>
                <textFieldForm label="No Pemasukan" v-model="inputdata.no_pembelian" readonly class="bg-grey-lighten-4"/>
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tgl Pemasukan</span>
                <datePicker class="" label="Tgl Pemasukan" v-model="inputdata.tgl_pembelian" :min-date="functions.last_month()" :max-date="new Date()" :tema="tema" :rules="required" />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Supplier</span>
                <dialogSearch
                  v-if="!edit"
                  :window="window"
                  label="Supplier"
                  :objectFilter="supplier"
                  @pilihObjek="pilihObjek"
                  cardTitle="SUPPLIER"
                  max-width="400"
                  :rules="required"
                />
              </div>
            </div>
            <div style="width: 300px;">
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tipe Dokumen</span>
                <textFieldForm id="tipe" label="Tipe Dokumen" v-model="inputdata.tipe_dokumen" readonly :rules="required" />
                <menuForm
                  activator="#tipe"
                  icon="mdi-dots-vertical"
                  :items="tipe_dokumen"
                  @result="pilihtipedokumen"
                />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Dokumen</span>
                <textFieldForm
                  label="No Dokumen"
                  v-model="inputdata.no_dokumen"
                  required
                  :rules="required"
                />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Tgl Dokumen</span>
                <datePicker
                  label="Tgl Dokumen"
                  v-model="inputdata.tgl_dokumen"
                  :min-date="functions.last_month()"
                  :max-date="new Date()"
                  :rules="required"
                  :tema="tema"
                
                />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Persentase</span>
                <textFieldForm type="number" label="Persentase" v-model="inputdata.persentase" :rules="max_10" />
              </div>
            </div>
            <div style="width: 300px;">
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Invoice</span>
                <textFieldForm label="No Invoice" v-model="inputdata.no_invoice" :rules="required" />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">No Bl</span>
                <textFieldForm label="No BL" v-model="inputdata.no_bl" :rules="required" />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Mata Uang</span>
                <textFieldForm label="Mata Uang" v-model="inputdata.mata_uang" :rules="required" />
              </div>
              <div class="d-flex justify-space-between align-center">
                <span class="text-caption mt-n2" style="width: 90px; max-width:90px;">Kurs</span>
                <textFieldForm type="number" label="Kurs" v-model="inputdata.kurs" :rules="required" />
              </div>
            </div>
          </div>
        </v-form>
        <!-- TABEL EDIT/VIEW -->
        <div class="bg-white rounded-lg">
          <div
            v-if="!edit"
            :pembelianbaru="pembelianbaru"
            :pembeliandetl="pembeliandetl"
            class="text-sm-left text-center ma-3"
          >
            <dialogScroll
              :window="window"
              @reset="reset"
              :inptbarang="true"
              :kurs="inputdata.kurs"
              :barang="barang"
              :itemDetail="itemDetail"
              @pemasukanitem="itemmasuk"
              :pemasukan="true"
              dialog_title="Data Barang"
              :btn="btn"
            />
          </div>
          <v-data-table
            :headers="headDetails"
            :items="edit ? pembelian : pembelian_input"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption pa-2 h-100"
            :height="heightSizing"
          >
            <template v-slot:bottom>
              <v-span v-if="edit" class="float-end me-5 text-caption font-weight-medium"
                >Total Jumlah : {{ functions.numb(jumlahtotal(pembelian, 'jumlah')) }} / Total
                nilai: {{ functions.numb(jumlahtotal(pembelian, 'nilai'), 2, true) }}</v-span
              >
              <v-span v-if="!edit" class="float-end me-5 text-caption font-weight-medium"
                >Total Jumlah : {{ functions.numb(jumlahtotal(pembelian_input, 'jumlah')) }} / Total
                nilai: {{ functions.numb(jumlahtotal(pembelian_input, 'nilai'), 2, true) }}</v-span
              >
            </template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.nilai="{ item }">{{
              functions.numb(item.raw.nilai, 2, true)
            }}</template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jumlah="{ item }">{{ functions.numb(item.raw.jumlah) }}</template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.jumlah_diterima="{ item }">{{
              functions.numb(item.raw.jumlah_diterima)
            }}</template>
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{ item, index }">
              <dialogVue v-model="detaildial[index]">
                <template #titlecard>
                  <v-card-title class="text-center text-button font-weight-bold text-grey-darken-3">{{
                    item.raw.nama_barang
                  }}</v-card-title>
                  <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{
                    item.raw.hs_code
                  }}</v-card-subtitle>
                </template>
                <template #content>
                  <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
                    <div class="d-flex">
                      <span class="text-caption" style="width: 90px; max-width:90px;">Jumlah</span>
                      <text-field-form
                        v-if="edit"
                        label="Jumlah"
                        :model-value="functions.numb(item.raw.jumlah)"
                        active="true"
                        readonly
                        :hide-details="true"
                        class="mb-3"
                      />
                      <CurrencyInput
                        v-if="!edit"
                        label="Jumlah"
                        v-model="pembelian_input[index].jumlah"
                        active="true"
                        hide-details
                        class="mb-3"
                        :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                      />
                    </div>
                    <div class="d-flex">
                      <span class="text-caption" style="width: 90px; max-width:90px;">Jumlah Diterima</span>
                      <CurrencyInput
                        v-if="!edit"
                        label="Jumlah diterima"
                        v-model="pembelian_input[index].jumlah_diterima"
                        hide-details
                        class="mb-3"
                        :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                      />
                      <text-field-form
                        v-if="edit"
                        label="Jumlah diterima"
                        :model-value="functions.numb(item.raw.jumlah_diterima)"
                        readonly
                        hide-details
                        class="mb-3"
                      />
                    </div>
                    <div class="d-flex">
                      <span class="text-caption" style="width: 90px; max-width:90px;">Total Nilai</span>
                      <CurrencyInput
                        v-if="!edit"
                        label="Total nilai"
                        v-model="pembelian_input[index].nilai"
                        hide-details
                        :options="{ currency: 'EUR', currencyDisplay: 'hidden' }"
                      />
                      <text-field-form
                        v-if="edit"
                        label="Total nilai"
                        :model-value="items.total_nilai"
                        :readonly="true"
                        hide-details
                      />
                    </div>
                  </v-sheet>
                  <div v-if="!edit" class="d-flex me-5 mt-5 ms-auto">
                    <btn-cancel
                      btn_title="Hapus"
                      @click="deleteditem(item.raw), (detaildial[index] = false)"
                      class="me-2"
                      >Hapus</btn-cancel
                    >
                    <btn-orange btn_title="Simpan" @click="detaildial[index] = false"
                      >Simpan</btn-orange
                    >
                  </div>
                </template>
              </dialogVue>
            </template>
          </v-data-table>
        </div>
        <div class="d-flex mt-2 me-5 ms-auto">
          <btn-cancel
            class="mb-3 me-2"
            btn_title="Batal"
            v-if="!edit"
            @click=";(pembelian_input = []), (inputdata = []), (dialog = false)"
          />
          <btn-orange
            class="mb-3"
            type="submit"
            btn_title="Simpan"
            v-if="!edit"
            @click="validate"
          />
        </div>
      </v-container>
    </v-card>
    <AlertVue v-model="dial_alert" :message="message" status="warn" />
  </v-dialog>
</template>

<style>
.max-width-25 {
  width: 300px;
}
.btn-custom {
  box-shadow: none;
  width: 100px;
  height: 45px !important;
}

input#input-335.v-field__input {
  width: 200px !important;
}
</style>
