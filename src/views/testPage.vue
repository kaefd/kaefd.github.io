<script setup>
import barang from '../service/page/barang'
import tableMain from '../components/form/tableMain.vue'
import api from '../service/api'
</script>
<script>
export default {
  component: {
    tableMain
  },
  props: ['item'],
  data () {
      return {
        items: '',
        res: '',
      }
  },
  methods: {
    async fetch() {
      this.items = await api.getBarang()
    },
    
  },
  mounted() {
    this.fetch()
  }
}
</script>

<template>
  <table-main
  :headers="barang.headers"
  :items="items"
  >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions>
      a
    </template>
  </table-main>
</template>
