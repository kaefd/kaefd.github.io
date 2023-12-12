<template>
    <div class="fixed top-0 left-0 w-full flex justify-center overflow-hidden" :class="open ? 'z-[2] h-full' : 'z-[-2] h-0'">
        <div v-if="open" @click="close('parent')" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <div v-if="child" @click="close('child')" class="fixed top-0 left-0 h-full w-full z-[1] bg-scrim"></div>
        <div class="fixed bottom-0 rounded-3xl h-[88vh] md:h-[95vh] w-[28%] min-w-[350px] max-w-[450px] mb-15 md:mb-0 p-7 duration-300" :class="!open ? '' : (store().theme == 'dark' ? 'dark animate__animated animate__fadeInUp animate__faster mb-4 duration-400' : 'bg-white animate__animated animate__fadeInUp animate__faster mb-4 duration-400')">
            <div class="relative h-full w-full flex flex-col space-y-3 items-center">
                <div class="relative flex flex-col gap-y-5 text-center w-full">
                    <span class="font-semibold text-xl text-center">{{ item.title }}</span>
                    <base-input type="search" variant="tonal" @search="searched"></base-input>
                </div>
                <div class="w-full h-full mx-auto overflow-auto" >
                    <div v-for="data in content" @click="pick(data)" class="flex justify-between items-center min-h-10 h-max px-3 rounded cursor-pointer" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-slate-50'">
                        <!-- leftSide -->
                        <div v-if="item.left">
                            <slot name="left" :data_left="data">
                                <span v-for="left in item.left">{{ data[left] }}</span>
                            </slot>
                        </div>
                        <!-- leftCustom -->
                        <div v-if="item.leftCustom" class="flex flex-col py-2">
                            <div v-for="left in item.leftCustom">
                                <span v-if="left.content.length == 1" class="font-bold">{{ data[left.content] }}</span>
                                <div v-else>
                                    <div class="flex space-x-1 w-full overflow-hidden">
                                        <span v-for="(sleft, s) in left.content" class="w-max">{{ data[sleft] + (s < left.content.length - 1 ? left.separate : '') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- rightside -->
                        <div v-if="item.right">
                            <span v-for="right in item.right">{{ data[right] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-0 rounded-3xl min-h-[200px] w-max min-w-[350px] max-w-[450px] p-7 z-[3]" :class="!child ? 'translate-y-[95vh] duration-300' : store().theme == 'dark' ? 'dark -translate-y-[30vh] duration-400' : '-translate-y-[30vh] duration-400 bg-white'">
            <!-- title -->
            <div class="flex flex-col-reverse text-center space-y-1">
                <span v-for="fl in store().state.dialog_field.slice(0, 2)" class="first:text-sm last:text-lg">{{ picked[fl.key] }}</span>
            </div>
            <div class="flex flex-col gap-y-5 mt-5">
                <div class="flex flex-col gap-y-2">
                    <div v-for="fl in store().state.dialog_field.slice(2)" class="flex justify-between items-center w-80">
                        <label>{{ fl.title }}</label>
                        <base-input v-if="open" :type="fl.type" :label="fl.key" :rules="fl.rules ? fl.rules : false" :disabled="disabled" @input="datainput"></base-input>
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
<script lang="ts" setup>
import { store } from '@/utils/store'
import api from '@/utils/api'
</script>
<script lang="ts">
export default {
    props: {
        open: {type: Boolean},
        fl_item: {type: Array}
    },
    data() {
        return {
            base: '',
            items: '',
            search: '',
            picked: '',
            saved: [],
            child: false,
            child_item: '',
            dataitem: {}
        }
    },
    computed: {
        disabled() {
            return store().menu.option.key == 'lihat' ? true : false
        },
        item() {
            return store().i_dialog.item
        },
        content() {
            return this.search || this.base
        }
    },
    // watch: {
    //     items() {
    //         this.get();
    //     },
    // },
    methods: {
        close(param) {
            if(param == 'child') this.child = false
            else {
                this.child = false
                store().$patch((state) => {
                    // state.i_dialog.show = false
                    state.i_dialog.item = ''
                })
                this.$emit('close', false)
            }
        },
        async get() {
            let ep = ''
            if(this.item.endpoint == null) {
                if(this.fl_item) this.base = this.fl_item.item
                else this.base = await store().state.permission[0].item.item
            } else {
                let param = store().temp
                if(this.item.param) ep = this.item.endpoint + param[this.item.param]
                else ep = this.item.endpoint
                if(this.open) this.base = await api.getData(ep)
            }
        },
        searched(value) {
            this.search = store().search(value, this.base)
        },
        pick(value) {
            this.picked = value
            if(!this.item.child) {
                this.$emit('input_i', value)
            }
            else {
                let a = store().validate(store().state.dialog_field, value, store().detail)
                if(a == true) {
                    this.child = true,
                    this.child_item = value
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
                // this.saved.push(this.dataitem)
                this.$emit('input_', this.dataitem)
                this.close('parent')
            }
        }
    },
    mounted() {
        if(this.open) this.get()
    },
    // updated() {
    //     this.items = this.item
    // },
    // unmounted() {
    //     this.get()
    // },
    // destroyed() {
    //     // this.get()
    //     this.dataitem = ''
    //     this.saved = []
    //     // this.items = ''
    //     // store().resetState()
    //     store().$patch((state) => {
    //         state.i_dialog.show = false
    //         state.i_dialog.item = ''
    //         }
    //     )
    // },
}
</script>