<template>
    <div class="fixed top-0 left-0 w-full flex justify-center z-[2] h-full">
        <div v-if="active" @click="close()" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <slot name="dialog-content">
            <div class="relative h-full w-[28%] min-w-[340px] max-w-[450px] px-2 flex justify-center items-center animate__animated animate__faster" :class="active ? 'animate__fadeInUp' : ''">
            <div class="w-full flex flex-col justify-between gap-y-5 bottom-0 rounded md:rounded min-h-[220px] py-7 px-3 md:px-7 z-[3]" :class="store().dark ? 'dark' : 'bg-white'" >
                <div class="flex flex-col gap-y-5">
                    <div class="flex flex-col gap-y-1 text-center">
                        <div class="flex flex-col-reverse space-y-1">
                            <span v-for="field in fields?.slice(0, 2)" class="first:text-sm last:text-lg">{{ items[field.key] }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <div v-for="fl in fields?.slice(2, fields.length)" class="flex justify-between items-center w-full">
                            <label class="w-1/4 lg:w-max">{{ fl.title }}</label>
                            <base-input :type="fl.type" :value="items[fl.key]" :default="fl.default" :label="fl.key" @input="input" :allItems="datainput" :disabled="fl[store().state.action].disabled"></base-input>
                        </div>
                    </div>
                </div>
                <div v-if="store().state.action != 'read'" class="flex space-x-3 me-0 ms-auto">
                    <base-button @click="close()" class="bg-primary-hover" label="Cancel"></base-button>
                    <base-button @click="submited()" class="bg-primary" label="Submit"></base-button>
                </div>
            </div>
            </div>
        </slot>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils'
import validation from '@/utils/validation';
</script>
<script>
export default {
    props: {
        fields: {type: Object},
        active: {type: Boolean},
        items: {type: Object},
        detail: {type: Object},
    },
    data() {
        return {
            datainput: '',
        }
    },
    methods: {
        input(value) {
            let a = []
                a.push(value)
                this.datainput = this.items
                for (let i = 0; i < a.length; i++) {
                    this.datainput[a[i].title] = a[i].value
                }
        },
        close() {
            store().$patch((state) => {
                state.dialog = false
                state.s_detail = ''
                this.$emit('close', 'dialog')
            })
        },
        submited() {
            let data = this.datainput || this.items
            let rules = this.fields.filter(item => item.rules != 'unique' )
            let a = rules && rules != '' ? validation.validate(rules, data, this.detail) : true
            if(a) {
                this.$emit('resDialog', data)
                this.close()
            }
        },
    },
    mounted() {
    }
}
</script>