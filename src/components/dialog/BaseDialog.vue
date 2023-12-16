<template>
    <div class="fixed top-0 left-0 w-full flex justify-center" :class="store().dialog ? 'z-[2] h-full' : 'z-[-2] h-0'">
        <div v-if="store().dialog" @click="store().openDialog()" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <div class="fixed bottom-0 rounded-3xl" :class="!store().dialog ? 'translate-y-0 duration-300 w-0 h-0' : (store().theme == 'dark' ? '-translate-y-[30vh] duration-400 min-h-[200px] w-max min-w-[350px] p-7 dark' : '-translate-y-[30vh] duration-400 min-h-[200px] w-max min-w-[350px] p-7 bg-white')">
            <div class="h-full flex flex-col space-y-6 items-center">
                <div class="flex flex-col gap-y-1 text-center w-full">
                    <div class="flex flex-col-reverse space-y-1">
                        <span v-for="field in dialog_field?.slice(0, 2)" class="first:text-sm last:text-lg">{{ store().s_detail[field.key] }}</span>
                    </div>
                </div>
                <div class="flex flex-col gap-y-2">
                    <div class="flex flex-col gap-y-2">
                        <div v-for="fl in dialog_field?.filter(item => item.show == true)" class="flex justify-between items-center w-80">
                            <label>{{ fl.title }}</label>
                            <base-input :type="fl.type" :value="store().s_detail[fl.key]" :default="fl.default" :label="fl.key" @input="input" :disabled="disabled"></base-input>
                        </div>
                    </div>
                </div>
                <div v-if="store().menu.option.key == 'tambah'" class="flex space-x-3 me-0 ms-auto">
                    <base-button @click="close()" class="bg-primary-hover" label="Cancel"></base-button>
                    <base-button @click="submited()" class="bg-primary" label="Submit"></base-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    props: {
        fields: {type: Object},
        dialog_field: {type: Object},
    },
    data() {
        return {
            datainput: {},
        }
    },
    computed: {
        disabled() {
            return store().menu.option.key == 'lihat' ? true : false
        }
    },
    methods: {
        input(value) {
            let a = []
            this.datainput = store().s_detail
            a.push(value)
            
            for (let i = 0; i < a.length; i++) {
                this.datainput[a[i].title] = a[i].value
            }
            store().$patch((state) => {
                state.s_detail = this.datainput
            })
        },
        close() {
            store().$patch((state) => {
                state.dialog = false
                state.s_detail = ''
            })
        },
        submited() {
            let detail = store().detail
            let key = Object.keys(this.datainput)
            detail.map((item) => {
                if(item.kode_barang == this.datainput.kode_barang) {
                    for (let i = 0; i < key.length; i++) {
                        item[key[i]] = this.datainput[key[i]]
                    }
                }
            })
            store().$patch((state) => { state.detail = detail })
            this.close()
        }
    },
}
</script>