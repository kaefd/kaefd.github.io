<script setup>
</script>
<script>

export default {
    components: {
  },
    props:['label', 'validated', 'rules'],
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
            <v-btn
            v-bind="props"
            size="small"
            variant="text"
            color="grey-darken-2"
            icon
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
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