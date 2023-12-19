<template>
    <div class="p-3 h-full rounded-lg w-full" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
        <div class="h-full rounded-lg overflow-x-auto md:overflow-y-hidden">
            <table id="table" class="w-full h-full text-xs text-left">
                <thead class="w-full flex bg-primary-hover text-center text-sm">
                    <tr class="w-full flex items-center justify-between">
                        <th v-for="field in fieldCol" scope="col" class="w-[15%] min-w-[100px] px-5 py-3">
                            <div class="flex items-center font-thin">
                                {{ field.title }}
                                <button @click="sorts(field)">
                                    <i v-if="field.sort == 'desc'" class="ri-arrow-down-line"></i>
                                    <i v-if="field.sort == 'asc'" class="ri-arrow-up-line"></i>
                                </button>
                                <!-- <svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/></svg> -->
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="w-full h-[74%] md:h-[87%] flex flex-col pb-3 items-center overflow-auto" :class="store().menu.option.key == 'tambah' || store().menu.option.key == 'lihat' ? 'h-max md:h-[80%]' : 'h-max md:h-[90%]'">
                    <tr v-if="master" v-for="item in items" @click="menu($event, item.head, item.detail)" class="w-full flex justify-between items-center cursor-pointer break-words" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'">
                        <td v-for="field, f in fieldCol" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap">
                            {{ field.type == 'number' ? (item.head[field.key] > 0 ? utils.numb(item.head[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item.head[field.key]) : item.head[field.key]) }}
                        </td>
                    </tr>
                    <tr v-if="!master" v-for="item in items" @click="menu($event, item, item)" class="w-full flex justify-between items-center cursor-pointer break-words" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'">
                        <td v-for="field, f in fieldCol" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap">
                            {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : item[field.key]) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <slot name="tb-detail">
        <base-dialog type="form" :dialog_field="dialog_field" :fields="fields"></base-dialog>
    </slot>
    <MenuOption v-if="store().menu.show" />
</template>
<script setup>
import utils from '@/utils/utils'
import {store} from '@/utils/store'
import pengiriman from '@/views/pengiriman/pengiriman'
import MenuOption from '@/components/menu/MenuOption.vue'
</script>
<script>
export default {
  props: { 
    fields: {type: Array},
    items: {type: Object},
    master: {type: Boolean},
    permission: {type: Object},
    dialog_field: {type: Object},
    s_table: {type: Boolean}
  },
  data() {
    return {
        dialog: false,
        desc: null
    }
  },
  computed: {
    fieldCol() {
        return this.fields.filter(it => it.show == true)
    },
    // elementStyle() {
    //     return {
    //         position: 'fixed',
    //         left: store().menu.screenX + 'px',
    //         top: store().menu.screenY + 'px',
    //     }
    // },
  },
  methods: {
    sorts(data) {
        let item = store().items
        if(data.sort == 'desc') { 
            this.desc = true
            store().state.fields.map(it => it.sort = it.key == data.key ? 'asc' : it.sort)
        } else {
            this.desc = false
            store().state.fields.map(it => it.sort = it.key == data.key ? 'desc' : it.sort)
        }
        if(data.type != 'number') {
            if(this.desc) item.sort((a, b) => b.head[data.key].localeCompare(a.head[data.key]))
            else item.sort((a, b) => a.head[data.key].localeCompare(b.head[data.key]))
        } else {
            if(this.desc) item.sort((a, b) => b.head[data.key] - (a.head[data.key]))
            else item.sort((a, b) => a.head[data.key] - (b.head[data.key]))
        }
    },
    menu (event, item, detail) {
        if(!this.s_table || this.permission.permission != '') {
            store().$patch((state) => {
                    state.menu.screenX = event.clientX - 90
                    state.menu.screenY = state.menu.option.key == 'lihat' ? event.clientY - 50 : event.clientY - 120
                    state.menu.show = !state.menu.show
                })
                if(this.master && this.$router.currentRoute.value.path != '/pengiriman') {
                    store().$patch((state) => {
                        state.master = item
                        state.detail = detail
                    })
                }
                else if(this.master && this.$router.currentRoute.value.path == '/pengiriman') {
                    store().$patch((state) => {
                        state.master = item
                    })
                    pengiriman.detail(detail)
                } else { 
                    store().$patch((state) => { 
                        state.s_detail = detail
                        state.menu.show = true
                    })
                }
        }
    },
    close() {
        store().$patch((state) => {
            state.menu.show = false
        })
    },
  }
}
</script>