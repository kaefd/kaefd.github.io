<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard from './DialogCard.vue';
</script>
<script>
export default {
    components: { VDataTable, DialogCard },
    props: ['headers', 'items', 'search', 'category', 'selectCategory', 'btncolor', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen'],
    
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
      dialogTable(a){
        return console.log(a);
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
      }
    }
}
</script>
<template>
  
    <v-sheet class="p-4 rounded-lg" >
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :hover="true"
      :fixed-header="true"
      style="cursor: pointer"
      density="comfortable"
      class="text-body-2 py-3 px-5"
      height="400"
    >
    <!-- dialog actions -->
      <template v-slot:item.actions>
        <DialogCard :screen="screen" :headers="headers" :items="items" :category="category" :btncolor="btncolor" :icon="icon" :iTitle="iTitle" :iVariant="iVariant"  :alpha="alpha"/>
      </template>
    </v-data-table>
    </v-sheet>
    
</template>

<style>
.v-data-table__th {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}
</style>