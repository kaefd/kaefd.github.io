<template>
    <div class="h-screen w-full ps-0 md:ps-18 pt-16 pb-3 text-sm" :class="store().menu.option.key == undefined ? 'overflow-auto md:overflow-hidden' : 'overflow-hidden'">
        <div class="pt-5 mx-3 md:mx-5 h-[90%] md:h-full overflow-visible md:overflow-hidden rounded-xl animate__animated animate__fadeIn animate__slow" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
            <div class="flex flex-wrap justify-between items-end space-y-2 px-3 ms:px-4">
                <div class="flex flex-col space-y-3 w-max">
                    <!-- <span class="text-xl font-semibold">{{ $router.currentRoute.value.name }}</span> -->
                    <pills-button v-if="config.permission.find(item => item.key == 'tambah') && otoritas.check('tambah')" @click="option({title: 'tambah '+ $router.currentRoute.value.name, key: 'tambah'})" class="bg-primary z-[1] w-max" label="Tambah Data"></pills-button>
                </div>
                <div class="flex items-center justify-center md:justify-end space-x-2 w-max">
                    <base-input type="search" variant="tonal" @search="input"></base-input>
                    <div class="flex gap-x-0 md:gap-x-2 items-center">
                        <button @click="active('col')" class="h-[40px] w-[40px] rounded-full hover:bg-primary-hover">
                            <i class="ri-layout-5-line text-primary text-base"></i>
                        </button>
                        <!-- <button class="h-[40px] w-[40px] rounded-full hover:bg-primary-hover">
                            <i class="ri-download-line text-primary text-base"></i>
                        </button> -->
                        <ExportOption v-if="otoritas.check('pdf') || otoritas.check('xlsx')"/>
                        <button v-if="config.filter != false" @click="active('filter')" class="h-[40px] w-[40px] rounded-full hover:bg-primary-hover"><i class="ri-filter-line text-primary text-base"></i></button>
                    </div>
                </div>
            </div>
            <base-filter :fields="drawer" :column="column" :items="store().items"></base-filter>
            <!-- content -->
            <div class="w-full h-[94%] duration-500"
                :class="store().filter || store().column ? '-translate-y-10 md:translate-y-0' : '-translate-y-[500px] md:-translate-y-[250px]'">
                <!-- <div class="w-full h-full bg-red-500 mb-48 md:mb-0"> -->
                <slot name="base-content">
                    <base-table :fields="config.fields" :items="datatable" :master="true" :permission="config" :s_table="config.permission != '' ? false : true"></base-table>
                </slot>
                <!-- </div> -->
            </div>
        </div>
        <SuratJalan />
        <CetakDo />
        <slot name="detail-page">
            <base-detail :field="config.field_detail" :child="config.child" :param="config.param">
                <template #full-content>
                    <slot name="dt-full-content"></slot>
                </template>
                <template #detail>
                    <slot name="base-detail"></slot>
                </template>
                <template #d-left="data_left">
                    <slot name="left" :data_left="data_left.data_left"></slot>
                </template>
                <template #header-content>
                    <!-- <div class="h-full -ms-3 -me-3"> -->
                        <slot name="header-content"></slot>
                    <!-- </div> -->
                </template>
            </base-detail>
        </slot>
    </div>
</template>

<script setup>
import ExportOption from '@/components/menu/ExportOption.vue';
import { store } from '@/utils/store'
import otoritas from '@/router/otoritas'
import SuratJalan from '@/views/pengiriman/SuratJalan.vue';
import CetakDo from '@/views/pengiriman/CetakDo.vue';
</script>
<script>
export default {
    props: {
        config: {
            type: Object
        }
    },
    data() {
        return {
            drawer: '',
            column: false,
            detail: false,
            search: 'false'
        }
    },
    computed: {
        datatable() {
            return this.search != 'false' || this.search == '' ? this.search : store().items
        }
    },
    methods: {
        active(param) {
            if (param == 'filter') {
                store().$patch((state) => {
                    state.filter = !state.filter
                    state.column = false
                })
                this.drawer = store().state.filter
                this.column = false
            } else if (param == 'col') {
                store().$patch((state) => {
                    state.column = !state.column
                    state.filter = false
                })
                this.drawer = this.config.fields
                this.column = true
            }
        },
        option(value) {
            store().$patch((state) => { state.menu.option = value })
            if (value.key == 'lihat') {
                store().$patch((state) => { state.detail_dialog = true })
            } else if (value.key == 'tambah') {
                store().$patch((state) => {
                    state.detail_dialog = true
                    state.master = '',
                    state.detail= ''
                })
            }else if (value.key == 'edit') {
                store().$patch((state) => {
                    state.detail_dialog = true
                })
            } else if (value.key == 'hapus') {
                store().delete()
            }
        },
        close() {
            store().$patch((state) => {
                state.menu.show = false
            })
        },
        async input(value){
            if(value) this.search = store().search(value, store().items, this.config.fields)
            else this.search = 'false'
        }
    }
}
</script>
