<script setup>
import { RouterView } from 'vue-router'
import { mergeProps } from 'vue'
import NavDrawers from './components/NavDrawers.vue';
import AppBar from './components/AppBar.vue';

</script>

<script>
export default {
  components: {
    AppBar,
    NavDrawers,
  },
    data () {
      return {
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: '#3B7AA9', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-square-edit-outline', color: '#3B7AA9', variant: 'text', width: '30px', height: '30px' },
          { text: 'Hapus Data', icon: 'mdi-delete', color: 'red-darken-1', variant: 'text', width: '30px', height: '30px' },
          { text: 'Detail Data', icon: 'mdi-dots-vertical', color: 'grey-darken-1', variant: 'text', width: '30px', height: '30px' },
        ],
        cetak: [
          {title: 'export ke xlsx', icon: 'mdi-download'},
          {title: 'export ke pdf', icon: 'mdi-file-pdf-box'},
        ],

        pageTitle: ''
      }
    },
    methods: {
      mergeProps,
      page(value) {
        this.pageTitle = value
      }
    },
    mounted() {
      this.page()
      this.pageTitle
    }
  }
</script>

  <template>
      <v-layout>
        <NavDrawers v-if="pageTitle != null" :pageTitle="pageTitle" />
        <AppBar v-if="pageTitle != null" :pageTitle="pageTitle"/>
        <v-main>
          <v-container class="d-flex justify-center bg-grey-lighten-5" fluid style="height:70vh">
            <RouterView :actIcon="actIcon" :cetak="cetak" @page="page" />
          </v-container>
        </v-main>
      </v-layout>
  </template>

<style>
a {
  text-decoration: none;
}


</style>
  
