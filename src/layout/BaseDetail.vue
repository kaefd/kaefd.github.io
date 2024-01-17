<template>
    <div v-if="store().detail_dialog" class="absolute top-0 right-0 w-full h-full overflow-auto z-[2] ps-0 md:ps-24" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class="flex flex-col gap-y-3 h-full pb-20 md:pb-3 overflow-auto md:overflow-auto">
            <slot name="full-content">
                <div class="overflow-visible h-full md:h-full mx-0 md:mx-5 mt-5 p-5 rounded-0 md:rounded-lg flex flex-col flex-wrap gap-y-5 animate__animated animate__fadeIn animate__faster"  :class="store().dialog ? (store().theme == 'dark' ? 'dark z-[0]' : 'bg-white z-[0]') : (store().theme == 'dark' ? 'dark z-[2]' : 'bg-white z-[2]')">
                    <div class="flex items-center space-x-3 text-lg md:text-xl">
                        <button @click="close()">
                            <i class="ri-arrow-left-line"></i>
                        </button>
                        <span class="font-semibold capitalize">{{ store().menu.option.title }}</span>
                    </div>
                    <!-- HEAD -->
                    <slot name="header-content">
                        <div class="flex flex-col flex-wrap gap-y-2 gap-x-32 pt-1 w-full" :class="store().nav ? 'h-max md:h-max lg:h-[50vh] xl:h-[45vh] 2xl:h-[28vh]' : 'h-max md:h-max lg:h-[40vh] xl:h-[35vh] 2xl:h-[28vh]'">
                            <div v-for="fl in field.filter(it => it.show == true)">
                                <div class="flex justify-between items-center md:w-72">
                                    <label class="w-[24%] break-normal">{{ fl.title }}</label>
                                    <base-input :type="fl.type" :value="store().master[fl.key]" :option="fl.item" :fl_item="fl.item" :default="fl.default" :rules="fl.rules" :label="fl.key" @input="input" :disabled="fl.disabled || disabled || (store().menu.option.key == 'edit' && fl.edit == false)"></base-input>
                                </div>
                            </div>
                        </div>
                    </slot>
                </div>
                <!-- DETAIL -->
                <div v-if="child && store().menu.option.key == 'tambah'" class="px-3 md:px-5">
                    <base-button @click="addDetail()" class="bg-primary w-full md:w-max" label="Tambah Barang"></base-button>
                </div>
                <div v-if="child" class="rounded-lg mx-0 md:mx-5 min-h-[350px] h-full flex flex-col justify-between animate__animated animate__fadeIn animate__slow" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                    <div class="w-full h-full rounded-0 md:rounded-lg" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                        <slot name="detail"></slot>
                    </div>
                    <div class="pt-1 pb-3 px-3 gap-x-5 rounded-b-0 md:rounded-b-lg" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
                        <!-- <span v-for="p in param" class="font-bold capitalize">{{ 'Total ' + p.title + ': ' }} {{ sumTotalN(p) }}</span> -->
                        <div class="w-full flex flex-col md:flex-row justify-between gap-y-1">
                            <div v-for="p in param" class="flex gap-x-1">
                                <div class="flex flex-col w-28 justify-center p-2" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">{{ p.title }}</div>
                                <div class="flex flex-col break-words w-full md:w-44 justify-center p-2" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">{{ sumTotalN(p) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </slot>
            <div v-if="store().menu.option.key == 'tambah' || store().menu.option.key == 'edit'" class="w-full px-3 md:px-5 flex justify-end space-x-2 z-[1]" :class="store().detail != '' && store().detail?.length > 1 ? 'mt-24 md:mt-0' : ''">
                <base-button @click="close()" class="bg-primary-hover w-full md:w-max" label="Batal"></base-button>
                <base-button @click="submited()" class="bg-primary w-full md:w-max" label="Simpan"></base-button>
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
import pengiriman from '@/views/transaksi/pengiriman/pengiriman';
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
            this.tmp = []
            this.dataitem = {}
            store().resetState()
        },
        sumTotalN(prm) {
            let arr = []
            let data = store().detail
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
        addDetail() {
            if(this.$router.currentRoute.value.path == '/transaksi/pengiriman') {
                const data = pengiriman.blmTerkirim()
                store().$patch((state) => state.state.permission[0].item.item = data)
            }
            this.input_d = true
            store().$patch((state) => { 
                // state.i_dialog.show = !state.i_dialog.show
                state.i_dialog.item = state.state.permission[0].item
                state.s_detail = ''
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
                if(store().menu.option.key != 'edit') {
                    this.dataitem[a[i].title] = a[i].value
                }
                else {
                    store().master[a[i].title] = a[i].value
                }
            }
            if(store().menu.option.key != 'edit') store().$patch((state) => { state.detailDump = this.dataitem})
            else store().$patch((state) => { state.detailDump = state.master })
        },
        async submited() {
            let opt = store().menu.option.key
            let head = store().state.field_detail.filter(item => item.rules != undefined)
            // let detail = store().state.dialog_field.filter(item => item.rules != undefined).slice(1)
            // let fl = [...head, ...detail]
            // let input = [...[this.dataitem], ...store().detail]
            let a = ''
            if(opt == 'edit') a = head != '' ? store().validate(head, store().master, head) : true
            else a = head != '' ? store().validate(head, this.dataitem, head) : true
            if(a && a != undefined) {
                if(this.child == false) {
                    if(opt == 'tambah') { 
                        let a = await store().create(this.dataitem)
                        if(a == 'success') this.dataitem = {}
                        console.log(a);
                    }
                    else if(opt == 'edit') {
                        store().update(store().master)
                    }
                } else if (this.child && store().detail != '') {
                    if(opt == 'tambah') { 
                        let a = await store().create(this.dataitem)
                        if(a == 'success') {
                            this.tmp = []
                            this.dataitem = {}
                        }
                    }
                    // else if(opt == 'edit') store().update(store().master)
                } else if (store().detail == '') alert.warning(null, 'detail masih kosong') 
            }
        }
    },
}
</script>