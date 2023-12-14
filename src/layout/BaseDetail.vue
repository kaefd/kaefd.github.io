<template>
    <div v-if="store().detail_dialog" class="absolute top-0 right-0 w-full h-full overflow-auto z-[2] ps-0 md:ps-18" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class=" flex flex-col gap-y-3 h-full pb-12 md:pb-0 overflow-auto md:overflow-hidden">
            <slot name="full-content">
                <div class="overflow-visible h-full mx-5 mt-5 p-5 rounded-lg flex flex-col gap-y-5 animate__animated animate__fadeIn animate__faster"  :class="store().dialog ? 'z-[0]' : (store().theme == 'dark' ? 'dark z-[2]' : 'bg-white z-[2]')">
                    <div class=" flex items-center space-x-3 text-xl">
                        <button @click="close()">
                            <i class="ri-arrow-left-line"></i>
                        </button>
                        <span class="font-semibold capitalize">{{ store().menu.option.title }}</span>
                    </div>
                    <!-- HEAD -->
                    <slot name="header-content">
                        <div class="h-max mt-5 flex flex-col md:flex-row flex-wrap gap-y-2 gap-x-32 pt-1">
                            <div v-for="fl in field">
                                <div class="flex justify-between items-center md:w-72">
                                    <label class="w-[24%] break-normal">{{ fl.title }}</label>
                                    <base-input :type="fl.type" :value="store().master[fl.key]" :option="fl.item" :fl_item="fl.item" :default="fl.default" :rules="fl.rules" :label="fl.key" @input="input" :disabled="fl.disabled || disabled"></base-input>
                                </div>
                            </div>
                        </div>
                    </slot>
                </div>
                <!-- DETAIL -->
                <div v-if="child" class="rounded-lg mx-5 h-full pb-5 overflow-visible md:overflow-hidden animate__animated animate__fadeIn animate__slow" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                    <base-button v-if="store().menu.option.key == 'tambah'" @click="addDetail()" class="bg-primary ms-4 mt-3" label="Tambah Barang"></base-button>
                    <slot name="detail"></slot>
                    <!-- <span v-for="p in param" class="block me-5 mt-2 border-t  text-right font-bold capitalize">{{ 'Total ' + p + ': ' }} {{ sumTotalN(p) }}</span> -->
                </div>
            </slot>
            <div v-if="store().menu.option.key == 'tambah' || store().menu.option.key == 'edit'" class="mx-5 flex justify-end space-x-2 mb-3 z-10">
                <base-button @click="close()" class="bg-primary-hover" label="Batal"></base-button>
                <base-button @click="submited()" class="bg-primary" label="Simpan"></base-button>
            </div>
        </div>
        <input-dialog v-if="input_d" :open="input_d" @close="close_d" @input_="dialogI">
            <template #left="data_left">
                <slot name="d-left" :data_left="data_left.data_left"></slot>
            </template>
        </input-dialog>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import alert from '@/utils/alert'
import utils from '@/utils/utils'
</script>
<script>
export default {
    props: {field: {type: Object},child: {type: Boolean}, param: {type: Object}},
    data(){
        return{
            dataitem: {},
            input_d: false,
            tmp: []
        }
    },
    computed: {
        disabled() {
            return store().menu.option.key == 'lihat'
        },
    },
    methods: {
        close() {
            store().$patch((state) => {
                state.detail_dialog = false
                state.menu.option = ''
            })
        },
        sumTotalN(prm) {
            let arr = []
            let data = store().detail
            if(data) {
                for (let i = 0; i < data.length; i++) {
                    arr.push(data[i][prm])
                }
                let res =  arr.reduce((total, current) => {
                    return total + current;
                }, 0)
                return utils.numb(res)
            }
        },
        addDetail() {
            this.input_d = true
            store().$patch((state) => { 
                // state.i_dialog.show = !state.i_dialog.show
                state.i_dialog.item = state.state.permission[0].item
            })
        },
        dialogI(value) {
            this.tmp.push(value)
            store().$patch((state) => { state.detail = this.tmp })
        },
        close_d(v) {
            this.input_d = v
        },
        input(value) {
            let a = []
            a.push(value)
            for (let i = 0; i < a.length; i++) {
                this.dataitem[a[i].title] = a[i].value
            }
            store().$patch((state) => { state.detailDump = this.dataitem})
            
        },
        submited() {
            let opt = store().menu.option.key
            let head = store().state.field_detail.filter(item => item.rules != undefined)
            // let detail = store().state.dialog_field.filter(item => item.rules != undefined).slice(1)
            // let fl = [...head, ...detail]
            // let input = [...[this.dataitem], ...store().detail]
            let a = store().validate(head, this.dataitem, head)
            console.log(a);
            
            if(a && a != undefined && (store().detail  || store().master)) {
                if(opt == 'tambah') store().create(this.dataitem)
                else if(opt == 'edit') store().update(this.dataitem)
            } else if (store().detail == '') alert.warning(null, 'detail masih kosong')
        }
    }
}
</script>