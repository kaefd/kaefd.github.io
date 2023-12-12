<template>
<div class="w-full h-[450px] md:h-[250px] overflow-visible flex flex-col justify-between mt-1 py-3 px-5 border-primary-hover">
    <div class="h-max w-full">
        <div class="mb-3">
            <span class="font-semibold">{{ column ? 'Tamplikan Kolom' : 'Filter Data' }}</span>
        </div>
        <div class="flex flex-wrap items-start h-full overflow-show w-full gap-x-2">
            <div v-if="!column" v-for="field in fields" class="flex flex-col space-y-1">
                <span class="font-semibold">{{ field.title }}</span>
                <div v-if="field.type == 'checkbox'" class="h-20 pe-4 flex flex-col flex-wrap gap-x-3 me-5 gap-y-1">
                    <base-input v-for="item in field.item" :value="item.show" :type="field.type" @input="input" :label="item.title"></base-input>
                </div>
                <base-input v-else :type="field.type" :option="field.item" :rules="field.rules" :value="field.key == 'tgl_awal' ? store().periode[0] : (field.key == 'tgl_akhir' ? store().periode[1] : '')" :label="field.key" @input="input"></base-input>
            </div>
            <div v-else v-for="field in fields" class="flex flex-col space-y-1 w-max">
                <div class="bg-primary-hover w-[135px] h-14 px-3 rounded flex items-center">
                    <base-input type="checkbox" :value="field.show" :label="field.title" @input="selectCol"></base-input>
                </div>
            </div>
        </div>
    </div>
    <div class="flex space-x-2 justify-start">
        <base-button @click="close()" class="bg-primary-hover" label="Batal"></base-button>
        <base-button @click="filtered()" class="bg-primary" label="Pilih"></base-button>
    </div>
</div>
</template>
<script setup lang="ts">
import { store } from '@/utils/store'
</script>
<script lang="ts">
export default {
    props: {fields: {type: Array}, title: {type: String}, column: {type: Boolean}, items: {type: Object}},
    data () {
        return {
            filter: [],
            col: [],
            filter_param: '',
            col_param: ''
        }
    },
    methods: {
        active() {
            store().$patch((state: { filter: boolean; }) => { state.filter = !state.filter })
        },
        input(val) {
            if(val.title == 'tgl_awal') store().$patch((state) => { state.periode[0] = val.value})
            if(val.title == 'tgl_akhir') store().$patch((state) => { state.periode[0] = val.value})
            
            this.filter.push(val)
            let a = store().filterdata(this.filter, this.fields)
            this.filter_param = a
        },
        selectCol(val) {
            this.col.push(val)
            let a = store().scol(this.col, this.fields)
            this.col_param = a
        },
        filtered() {
            if(!this.column) store().filtered(this.filter_param)
            else store().selectedCol(this.col_param, this.fields)
            this.close()
        },
        close() {
            store().$patch((state) => { state.filter = false})
        }
    }
}
</script>