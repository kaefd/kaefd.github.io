<template>
    <div class="fixed top-0 left-0 w-full flex justify-center overflow-hidden text-sm" :class="open ? 'z-[2] h-full' : 'z-[-2] h-0'">
        <div v-if="open" @click="close('parent')" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <div v-if="child" @click="close('child')" class="fixed top-0 left-0 h-full w-full z-[1] bg-scrim"></div>
        <div class="fixed bottom-0 rounded h-[85vh] md:h-[95vh] w-[28%] min-w-[340px] max-w-[450px] mb-12 md:mb-5 py-7 px-5 md:px-7 overflow-hidden duration-300" :class="!open ? '' : (store().dark ? 'dark animate__animated animate__fadeInUp animate__faster duration-400' : 'bg-white animate__animated animate__fadeInUp animate__faster duration-400')">
            <div class="relative h-full w-full flex flex-col space-y-3 items-center">
                <div class="relative flex flex-col gap-y-5 text-center w-full">
                    <div class="not-sr-only md:sr-only absolute text-xl right-0">
                        <button  @click="close('parent')">
                            <i class="ri-close-line"></i>
                        </button>
                    </div>
                    <span class="font-semibold text-xl text-center">{{ data_dialog.title }}</span>
                    <base-input type="search" variant="tonal" @search="searched"></base-input>
                </div>
                <div class="w-full h-full mx-auto overflow-auto" >
                    <div v-for="data in content" @click="pick(data)" class="flex justify-between items-center min-h-10 h-max px-3 rounded cursor-pointer" :class="store().dark ? 'hover:bg-dark-hover' : 'hover:bg-slate-50'">
                        <!-- leftSide -->
                        <div v-if="data_dialog.left">
                            <slot name="left" :data_left="data">
                                <span v-for="left in data_dialog.left">{{ data[left] }}</span>
                            </slot>
                        </div>
                        <!-- leftCustom -->
                        <div v-if="data_dialog.leftCustom" class="flex flex-col py-2">
                            <div v-for="left in data_dialog.leftCustom">
                                <span v-if="left.content.length == 1" class="font-bold">{{ data[left.content] }}</span>
                                <div v-else>
                                    <div class="flex space-x-1 w-full overflow-hidden">
                                        <span v-for="(sleft, s) in left.content" class="w-max">{{ data[sleft] + (s < left.content.length - 1 ? left.separate : '') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- rightside -->
                        <div v-if="data_dialog.right">
                            <span v-for="right in data_dialog.right">{{ data[right] }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative w-max h-full">
                <base-loader v-if="loading"></base-loader>
            </div>
        </div>
        <div v-if="child" class="relative h-full w-[28%] min-w-[340px] max-w-[450px] px-2 flex justify-center items-center">
            <div class="w-full flex flex-col justify-between gap-y-5 bottom-0 rounded md:rounded min-h-[220px] py-7 px-3 md:px-7 z-[3] animate__animated animate__faster" :class="store().dark ? 'dark' : 'bg-white', child ? 'animate__fadeInUp' : ''">
                <!-- title -->
                <div class="flex flex-col gap-y-5">
                    <div class="flex flex-col-reverse text-center space-y-1">
                        <span v-for="fl in fields.slice(0, 2)" class="first:text-sm last:text-lg">{{ picked[fl.key] }}</span>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div v-for="fl in fields.slice(2, fields.length)" class="flex justify-between items-center w-full">
                            <label class="w-1/4 lg:w-max">{{ fl.title }}</label>
                            <base-input v-if="open" :type="fl.type" :default="fl.default" :label="fl.key" :rules="fl.rules ? fl.rules : false" :disabled="disabled" :allItems="dataitem" @input="datainput"></base-input>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-2 me-0 ms-auto">
                    <base-button @click="close('child')" class="bg-primary-hover" label="Batal"></base-button>
                    <base-button @click="save()" class="bg-primary" label="Simpan"></base-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import api from '@/utils/api'
import validation from '@/utils/validation';
</script>
<script>
export default {
    props: {
        open: {type: Boolean},
        data_dialog: {type: Object, required: true},
        fields: {type: Object, required: true},
        detail: {type: Object, required: true},
        allItems: {type: Object, required: true},
    },
    data() {
        return {
            base: '',
            search: '',
            picked: '',
            child: false,
            loading: false,
            child_item: '',
            dataitem: {}
        }
    },
    computed: {
        content() {
            return this.search || this.base
        }
    },
    methods: {
        async get() {
            this.loading = true
            let ep = ''
            if(this.data_dialog.endpoint == null) {
                this.base = this.data_dialog.item
            } else {
                let param = this.allItems
                if(this.data_dialog.param) ep = this.data_dialog.endpoint + param[this.data_dialog.param]
                else ep = this.data_dialog.endpoint
                if(this.open) this.base = await api.getData(ep)
            }
            this.loading = false
        },
        searched(input) {
            this.search = this.base.filter(item => Object.values(item).some(value => typeof value == 'string' && value.toLowerCase().includes(input.toLowerCase())))
        },
        close(param) {
            if(param == 'child') this.child = false
            else {
                this.child = false
                this.child_item = ''
                this.dataitem = {}
                this.base = ''
                this.$emit('close', 'dialog_input')
            }
        },
        pick(value) {
            this.picked = value
            if(!this.data_dialog.child) {
                this.$emit('resDialInput', value)
                this.close('parent')
            }
            else {
                let rules = this.fields.filter(it => it.rules == 'unique')
                let a = rules != '' ? validation.validate(rules, value, this.detail) : true
                if(a) {
                    this.child = true
                    this.dataitem = value
                }
            }
        },
        datainput(value) {
            if(value != '') {
                let a = []
                a.push(value)
                for (let i = 0; i < a.length; i++) {
                    this.dataitem[a[i].title] = a[i].value
                }
            }
        },
        save() {
            if(this.child) {
                let rules = this.fields.filter(item => item.rules != undefined)
                let a = rules != '' ? validation.validate(this.fields, this.dataitem, this.detail) : true
                if(a) {
                    this.$emit('resDialInput', this.dataitem)
                    this.close('parent')
                }
            }
        }
    },
    mounted() {
        this.get()
    },
}
</script>