<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard from './DialogCard.vue';
</script>
<script>
export default {
    components: { VDataTable, DialogCard },
    props: ['loading', 'barang', 'laporanstok', 'disabled', 'keyform', 'headers', 'items', 'search', 'category', 'btncolor', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect', 'ishidden'],
    
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
    <v-sheet class="rounded-b-xl">
      <!-- TABEL DATA -->
    <v-data-table
      items-per-page="10"
      :headers="headers"
      :items="items"
      :search="search"
      :hover="true"
      :fixed-header="true"
      density="compact"
      class="text-caption py-3 rounded-b-xl"
      height="63vh"
    >
    <!-- CUSTOM PAGINATION STYLE -->
    
    <!-- ACTION DELETE & EDIT -->
    <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-if="laporanstok" v-slot:item.kategori_barang="{ item }">
              <td>{{ slotitem(item.raw.kode_barang, 'k') }}</td>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-if="laporanstok" v-slot:item.nama_barang="{ item }">
              <td>{{ slotitem(item.raw.kode_barang, 'nm') }}</td>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-if="laporanstok" v-slot:item.hs_code="{ item }">
              <td>{{ slotitem(item.raw.kode_barang, 'hc') }}</td>
          </template>
          <!-- eslint-disable-next-line vue/valid-v-slot -->
          <template v-if="laporanstok" v-slot:item.satuan="{ item }">
              <td>{{ slotitem(item.raw.kode_barang, 's') }}</td>
          </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item, index }">
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
    </v-data-table>
    </v-sheet>
</template>

<style lang="scss">
.v-theme--light > .v-data-table {
  --v-theme-surface: #fafafa;
}

.v-table  {
    background: var(--v-theme-surface);
}

th {
  background: #fafafa !important;
}

</style>