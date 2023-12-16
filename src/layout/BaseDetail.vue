<template>
    <div v-if="store().detail_dialog" class="absolute top-0 right-0 w-full h-full overflow-auto z-[2] ps-0 md:ps-18" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class=" flex flex-col gap-y-3 h-full pb-12 md:pb-0 overflow-auto md:overflow-auto">
            <slot name="full-content">
                <div class="overflow-visible h-max md:h-full mx-5 mt-5 p-5 rounded-lg flex flex-col gap-y-5 animate__animated animate__fadeIn animate__faster"  :class="store().dialog ? 'z-[0]' : (store().theme == 'dark' ? 'dark z-[2]' : 'bg-white z-[2]')">
                    <div class=" flex items-center space-x-3 text-xl">
                        <button @click="close()">
                            <i class="ri-arrow-left-line"></i>
                        </button>
                        <span class="font-semibold capitalize">{{ store().menu.option.title }}</span>
                    </div>
                    <!-- HEAD -->
                    <slot name="header-content">
                        <div class="h-max my-5 flex flex-col md:flex-row flex-wrap gap-y-2 gap-x-32 pt-1 w-full 2xl:w-4/5">
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
                <div v-if="child && store().menu.option.key == 'tambah'" class="mx-1">
                    <base-button @click="addDetail()" class="bg-primary ms-4" label="Tambah Barang"></base-button>
                </div>
                <div v-if="child" class="rounded-lg mx-5 min-h-[200px] 2xl:min-h-[300px] h-full mb-5 md:mb-0 animate__animated animate__fadeIn animate__slow" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                    <div class="w-full h-fit md:h-[87%] rounded-lg" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                        <slot name="detail"></slot>
                        <div class="flex justify-start border-t mx-5 py-1 gap-x-5">
                            <span v-for="p in param" class="">{{ 'Total ' + p.title + ': ' }} {{ sumTotalN(p) }}</span>
                        </div>
                    </div>
                </div>
            </slot>
            <div v-if="store().menu.option.key == 'tambah' || store().menu.option.key == 'edit'" class="mx-5 mt-7 md:mt-0 flex justify-end space-x-2 mb-3 z-[1]">
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
                    arr.push(data[i][prm.key])
                }
                let res =  arr.reduce((total, current) => {
                    return total + current;
                }, 0) || 0
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
            let a = head != '' ? store().validate(head, this.dataitem, head) : true
            
            if(a && a != undefined && (store().detail  || store().master)) {
                if(opt == 'tambah') store().create(this.dataitem)
                else if(opt == 'edit') store().update(this.dataitem)
            } else if (store().detail == '') alert.warning(null, 'detail masih kosong')
        }
    }
}
</script>