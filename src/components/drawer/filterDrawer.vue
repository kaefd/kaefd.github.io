<script>
import BtnCancel from '../button/btnCancel.vue';
import BtnOrange from '../button/btnOrange.vue';

export default {
    components: {
        BtnOrange,
        BtnCancel
    },
    props: ['icon'],
    data() {
        return {
            filter: false,
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
            return this.filtered()
        }
    }
}
</script>

<template>
<v-navigation-drawer class="border-0 elevation-0 mt-5 rounded-left" width="320" location="right" temporary>
    <v-sheet class="py-5 h-85 rounded-left">
        <div class="d-flex align-center">
            <v-span class="text-button ms-4">Filter</v-span>
        </div>
        <!-- KATEGORI BARANG -->
        <v-container class="py-3 px-4 h-100">
            <slot name="default" />
        </v-container>
    </v-sheet>
    <v-div class="d-flex ms-5">
        <btn-cancel btn_title="Reset" @click="reset()" class="mt-5 me-2" />
        <btn-orange btn_title="Filter" @click="filterdata()" class="mt-5 me-2" />
    </v-div>
</v-navigation-drawer>
</template>
