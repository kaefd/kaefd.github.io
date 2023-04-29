<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import DialogCard from './DialogCard.vue';
</script>
<script>
export default {
    components: { VDataTable, DialogCard },
    props: ['disabled', 'headers', 'items', 'search', 'category', 'btncolor', 'iTitle', 'icon', 'iVariant', 'alpha', 'screen', 'form', 'noselect'],
    
    data () {
      return {
        dialog: false,
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
        return this.$emit('del', v)
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
      :variant="tonal"
      class="text-body-2 py-3 px-5 rounded-select"
      height="400"
    >
    <!-- dialog actions -->
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <DialogCard :disabled="disabled" :noselect="noselect" :form="form" @edit="edit" @del="del" :item="item" :screen="screen" :headers="headers" :items="items" :category="category" :btncolor="btncolor" :icon="icon" :iTitle="iTitle" :iVariant="iVariant"  :alpha="alpha"/>
      </template>
    </v-data-table>
    </v-sheet>
    
</template>

<style scoped>
.v-data-table__th {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}
</style>