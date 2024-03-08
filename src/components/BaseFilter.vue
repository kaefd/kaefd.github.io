<template>
    <div  class="w-full h-full flex flex-col justify-between px-3 md:px-5 gap-y-10 border-primary-hover text-sm" :class="store().dark ? 'dark' : 'bg-white'">
        <div class="h-full w-full">
            <div class="mb-3">
                <span class="font-semibold">{{ column ? 'Tamplikan Kolom' : (filter ? 'Filter Data' : '') }}</span>
            </div>
            <div class="h-full w-full flex flex-wrap items-start overflow-visible gap-x-10 gap-y-3">
                <!-- FILTER -->
                <div v-if="filter" v-for="field in header" class="flex flex-col gap-y-1">
                    <span class="font-semibold">{{ field.title }}</span>
                    <div v-if="field.type == 'checkbox'" class="h-max max-h-[200px] w-[200px] flex flex-col flex-wrap gap-x-2 gap-y-1 overflow-auto">
                        <base-input v-for="item in field.item" :value="item.value" :type="field.type" @input="input_filter" :label="item.title" :keys="field.key"></base-input>
                    </div>
                    <div v-else class="w-[200px]">
                        <base-input  v-if="change" :type="field.type" :option="field.item" :rules="field.rules" :value="default_item(field.item, field.key) || data_filter[field.key] || field.default" :label="field.title" :keys="field.key" @input="input_filter"></base-input>
                        <base-input v-else :type="field.type" :option="field.item" :rules="field.rules" :value="field.default" :label="field.title" :keys="field.key" @input="input_filter"></base-input>
                    </div>
                </div>
                <!-- SELECT COLUMN -->
                <div v-if="column" class="w-full md:w-max h-[100] md:h-[130px] flex flex-row md:flex-col flex-wrap gap-x-0 md:gap-x-10">
                    <div v-for="field in header" class="flex flex-wrap w-32 md:w-40 h-10 md:h-8">
                        <base-input type="toggle" :value="base ? field.show : field[store().state.action].show"  :label="field.title" :keys="field.key" @input="check"></base-input>
                    </div>
                </div>
            </div>
        </div>
        <!-- BUTTON ACTION -->
        <div v-if="column || filter" class="flex space-x-2 justify-start">
            <base-button @click="reset()" class="bg-primary-hover" label="Reset"></base-button>
            <base-button @click="submit()" class="bg-primary" label="terapkan"></base-button>
        </div>
    </div>
    </template>
    <script setup>
    import { store } from '@/utils/store'
    </script>
    <script>
    export default {
        props: { 
            fields: { type: Object },
            title: { type: String },
            column: { type: Boolean },
            filter: { type: Boolean },
            show: { type: Boolean },
            base: { type: Boolean },
            items: { type: Object }
        },
        data () {
            return {
                col: {},
                fl: '',
                data_filter: {},
                checkbox: {},
                change: false,
            }
        },
        computed: {
            header() {
                if(this.filter) return this.fields
                else return this.change == true ? (this.fl || this.field_column) : this.field_column
            },
            field_column(){
                return this.fields ? this.fields.filter(item => item.column == true) : ''
            },
        },
        methods: {
            check(val) {
                let a = []
                a.push(val)
                for (let i = 0; i < a.length; i++) {
                    this.col[a[i].title] = a[i].value
                }
                this.change = true
                let st = store().state.action
                if(this.base) {
                    this.fl = this.field_column.map(item => ({
                        ...item,
                        show: this.col[item.key] != undefined ? this.col[item.key] : item.show
                    }))
                } else {
                    this.fl = this.field_column.map(item => ({
                        ...item,
                        [st]: { show: this.col[item.key] != undefined ? this.col[item.key] : item[st].show, disabled: item[st].disabled }
                    }))
                }
            },
            input_filter(v, key, type) {
                this.change = true
                let a = []
                a.push(v)
                if(type != 'checkbox') {
                    for (let i = 0; i < a.length; i++) {
                        this.data_filter[a[i].title] = a[i].value
                        if(this.data_filter.tgl_awal) store().periode[0] = this.data_filter.tgl_awal
                        if(this.data_filter.tgl_akhir) store().periode[1] = this.data_filter.tgl_akhir
                    }
                } else {
                    for (let i = 0; i < a.length; i++) {
                        this.checkbox[a[i].title] = a[i].value
                    }
                    let filter = this.fields.find(it => it.type == type).item
                    filter.map(item => item.value = this.checkbox[item.title] != undefined ? this.checkbox[item.title] : false || item.value)
                    let res = []
                    for (let i = 0; i < filter.length; i++) {
                        if(filter[i].value == true) res.push(filter[i].title)
                    }
                    if(res != '') this.data_filter[key] = res
                }
            },
            close() {
                this.$emit('close', 'detail_filter')
            },
            default_item (v, key) {
                if(JSON.stringify(this.data_filter) != '{}') {
                    return v?.find(item => item.key == this.data_filter[key])
                }
            },
            async submit() {
                if(this.col && this.column) {
                    this.$emit('resFilter', 'col', this.header)
                }
                if(this.filter) {
                    let k = this.$router.currentRoute.value.matched[0].children.find(item => item.title == this.title)?.key.toLowerCase() || false
                    let module = ''
                    if(k) {
                        let path = this.$router.currentRoute.value.path
                        module = await import(`../views${path}/${k}.js`)
                    } else {
                        k = 'stokbarang'
                        module = await import(/* @vite-ignore */`../views/laporan/stok-barang/stokbarang.js`)
                    }
                    // if(!this.change) {
                        let data = await module.default[k]()
                        store().data.items = data
                    // }
                    if(this.fields.find(it => it.type == 'date' && it.key != 'tanggal')) {
                        let param = {
                            tgl_awal: store().periode[0],
                            tgl_akhir: store().periode[1]
                        }
                        if(k) {
                            let data = await module.default[k](param)
                            store().data.items = data
                        } else {
                            this.$emit('reqToReload')
                        }
                    }
                    if(JSON.stringify(this.data_filter) != '{}') {
                        const nw_ft = {}
                        for (const ft in this.data_filter) {
                            if(this.data_filter[ft] != false && ft != 'tgl_awal' && ft != 'tgl_akhir') nw_ft[ft] = this.data_filter[ft]
                        }
                        // dahla timpa aja awoakoka
                        if(k == 'stokbarang') {
                            if(nw_ft.tanggal && nw_ft.kode_group != 'semua') {
                                let param = {
                                    tanggal: nw_ft.tanggal,
                                    kode_group: nw_ft.kode_group
                                }
                                let data = await module.default[k](param)
                                store().data.items = data
                            } else if (nw_ft.kode_group != 'semua') {
                                let param = {
                                    kode_group: nw_ft.kode_group
                                }
                                let data = await module.default[k](param)
                                store().data.items = data
                            } else if (nw_ft.tanggal) {
                                let param = {
                                    tanggal: nw_ft.tanggal
                                }
                                let data = await module.default[k](param)
                                store().data.items = data
                            } else {
                                let data = await module.default[k]()
                                store().data.items = data
                            }
                        }
                        if(JSON.stringify(nw_ft) != '{}') {
                            // mecari item yang memiliki value 'semua'
                            const filteredObject = Object.fromEntries(
                                Object.entries(nw_ft).filter(([key, value]) => {
                                    return value.includes('semua');
                                })
                            )
                            // hapus item
                            const deleteObj = Object.keys(filteredObject)
                            deleteObj.forEach(key => {
                                if (nw_ft.hasOwnProperty(key)) {
                                    delete nw_ft[key];
                                }
                            });
                            // filter data by kriteria
                            const filteredData = store().data.items.filter(item => {
                                return Object.keys(nw_ft).every(key => {
                                    if (!nw_ft[key].length) {
                                        return true;
                                    }
                                    return nw_ft[key].includes(item[key]);
                                });
                            });
                            store().data.items = filteredData
                        }
                    }

                }
                this.close()
            },
            reset() {
                if(this.column) {
                    this.change = false
                    this.fl = this.field_column
                    this.col = {}
                }
                if(this.filter) {
                    store().resetPeriode()
                    this.data_filter = {},
                    this.checkbox = {},
                    this.change = false
                    this.fields.map(item => {
                        if(item.type == 'checkbox') {
                            item.item.map(i => i.value = true)
                        } 
                    })
                }
            }
        }
    }
    </script>