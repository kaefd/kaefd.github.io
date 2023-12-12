<template>
    <VueDatePicker v-if="type == 'date' && !variant"
        :dark="store().theme == 'dark' ? true : false"
        placeholder="periode"
        :clearable="false"
        :format-locale="id"
        teleport-center
        :min-date="rangedate.min"
        :max-date="rangedate.max"
        required
        locale="id"
        cancelText="batal"
        selectText="pilih"
        format="PP"
        calendar-cell-class-name="dp-custom-cell"
        menu-class-name="dp-custom-menu"
        :input-class-name="store().theme == 'dark' ? 'dp-custom-input-dark' : 'dp-custom-input'"
        :enable-time-picker="false"
        class="w-[60%] min-w-[200px]"
        :disabled="disabled"
        v-model="date"
        @update:model-value="selectDate"
    ></VueDatePicker>
    <VueDatePicker v-if="type == 'date' && variant == 'pills'"
        :dark="store().theme == 'dark' ? true : false"
        placeholder="periode"
        :clearable="false"
        :format-locale="id"
        month-picker
        required
        locale="id"
        cancelText="batal"
        selectText="pilih"
        format="MMMM uu"
        calendar-cell-class-name="dp-custom-cell"
        :input-class-name="store().theme == 'dark' ? 'dp-custom-pill-dark' : 'dp-custom-pill'"
        :enable-time-picker="false"
        class="w-[60%] min-w-[200px]"
        :disabled="disabled"
        v-model="date"
        @update:model-value="selectDate"
    ></VueDatePicker>
    <div v-if="type == 'search' && variant == 'underlined'" class="flex items-center justify-end">
        <input type="text" variant="underlined" placeholder="search" v-model="search" v-on:input="$emit('search', search)" class="h-[45px] border-b border-primary px-4 bg-white-hover focus-within:outline-none w-full min-w-[250px]" />
        <i class="ri-search-line absolute me-4 text-base text-primary"></i>
    </div>
    <div v-if="type == 'search'&& variant == 'tonal'" class="flex items-center justify-end">
        <input type="text" variant="tonal" placeholder="search" v-model="search" v-on:input="$emit('search', search)" class="h-[45px] px-4 rounded-full focus-within:outline-none w-full min-w-[150px]" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
        <i class="ri-search-line absolute me-4 text-base text-primary"></i>
    </div>
    <input v-if="type == 'text'" type="text" v-model="text" @update:model-value="inputData" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
    <input v-if="type == 'password'" type="password" v-model="text" @update:model-value="inputData" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
    <template v-if="type == 'number'">
        <input v-if="value != undefined && store().menu.option.key != 'lihat'" type="text" v-model="dataNumbs.numb" @update:model-value="inputData" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
        <input v-if="value == undefined && store().menu.option.key != 'lihat'" type="text" v-model="numbs" @update:model-value="inputData" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
        <input v-if="store().menu.option.key == 'lihat'" type="text" v-model="dataitem.numbs" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
        <!-- <input v-else type="text" v-model="numbs" @update:model-value="inputData" :disabled="disabled" class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/> -->
    </template>
    <div v-if="type == 'checkbox'" class="flex space-x-2">
        <input type="checkbox" v-model="dataitem.check" :disabled="disabled" @change="checked" class="w-4 h-4 accent-primary-tint"/>
        <label>{{ label }}</label>
    </div>
    <div v-if="type == 'option'" class="w-[60%] min-w-[200px]">
        <input @click="selectOpt = !selectOpt" type="text" v-model="text" readonly class="h-[40px] w-full rounded px-3 cursor-pointer" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
            <div v-if="!disabled" class="rounded-lg shadow-xl absolute flex flex-col duration-300 overflow-auto z-[2]" :class="!selectOpt ? 'h-0 p-0 w-0' : store().theme == 'dark' ? 'dark h-max max-h-[200px] py-3 w-[200px]' : 'bg-white h-max max-h-[200px] py-3 w-[200px]' ">
                <div class="h-max py-1">
                    <span v-for="opt in option" @click="dt_options(opt)" class="px-3 flex items-center hover:bg-primary-hover cursor-pointer duration-300 overflow-hidden" :class="selectOpt ? 'h-9 ' : 'h-0' ">{{ opt }}</span>
                </div>
            </div>
        <div v-if="selectOpt" @click="selectOpt = false" class="fixed w-full h-full top-0 left-0 z-[1]"></div>
    </div>
    <input v-if="type == 'auto'" type="text" :value="autoData" @update:model-value="autoData" readonly class="h-[40px] w-[60%] min-w-[200px] rounded px-3" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
    <template v-if="type == 'dialog'">
        <input @click="open_id()" type="text" :value="data_dialog" @update:model-value="dialogInput" readonly class="h-[40px] w-[60%] min-w-[200px] rounded px-3 cursor-pointer" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-disabled-color'"/>
        <input-dialog v-if="open" :open="open" :fl_item="fl_item" @close="close" @input_i="dialogInput"></input-dialog>
    </template>
