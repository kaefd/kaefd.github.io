<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import MenuList from '../menu/menuList.vue';
</script>
<script>
export default {
    components: {
    VDataTable,
    MenuList,
},
    props: ['headers', 'items', 'search'],
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
      del(v, i) {
        this.confirmdialog[i] =  false
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
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.actions>
        <menuList
          icon="mdi-dots-vertical"
          :items="cetak"
          @result="print"
        />
      </template>
    </v-data-table>
    </v-sheet>
</template>
