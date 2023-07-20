<script setup>
import '@vuepic/vue-datepicker/dist/main.css'
import { id } from 'date-fns/locale';
import textFieldForm from '../form/textFieldForm.vue';
import functions from '../../service/functions';
</script>
<script>

export default {
    components: {
        textFieldForm
  },
    props:['label', 'validated', 'rules', 'filter', 'tema'],
    data () {
        return {
            data: ''
        }
    },
    created() {
        if(this.default) {
            return this.data = this.default
        }
    },
    methods: {
    },
    mounted () {
        this.def
    }
}
</script>

<template>
        <VueDatePicker
            :dark="tema == 'dark' ? true : false"
            class="text-small"
            teleport-center
            :clearable="false"
            :format-locale="id"
            required
            locale="id"
            cancelText="batal"
            selectText="pilih"
            format="PP"
            :enable-time-picker="false"
            v-model="data"
        >
            <template v-if="!filter" #trigger>
                <textFieldForm readonly :label="label" :model-value="functions.formatDate(data)" :rules="rules" hideDetails/>
            </template>
        </VueDatePicker>
</template>
<style>
.dp__theme_dark {
   --dp-background-color: #212121;
   --dp-text-color: #ffffff;
   --dp-hover-color: #484848;
   --dp-hover-text-color: #ffffff;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: #005cb2;
   --dp-primary-text-color: #ffffff;
   --dp-secondary-color: #a9a9a9;
   --dp-border-color: #2d2d2d;
   --dp-menu-border-color: #2d2d2d;
   --dp-border-color-hover: #aaaeb7;
   --dp-disabled-color: #737373;
   --dp-scroll-bar-background: #212121;
   --dp-scroll-bar-color: #484848;
   --dp-success-color: #00701a;
   --dp-success-color-disabled: #428f59;
   --dp-icon-color: #959595;
   --dp-danger-color: #e53935;
   --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
.dp__theme_light {
   --dp-background-color: #ffffff;
   --dp-text-color: #212121;
   --dp-hover-color: #f3f3f3;
   --dp-hover-text-color: #212121;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: #1976d2;
   --dp-primary-text-color: #f8f5f5;
   --dp-secondary-color: #c0c4cc;
   --dp-border-color: #ddd;
   --dp-menu-border-color: #ddd;
   --dp-border-color-hover: #aaaeb7;
   --dp-disabled-color: #f6f6f6;
   --dp-scroll-bar-background: #f3f3f3;
   --dp-scroll-bar-color: #959595;
   --dp-success-color: #76d275;
   --dp-success-color-disabled: #a3d9b1;
   --dp-icon-color: #959595;
   --dp-danger-color: #ff6f60;
   --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
.dp__input_wrap .dp__input  {
    height: 41px !important;
}
.false .dp__input_wrap .dp__input {
    border-color: rgb(192, 1, 1) !important;
}
</style>