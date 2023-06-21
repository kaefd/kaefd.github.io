<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import LogBarang from '../views/LogBarang.vue';
import DialogCard from './DialogCard.vue';
</script>
<script>
export default {
    components: { VDataTable, DialogCard, LogBarang },
    props: ['loading', 'stokbarang', 'barang', 'groupbarang', 'laporanstok', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', 'btncolor', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect', 'ishidden'],
    
    data () {
      return {
        dialog: false,
        totaldata: this.items.length,
        confirmdialog: []
      }
    },
    methods:{
      dialogTable(a){
        return console.log(a);
      },
      edit(value) {
        return this.$emit('edit', value)
      },
      del(v) {
        this.confirmdialog = false
        return this.$emit('del', v)
      },
      numb(value) {
            let val = (value / 1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      slotitem(kode, param) {
          for (let i = 0; i < this.barang.length; i++) {
            if(kode == this.barang[i].kode_barang) {
              // kategori barang
              if(param == 'k') {
                return this.barang[i].kategori_barang
              }
              else if( param == 'nm') {
                return this.barang[i].nama_barang
              }
              else if( param == 'hc') {
                return this.barang[i].hs_code
              }
              else if( param =='s') {
                return this.barang[i].satuan
              }
            }
            
          }
      },
      sumStok(kode) {
        let sum = []
        for (let i = 0; i < this.stokbarang.length; i++) {
          if(this.stokbarang[i].kode_barang == kode) {
            sum.push(this.stokbarang[i].stok_akhir)
          }
        }
        return this.numb(sum.reduce((total, current) => {
          return total + current
        }, 0))
      }
    },
    computed: {
      row() {
        let rows = []
        for (let i = 0; i < this.headers.length; i++) {
          let row = this.headers[i].value;
          rows.push(row)
        }
        return rows
      },
      datadef(value) {
        return this.$emit('def', value)
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
          {{ slotitem(item.raw.kode_barang, 'k') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.nama_barang="{ item }">
          {{ slotitem(item.raw.kode_barang, 'nm') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.hs_code="{ item }">
          {{ slotitem(item.raw.kode_barang, 'hc') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.satuan="{ item }">
          {{ slotitem(item.raw.kode_barang, 's') }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="!laporanstok" v-slot:item.actions="{ item, index }">
        <!-- <div class="d-flex justify-center">
          <DialogCard :ishidden="ishidden" :keyform="keyform" :intable="true" :disabled="disabled" :noselect="noselect" :form="item.raw" @edit="edit" @del="del" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :btncolor="btncolor" :icon="icon" :iTitle="iTitle" :iVariant="iVariant"  :alpha="alpha" />
        </div> -->
        <v-btn size="small" variant="text" color="grey-darken-2">
          <v-icon>mdi-dots-vertical</v-icon>
          <v-menu activator="parent" transition="slide-y-transition">
            <v-list density="compact" class="px-3">
              <v-list-item class="pa-0">
                <DialogCard editbtn="true" :ishidden="ishidden" :keyform="keyform" :intable="true" :disabled="disabled" :noselect="noselect" :form="item.raw" @edit="edit" @del="del" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :btncolor="btncolor" :icon="icon" :iTitle="iTitle" :iVariant="iVariant"  :alpha="alpha" />
              </v-list-item>
              <v-list-item v-if="!ishidden" class="pa-0" @click="confirmdialog[index] =  true">
                <DialogCard hapus="true" :ishidden="ishidden" :keyform="keyform" :intable="true" :disabled="disabled" :noselect="noselect" :form="item.raw" @edit="edit" @del="del" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :btncolor="btncolor" :icon="icon" :iTitle="iTitle" :iVariant="iVariant"  :alpha="alpha" />
              </v-list-item>
            </v-list>
          </v-menu>
      </v-btn>
      <v-dialog v-model="confirmdialog[index]" transition="dialog-bottom-transition" width="350">
      <v-card class="rounded-xl">
          <v-card-title class="text-center my-7">Apakah Anda Yakin ?</v-card-title>
          <v-row no-gutters>
            <v-col>
                <v-btn
                color="orange-darken-1"
                variant="tonal"
                height="57"
                class="w-100 rounded-0"
                @click="confirmdialog[index] = false"
                >
                Tidak
                </v-btn>                  
            </v-col>
            <v-col>
                <v-btn
                type="submit"
                color="blue-darken-1"
                variant="tonal"
                height="57"
                class="w-100 rounded-0"
                @click="del(item.raw)"
                >
                Ya
                </v-btn>
            </v-col>
            </v-row>
      </v-card>
    </v-dialog>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.stok_akhir="{item}">
          {{ sumStok(item.raw.kode_barang) }}
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-if="laporanstok" v-slot:item.actions="{item}">
        <LogBarang :headers="headers" :barang="barang" :groupbarang="groupbarang" :stokbarang="stokbarang" :item="item.raw" :kode_group="item.raw.kode_group" :kode_barang="item.raw.kode_barang"/>
      </template>
    </v-data-table>
    </v-sheet>
</template>
