<script>
import squareButton from '../button/squareButton.vue';
import textButton from '../button/textButton.vue';

export default {
    components: {
        squareButton,
        textButton
  },
    props:['icon'],
    data () {
        return {
          filter: null,
        }
    },
    methods: {
        filtered() {
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
        location="left"
        width="320"
      >
      <v-sheet class="py-5 bg-transparent">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <textButton @click="filtered()" class="me-3 ms-auto" icon="mdi-close"/>
        </div>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4">
            <slot name="default" />
            <v-div class="d-flex justify-end mt-10">
              <squareButton color="grey-lighten-2" btn_title="Reset" @click="reset()" class="mt-5 me-2" />
              <squareButton color="orange-lighten-1" btn_title="Filter" @click="filterdata()" class="mt-5 me-2" />
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>      
</template>