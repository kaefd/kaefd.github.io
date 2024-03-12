<template>
    <div class="min-h-max h-full rounded-lg w-full flex flex-col gap-y-[0.5%]" :class="store().dark ? 'dark' : 'bg-white'">
        <!-- TOOLSItem -->
        <div class="w-full flex justify-between items-center z-[1]">
            <!-- SEARCH -->
            <div class="w-full md:w-1/4 h-full flex items-center">
                <base-input v-if="permission.search && search" type="search" @search="search_input"></base-input>
            </div>
            <div class="w-max h-full flex items-center gap-x-2">
                <!-- SELECT COLUMN -->
                <div v-if="permission.select_column && select_column" class="group flex items-center justify-center relative">
                    <button @click="active('col')" class="h-[40px] w-[40px] flex justify-center items-center rounded-full hover:bg-primary-hover" :class="column ? 'bg-primary-hover' : ''">
                        <i class="ri-layout-5-line text-primary text-base"></i>
                    </button>
                    <span class="w-max group-hover:opacity-100 absolute transition-opacity bg-gray-500 p-2 text-xs text-gray-100 rounded-md left-1/2 
                    -translate-x-1/2 translate-y-full opacity-0 mt-3 capitalize">pilih kolom</span>
                </div>
                <!-- EXPORT -->
                <div v-if="permission.export" class="group flex relative">
                    <ExportOption v-if="export"
                        :fields="fields" :items="items" />
                    <span v-if="export" class="w-max group-hover:opacity-100 transition-opacity bg-gray-500 p-2 text-xs text-gray-100 rounded-md absolute left-1/2 
                    -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto capitalize">export data</span>
                </div>
                <!-- FILTER -->
                <div v-if="permission.filter && show_filter" class="group flex relative right-0">
                    <button
                        @click="active('filter')"
                        class="h-[40px] w-[40px] rounded-full hover:bg-primary-hover flex justify-center items-center" :class="ft_active ? 'bg-primary-hover' : ''"><i
                        class="ri-filter-line text-primary text-base"></i>
                    </button>
                    <span class="w-max group-hover:opacity-100 transition-opacity bg-gray-500 p-2 text-xs text-gray-100 rounded-md absolute left-1/2 
                -translate-x-1/2 translate-y-full opacity-0 mt-3 mx-auto capitalize">filter data</span>
                </div>
            </div>
        </div>
        <!-- TOOLS DETAIL -->
        <div class="w-full duration-300" :class="detailFilter ? 'min-h-max h-max md:h-[60vh] lg:h-[100vh] py-2' : 'h-0'">
            <base-filter :title="title" :fields="toolsItem" :column="column" :base="base" :filter="ft_active" :items="items" :show="detailFilter" @close="close" @resFilter="resFilter" @reqToReload="$emit('reqToReload')"></base-filter>
        </div>
        <!-- TABLE -->
        <div class="w-full min-h-max h-full overflow-x-auto md:overflow-y-hidden z-[0]" :class="store().dark ? 'dark' : 'bg-white'">
            <table id="table" class="w-full h-full text-xs text-left" >
                <thead class="w-full py-2 flex bg-primary-hover rounded text-center text-sm">
                    <tr class="w-full flex items-center" :class="tableHeader.length > 1 ? 'justify-around' : 'justify-between'">
                        <th v-for="(field, f) in tableHeader" scope="col" class="w-[15%] min-w-[100px] px-5">
                            <div class="group flex relative items-center font-thin">
                                {{ field.title }}
                                <button @click="sorts(field, f)" class="group-hover:opacity-100 opacity-0" :class="sortActive[f] ? 'opacity-100' : ''">
                                    <i v-if="field.sort == 'asc'" class="ri-arrow-down-line"></i>
                                    <i v-if="field.sort == 'desc'" class="ri-arrow-up-line"></i>
                                </button>
                                <!-- <svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/></svg> -->
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="w-full h-[90%] flex flex-col pb-12 items-center overflow-auto">
                    <div v-if="items == ''" class="py-5 text-sm">Belum ada data</div>
                    <slot name="body-row" :items="data_item" :header="tableHeader">
                        <tr v-for="item, i in data_item" @contextmenu.prevent="setItem(item, i)" @dblclick="openDetail(item)" class="w-full flex items-center break-words" :class="(store().dark ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (tableHeader.length > 1 ? 'justify-around' : 'justify-between'), s_table ? 'cursor-default' : 'cursor-pointer', rowActive[i] == true ? (store().dark ? 'bg-dark-hover' : 'bg-gray-100') : ''">
                            <td v-for="field, f in tableHeader" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                                {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : (field.type == 'auto' && (item[field.key] * 1 == item[field.key]) ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : item[field.key])) }}
                            </td>
                        </tr>
                    </slot>
                </tbody>
            </table>
        </div>
        <div v-if="tbl_footer" class="w-full flex flex-col md:flex-row gap-y-1 gap-x-1 justify-end">
            <div v-for="p in footer" class="flex gap-x-1">
                <div class="flex flex-col w-28 justify-center p-2" :class="store().dark ? 'bg-dark-base' : 'bg-base'">{{ p.title }}</div>
                <div class="flex flex-col break-words w-full md:w-44 justify-center p-2" :class="store().dark ? 'bg-dark-base' : 'bg-base'">{{ sumTotalN(p) }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { store } from '@/utils/store'
    import utils from '@/utils/utils'
    import ExportOption from '@/components/menu/ExportOption.vue';
</script>
<script>
    export default {
        props: {
            permission: { type: Object, required: true },
            tbl_footer: { type: Object, required: true },
            title: { type: String, required: true },
            fields: { type: Object, required: true },
            filter: { type: Object, required: false },
            items: { type: Object, required: true },
            show_filter: { type: Boolean, required: true },
            select_column: { type: Boolean, required: true },
            base: { type: Boolean, required: true },
            export: { type: Boolean, required: true },
            search: { type: Boolean, required: true },
            s_table: {type: Boolean}
        },
        data() {
            return {
                sortActive: [],
                detailFilter: false,
                column: false,
                toolsItem: '',
                search_: undefined,
                rowActive: [],
                newFl: undefined,
                dt_filter: false,
                ft_active: false
            }
        },
        computed: {
           tableHeader() {
            if(this.base) return this.dt_filter ? this.newFl.filter(item => item.show == true) : this.fields.filter(item => item.show == true)
            else return this.dt_filter ? this.newFl.filter(item => item[store().state.action]?.show == true) : this.fields.filter(item => item[store().state.action]?.show == true)
           },
           footer() {
            if(this.base) return this.tbl_footer.filter(item => item.show == true)
            else return this.tbl_footer.filter(item => item[store().state.action]?.show == true)
           },
           data_item() {
             return this.search_ || this.items
           }
        },
        methods: {
            sorts(data, index) {
                for (let i = 0; i < this.tableHeader.length; i++) {
                    this.sortActive[i] = index == i ? true : false
                }
                if(data.sort == 'desc') { 
                    this.desc = true
                    this.tableHeader.map(it => it.sort = it.key == data.key ? 'asc' : it.sort)
                } else {
                    this.desc = false
                    this.tableHeader.map(it => it.sort = it.key == data.key ? 'desc' : it.sort)
                }
                if(data.type != 'number') {
                    if(this.desc) this.items.sort((a, b) => b[data.key].localeCompare(a[data.key]))
                    else this.items.sort((a, b) => a[data.key].localeCompare(b[data.key]))
                } else {
                    if(this.desc) this.items.sort((a, b) => b[data.key] - (a[data.key]))
                    else this.items.sort((a, b) => a[data.key] - (b[data.key]))
                }
            },
            active(p) {
                if(p == 'col') {
                    this.toolsItem = this.fields.filter(item => item.column == true)
                    this.detailFilter = this.detailFilter && this.column ? false : true
                    this.column = !this.column
                    this.ft_active = false
                } else {
                    this.toolsItem = this.filter.filter(item => item.show == true)
                    this.detailFilter = this.detailFilter && !this.column ? false : true
                    this.ft_active = !this.ft_active
                    this.column = false
                }
            },
            setItem(value, index) {
                store().single_detail = value
                for (let i = 0; i < this.items.length; i++) {
                    this.rowActive[i] = (i == index) ? true : false
                }
            },
            openDetail(value) {
                if(!this.s_table) this.$emit('openDetail', value)
            },
            search_input(input) {
                this.search_ = this.items.filter(item => Object.values(item).some(value => typeof value == 'string' && value.toLowerCase().includes(input.toLowerCase())))
            },
            close(p) {
                if(p == 'detail_filter')  {
                    this.ft_active = false
                    this.column = false
                    this.detailFilter = false
                }
            },
            resFilter(p, v) {
                this.dt_filter = true
                if(p == 'col') {
                    this.newFl = v
                }
            },
            sumTotalN(prm) {
                let arr = []
                let data = this.items
                if(data) {
                    for (let i = 0; i < data.length; i++) {
                        arr.push((data[i][prm.key] == undefined ? 0 : data[i][prm.key]))
                    }
                    let res =  arr.reduce((total, current) => {
                        return total + current;
                    }, 0) || 0
                    return utils.numb(res)
                }
            },
        },
    }
</script>