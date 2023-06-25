<script>
import squareButton from '../button/squareButton.vue';
import closeButton from '../button/closeButton.vue';

export default {
    components: {
        squareButton,
        closeButton
  },
    props:['icon'],
    data () {
        return {
        }
    },
    methods: {
        filter() {
            this.$emit('close', false)
        },
        reset() {
            this.$emit('reset')
        },
        filterdata() {
            this.$emit('filterdata')
        }
    }
}
</script>

<template>
<v-navigation-drawer
        class="border-0 me-4 elevation-0"
        permanent
        location="left"
        width="320"
      >
      <v-sheet class="py-5 bg-transparent">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <closeButton icon="mdi-close" @click="filter()" class="me-3 ms-auto" />
        </div>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4">
            <slot name="title" />
            <v-divider></v-divider>
            <slot name="content" />
            <v-div class="d-flex justify-end mt-12">
              <squareButton color="grey-lighten-2" btn_title="Reset" @click="reset()" class="mt-5 me-2" />
              <squareButton color="orange-lighten-1" btn_title="Filter" @click="filterdata()" class="mt-5 me-2" />
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>      
</template>