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
</script>

<script>
export default {
  components: {
    dialogScroll,
    VDataTable,
    datePicker,
    textButton,
    textFieldForm,
    dialogSearch,
    menuForm,
    menuList,
    BtnCancel,
    BtnOrange,
    dialogVue,
    CurrencyInput,
    BtnInfo
  },
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
    'category'
  ],
  data() {
    return {
      dialog: false,
      valid: false,
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
      pembelian_input: [],
      inputdata: this.datainput,
      kurs: '',
      pemasukan_detail: '',
      pembelian_detail: [this.pembelian],
      validated: Boolean,
      required: [
        (value) => {
          if (value) return true

          return 'harus diisi !'
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
          } else h = '40vh'
        }
      } else if (!this.edit) {
        if (this.window > 1500) {
          if (this.windowH > 800) {
            h = '40vh'
          } else h = '23vh'
        } else if (this.window < 1500) {
          if (this.windowH > 800) {
            h = '40vh'
          } else h = '23vh'
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
    <v-card>
      <v-toolbar class="bg-blue-custom text-white" height="50">
        <textButton
          icon="mdi-close"
          @click=";(pembelian_input = []), (inputdata = []), (dialog = false)"
          :color="white"
        />
        <v-toolbar-title class="text-button mt-1">{{ 'DETAIL ' + pageTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container class="h-100 d-flex flex-column mt-5">
        <!-- EDIT -->
        <v-row
          no-gutters
          v-if="edit"
          justify="center"
          justify-md="space-between"
          align="start"
          min-width="400"
          class="mx-3"
        >
          <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
            <textFieldForm label="No Pemasukan" :model-value="items.no_pembelian" readonly />
            <textFieldForm
              label="Tgl Pemasukan"
              :model-value="functions.formatDate(items.tgl_pembelian)"
              readonly
            />
            <textFieldForm label="Nama Supplier" :model-value="items.kode_supplier" readonly />
          </v-responsive>
          <v-responsive class="pt-2 mx-3" width="250">
            <textFieldForm label="Tipe Dokumen" :model-value="items.tipe_dokumen" readonly />
            <textFieldForm label="No Dokumen" :model-value="items.no_dokumen" readonly />
            <textFieldForm label="Tgl Dokumen" :model-value="items.tgl_dokumen" readonly />
            <textFieldForm type="number" label="Persentase" :model-value="items.persentase" />
          </v-responsive>
          <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
            <textFieldForm label="No Invoice" :model-value="items.no_invoice" readonly />
            <textFieldForm label="No BL" :model-value="items.no_bl" readonly />
            <textFieldForm label="Mata Uang" :model-value="items.mata_uang" readonly />
            <textFieldForm type="number" label="Kurs" :model-value="items.kurs" readonly />
          </v-responsive>
        </v-row>
        <!-- TAMBAH PEMASUKAN -->
        <v-form v-if="!edit && pemasukan" @submit.prevent ref="form" class="mx-3">
          <v-row no-gutters justify="center" justify-md="space-between">
            <v-responsive class="pt-2 mx-md-0 mx-3 overflow-visible" width="250">
              <textFieldForm
                label="No Pemasukan"
                v-model="inputdata.no_pembelian"
                readonly
                class="bg-grey-lighten-4"
              />
              <datePicker
                label="Tgl Pemasukan"
                v-model="inputdata.tgl_pembelian"
                :max-date="new Date()"
                :tema="tema"
                :rules="required"
              />
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
            </v-responsive>
            <v-responsive class="pt-2 mx-3 overflow-visible" width="250">
              <textFieldForm
                id="tipe"
                label="Tipe Dokumen"
                v-model="inputdata.tipe_dokumen"
                readonly
                :rules="required"
              />
              <menuForm
                activator="#tipe"
                icon="mdi-dots-vertical"
                :items="tipe_dokumen"
                @result="pilihtipedokumen"
              />
              <textFieldForm
                label="No Dokumen"
                v-model="inputdata.no_dokumen"
                required
                :rules="required"
              />
              <datePicker
                label="Tgl Dokumen"
                v-model="inputdata.tgl_dokumen"
                :max-date="new Date()"
                :tema="tema"
                :rules="required"
              />
              <textFieldForm type="number" label="Persentase" v-model="inputdata.persentase" />
            </v-responsive>
            <v-responsive class="pt-2 mx-md-0 mx-3" width="250">
              <textFieldForm label="No Invoice" v-model="inputdata.no_invoice" :rules="required" />
              <textFieldForm label="No BL" v-model="inputdata.no_bl" :rules="required" />
              <textFieldForm label="Mata Uang" v-model="inputdata.mata_uang" :rules="required" />
              <textFieldForm
              type="number"
              label="Kurs"
              v-model="inputdata.kurs"
              :rules="required"
              />
            </v-responsive>
          </v-row>
        </v-form>
        <v-container
          v-if="!edit"
          :pembelianbaru="pembelianbaru"
          :pembeliandetl="pembeliandetl"
          class="text-sm-left text-center mb-n5"
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
            max-width="400"
          />
        </v-container>
        <!-- TABEL EDIT/VIEW -->
        <v-container>
          <v-data-table
            :headers="headDetails"
            :items="edit ? pembelian : pembelian_input"
            :hover="true"
            :fixed-header="true"
            density="compact"
            class="text-caption pt-1 border-sm rounded-lg my-3 h-100"
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
                  <v-card-title class="text-center text-button font-weight-bold text-orange">{{
                    item.raw.nama_barang
                  }}</v-card-title>
                  <v-card-subtitle class="text-caption text-center mb-2 mt-n3">{{
                    item.raw.hs_code
                  }}</v-card-subtitle>
                </template>
                <template #content>
                  <v-sheet class="mx-auto mt-5 w-75 bg-transparent">
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
                  </v-sheet>
                  <v-divider class="mt-3 mb-5"></v-divider>
                  <v-div v-if="!edit" class="d-flex me-5 ms-auto">
                    <btn-cancel
                      btn_title="Hapus"
                      @click="deleteditem(item.raw), (detaildial[index] = false)"
                      class="me-2"
                      >Hapus</btn-cancel
                    >
                    <btn-orange btn_title="Simpan" @click="detaildial[index] = false"
                      >Simpan</btn-orange
                    >
                  </v-div>
                </template>
              </dialogVue>
            </template>
          </v-data-table>
        </v-container>
        <v-div class="d-flex mb-0 mt-auto me-5 ms-auto">
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
        </v-div>
      </v-container>
    </v-card>
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