</template>
<script setup lang="ts">
import { id } from 'date-fns/locale';
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import { ref } from 'vue';
</script>
<script lang="ts">
const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})
export default {
    props: {
        type: {type: String},
        label: {type: String},
        value: {type: String},
        option: {type: Array},
        variant: {type: String},
        disabled: {type: Boolean},
        rules: {type: Array},
        fl_item: {type: Array},
        default: {type: Array},
    },
    data() {
        return {
            open: false,
            selectOpt: false,
            date: this.value,
            search: '',
            text: this.value,
            data_dialog: this.value,
            numbs: '',
            fNumber: 0,
            auto: '',
            
        }
    },
    computed: {
        dataitem() {
            return {
                text: this.value,
                numbs: this.value ? utils.numb(this.value) : 0,
                check: this.value,
            }
        },
        dataNumbs() {
            return {
                numb: this.value?.toString()
            }
        },
        autoData() {
            if(store().detailDump) {
                if(store().detailDump[this.default.key][[this.default.key]].slice(0, 4) == 'BC23') this.auto = 'BC25'
                if(store().detailDump[this.default.key][[this.default.key]].slice(0, 4) == 'BC40') this.auto = 'BC41'
                if(store().detailDump[this.default.key][[this.default.key]].slice(0, 4) == 'PPKEK LDP') this.auto = 'BC25'
                if(store().detailDump[this.default.key][[this.default.key]].slice(0, 4) == 'PPKEK TLDDP') this.auto = 'BC41'
                    let val = {
                        title: this.label,
                        value: this.auto
                    }
                this.$emit("input", val)
                return this.auto
            } else if (this.value) {
                let val = {
                        title: this.label,
                        value: this.value
                    }
                this.$emit("input", val)
                return this.value
            }
        },
        rangedate() {
            if(this.type == 'date') {
                if(this.rules) {
                    let d = ''
                    let e = ''
                    for (let i = 0; i < this.rules.length; i++) {
                        if(this.rules[i].split(' ')[0] == 'date:min') {
                            if(this.rules[i].split(' ')[1] != 'tgl_awal' && this.rules[i].split(' ')[1] != 'tgl_akhir') d = this.rules[i].split(' ')[1]
                            else {
                                if(this.rules[i].split(' ')[1] == this.label) d = this.date
                                else if (this.rules[i].split(' ')[1] == 'tgl_awal') d = store().periode[0]
                                else if (this.rules[i].split(' ')[1] == 'tgl_akhir') d = store().periode[1]
                            }
                        }
                        if(this.rules[i].split(' ')[0] == 'date:max') {
                            if(this.rules[i].split(' ')[1] != 'tgl_awal' && this.rules[i].split(' ')[1] != 'tgl_akhir') e = this.rules[i].split(' ')[1]
                            else {
                                if(this.rules[i].split(' ')[1] == this.label) e = this.date
                                else if (this.rules[i].split(' ')[1] == 'tgl_awal') e = store().periode[0]
                                else if (this.rules[i].split(' ')[1] == 'tgl_akhir') e = store().periode[1]
                            }
                        }
                    }
                    return {
                        min: d,
                        max: e
                    }
                } else return 'false'
            }
        }
    },
    watch: {
        numbs(v) {
            if(store().menu.option.key != 'lihat') this.numbs = this.formatNmbr(v)
            
        },
        dataNumbs(v) {
            if(store().menu.option.key != 'lihat') this.dataNumbs.numb = this.formatNmbr(v.numb)
            
        }
    },
    methods: {
        checked() {
            let val = {
                title: this.label,
                value: this.dataitem.check
            }
            this.$emit("input", val);
        },
        selectDate() {
            let val = {
                title: this.label,
                value: this.date
            }
            this.$emit("input", val);
        },
        async dialogInput(value) {
            this.data_dialog = await value[this.option.point]
            let val = {
                title: this.label,
                value: value
            }
            this.$emit("input", val)
            store().$patch((state) => {
                state.temp = value
                // state.i_dialog.show = false
                state.i_dialog.item = ''
            })
            this.open = false
        },
        dt_options(val) {
            this.text = val
            let dt = {
                title: this.label,
                value: this.text
            }
            this.$emit("input", dt);
            this.selectOpt = false
        },
        formatNmbr(v: { replace: (arg0: RegExp, arg1: string) => { (): any; new(): any; toString: { (): any; new(): any; }; }; }) {
            let number_string = v.replace(/[^.\d]/g, '').toString(),
            split    = number_string.split('.'),
            sisa     = split[0].length % 3,
            res   = split[0].substr(0, sisa),
            ribuan   = split[0].substr(sisa).match(/\d{3}/gi)

            if (ribuan) {
                let separator = sisa ? ',' : ''
                res += separator + ribuan.join(',')
            }
                res = split[1] != undefined ? res + '.' + split[1] : res
                return res
        },
        inputData() {
            let val = {}
            if(this.dataNumbs.numb) {
                val = {
                    title: this.label,
                    value: Number(this.dataNumbs.numb.split(',').join(''))
                }
            } else {
                val = {
                    title: this.label,
                    value: this.type == 'number' ? Number(this.numbs.split(',').join('')) : this.text
                }
            }
            this.$emit("input", val)
            console.log(val);
        },
        open_id() {
            let a = store().validate(this.rules, null, store().detailDump)
            if(store().menu.option.key != 'lihat' && a == true) this.open = true
            if(!this.disabled) store().$patch((state) => { 
                // state.i_dialog.show = !state.i_dialog.show
                state.i_dialog.item = this.option
            })
        },
        close(v) {
            this.open = v
        }
    },
}
</script>
<style lang="css">
    .dp-custom-input {
        border-color: transparent;
        min-height: 43px !important;
        /* width: 20vw; */
        font-size: 10pt;
        background: var(--disabled-color);
    }
    .dp-custom-input-dark {
        border-color: transparent;
        min-height: 43px !important;
        /* width: 20vw; */
        font-size: 10pt;
        background: var(--color-dark-base);
    }
    .dp-custom-input:hover {
        border-color: transparent;
        outline-color: transparent;
    }
    .dp-custom-input:focus-within {
        outline-color: var(--color-primary);
        border-color: var(--color-primary);
    }
    .dp-custom-pill {
        border-color: transparent;
        min-height: 43px !important;
        /* width: 20vw; */
        font-size: 10pt;
        background: white;
        border-radius: 50px;
    }
    .dp-custom-pill-dark {
        border-color: transparent;
        min-height: 43px !important;
        /* width: 20vw; */
        font-size: 10pt;
        background: var(--color-dark);
        color: white;
        border-radius: 50px;
    }
    .dp-custom-pill:hover {
        border-color: transparent;
        outline-color: transparent;
    }
    .dp-custom-pill:focus-within {
        outline-color: var(--color-primary);
        border-color: var(--color-primary);
    }
    .dp-custom-cell {
    border-radius: 50%;
}
.dp__calendar_header_item {
    font-size: 13px;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 10px;
}
.dp__action_button {
    width: 45px;
    height: 35px;
    font-size: 14px;
}
.dp__action_select {
    background: var(--color-primary);
}
.dp-custom-menu {
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.385);
    height: 400px;
    width: 300px;
    border-color: rgba(255, 255, 255, 0.223);
    left: 0 !important;
    margin-top: 200px;
    z-index: 100;
}
.dp__theme_dark {
   --dp-background-color: #212121;
   --dp-text-color: #ffffff;
   --dp-hover-color: #484848;
   --dp-hover-text-color: #ffffff;
   --dp-hover-icon-color: #959595;
   --dp-primary-color: var(--color-primary);
   --dp-primary-text-color: #ffffff;
   --dp-secondary-color: #363636;
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
   --dp-primary-color: var(--color-primary);
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
    height: 35px !important;
}
.dp__outer_menu_wrap {
    position: absolute !important;
}
.false .dp__input_wrap .dp__input {
    border-color: rgb(192, 1, 1) !important;
}
.dp__selection_preview {
    display: none;
    color: var(--dp-text-color);
    font-size: var(--dp-preview-font-size);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>