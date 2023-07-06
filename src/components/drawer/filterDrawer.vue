<script>
import BtnCancel from '../button/btnCancel.vue';
import BtnOrange from '../button/btnOrange.vue';
import textButton from '../button/textButton.vue';

export default {
    components: {
        textButton,
        BtnOrange,
        BtnCancel
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
        location="right"
        width="320"
      >
      <v-sheet class="py-5 bg-grey-lighten-5">
        <div class="d-flex align-center">
          <v-span class="text-button ms-4">Filter</v-span>
          <textButton @click="filtered()" class="me-3 ms-auto" icon="mdi-close"/>
        </div>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4">
            <slot name="default" />
            <v-div class="d-flex justify-end mt-10">
              <btn-cancel btn_title="Reset" @click="reset()" class="mt-5 me-2" />
              <btn-orange btn_title="Filter" @click="filterdata()" class="mt-5 me-2" />
            </v-div>
        </v-container>
      </v-sheet>
  </v-navigation-drawer>      
</template>