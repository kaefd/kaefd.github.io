<script setup>
import { RouterView } from 'vue-router'
import { mergeProps } from 'vue'
</script>

<script>
export default {
    data () {
      return {
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: 'indigo-darken-1', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-pencil', color: 'indigo-darken-1', variant: 'tonal', width: '30px', height: '30px' },
          { text: 'Hapus Data', icon: 'mdi-delete', color: 'red-darken-1', variant: 'tonal', width: '30px', height: '30px' },
          { text: 'Detail Data', icon: 'mdi-dots-vertical', color: 'grey-darken-1', variant: 'text', width: '30px', height: '30px' },
        ],
      }
    },
    methods: {
      mergeProps,
    },
  }
</script>

  <template>
      <v-layout>
        <v-main class="d-flex justify-center bg-grey-lighten-3" style="width:max-content">
            <RouterView class="rounded shadow" :actIcon="actIcon" />
        </v-main>
      </v-layout>
  </template>

<style>
a {
  text-decoration: none;
}
</style>
  
