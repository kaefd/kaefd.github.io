<script setup>
import TableVue from '../components/TableVue.vue';
import ScreenDialog from '../components/ScreenDialog.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>

<script>
  export default {
    components: {
    TableVue, ScreenDialog, AppBar, NavDrawers
    },
    props:['page','actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        pageTitle: 'PEMASUKAN BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        category: [
          'semua',
          'Bahan Baku',
          'Bahan Penolong',
          'Barang Setengah Jadi',
          'Barang Jadi',
          'Barang Sisa (Scrap)',
          'Mesin & Peralatan',
        ],
        headers: [
          { title: 'Nomor Pemasukan', key: 'numIn'},
          { title: 'Tanggal Masuk', key: 'dateIn' },
          { title: 'Tipe Dokumen', key: 'doctype' },
          { title: 'No Dokumen', key: 'docNumb' },
          { title: 'Supplier', key: 'supplier' },
          { title: 'Mata Uang', key: 'matauang' },
          { title: 'Total Nilai', key: 'total' },
          { title: 'Total Nilai(Rp)', key: 'rp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            numIn: 1,
            dateIn: 159,
            doctype: 6.0,
            docNumb: 24,
            supplier: 4.0,
            matauang: 'idr',
            total: 2,
            rp: 14000
          },
        ],
      }
    },
    methods: {
      selected(){        
        //show row selected
        if(this.selectCategory == 'semua'){
          return this.items
        } else {
          return this.items.filter(item => item.categories === this.selectCategory )
          }
      },
    }
  }
</script>

<template>
  
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>

  <v-container>
    <v-row no-gutters class="bg-white align-center px-4 pb-lg-0 pb-4 my-1 mb-3 rounded-lg">
      <v-responsive class="me-2 w-100" max-width="700" max-height="70" cols="6" xs="4">
        <div class="d-flex mt-4 align-start">
          <!-- select tipe dokumen -->
          <v-select
            label="Select"
            value="Tioe Dokumen"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 me-2 w-50"
            single-line
          ></v-select>
          <!-- date field -->
          <v-text-field
            v-model="datein"
            type="date"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 ms-2">
          </v-text-field>
          <!-- date field -->
          <v-text-field
            v-model="date"
            type="date"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 ms-2">
          </v-text-field>

        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex align-center float-lg-right float-sm-left w-75">
          <!-- search field -->
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4 pt-5 me-2"
          ></v-text-field>

            <!-- add data -->
            <ScreenDialog :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha"/>
              <v-btn
              color="indigo-darken-1"
              icon="mdi-download"
              class="rounded-lg ms-2"
              variant="tonal"
              size="small"
              @click="exportExcel()"
            ></v-btn>
          </div>
      </v-responsive>
      </v-row>
      <!-- edit data -->
        <TableVue :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha"/>
  </v-container>

</template>
