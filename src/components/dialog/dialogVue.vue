<script setup>
import BtnInfo from '../button/btnInfo.vue';
import TextButton from '../button/textButton.vue';
</script>
<script>

export default {
    components: {
        TextButton,
        BtnInfo
     },
    props:['label', 'validated', 'rules', 'master'],
    data () {
        return {
            data: ''
        }
    },
    computed: {
        
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<template>
        <v-dialog>
    <!-- button dialog -->
        <template v-slot:activator="{ props }">
            <text-button v-if="!master" v-bind="props" icon="mdi-dots-vertical" />
            <btn-info v-if="master" v-bind="props" icon="mdi-plus" btn_title="Tambah Data" />
        </template>
        <v-card class="bg-white mx-auto py-5 rounded-xl" width="370">
            <slot name="titlecard"></slot>
            <v-divider></v-divider>
            <slot name="content"></slot>
        </v-card>
    </v-dialog>
</template>
<style>
.dp__input_wrap .dp__input  {
    height: 41px !important;
}
.false .dp__input_wrap .dp__input {
    border-color: rgb(192, 1, 1) !important;
}
</style>