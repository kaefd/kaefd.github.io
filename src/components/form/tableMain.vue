
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
export default {
    components: {
      VDataTable,
    },
    props: ['items', 'headers'],
    data () {
      return {
        search: '',
        
      }
    },
    methods:{
      
    },
    mounted() {
    }
}
</script>
<template>
      <v-data-table
        :headers="headers"
        :items="items"
        density="compact"
        class="text-caption pt-2 pb-12 h-100  border-sm rounded-lg"
      >
      </v-data-table>
</template>