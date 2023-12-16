<template>
    <div class="h-screen w-screen top-0 left-0 absolute flex justify-center items-center" :class="store().detail_dialog ? 'z-[1] translate-y-0' : 'z-[-1] translate-y-full'">
        <div v-if="store().detail_dialog" @click="close()" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <div class="bottom-0 rounded-3xl h-[86vh] md:h-[95vh] w-[28%] min-w-[350px] max-w-[450px] mb-16 md:mb-5 p-7 flex flex-col items-center duration-300" :class="store().detail_dialog ? (store().theme == 'dark' ? 'z-[1] animate__animated animate__fadeInUp animate__faster duration-400 dark' : 'z-[1] animate__animated animate__fadeInUp animate__faster duration-400 bg-white') : (store().theme == 'dark' ? 'z-[-1] dark' : 'z-[-1] bg-white')">
            <span class="font-semibold text-lg">Detail User</span>
            <div v-if="store().detail_dialog" class="flex flex-col gap-y-3 items-center">
                <div class="w-20 h-20 flex justify-center items-center overflow-hidden rounded-full py-10">
                    <img src="@/assets/img/person1.png"/>
                </div>
                <div class="w-[270px] h-fit flex items-center justify-between">
                    <span>Username</span>
                    <base-input type="text" label="username" :value="store().master.username" @input="account" :disabled="disabled || store().menu.option.key == 'edit'"></base-input>
                </div>
                <div class="w-[270px] h-fit flex items-center justify-between">
                    <span>Password</span>
                    <base-input type="password" label="password" @input="account" :disabled="disabled"></base-input>
                </div>
            </div>
            <span class="text-center uppercase my-3">otoritas</span>
            <div class="h-full w-full overflow-auto">
                <div v-if="store().menu.option.key != 'tambah'" v-for="dt in store().detail">
                    <div class="flex justify-between items-center p-2">
                        <base-input type="checkbox" :label="dt.title" :value="dt.value" @input="input" :disabled="disabled"></base-input>
                        <button @click="open(dt)" >
                            <i v-if="dt.active" class="ri-arrow-up-s-line"></i>
                            <i v-else class="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                    <div v-if="dt.item" class="flex flex-col mx-7 overflow-hidden duration-300" :class="dt.active ? 'py-1' : 'h-0 py-0'">
                        <div v-for="d in dt.item" class="hover:bg-primary-hover py-2 ">
                            <base-input type="checkbox" :label="d.title" :value="d.value" @input="input" :disabled="disabled"></base-input>
                        </div>
                    </div>
                </div>
                <div v-if="store().menu.option.key == 'tambah'" v-for="df in model">
                    <div class="flex justify-between items-center p-2">
                        <base-input type="checkbox" :label="df.title" :value="df.value" @input="input"></base-input>
                        <button @click="open(df)" class="">
                            <i v-if="df.active" class="ri-arrow-up-s-line"></i>
                            <i v-else class="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                    <div v-if="df.item != null" class="flex flex-col mx-7 overflow-hidden duration-300" :class="df.active ? 'py-1' : 'h-0 py-0'">
                        <div v-for="d in df.item" class="hover:bg-primary-hover py-2">
                            <base-input type="checkbox" :label="d.title" :value="d.value" @input="input"></base-input>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="store().menu.option.key != 'lihat'" class="w-full flex justify-end gap-x-2 mt-2">
                <base-button @click="close()" label="batal" class="bg-primary-hover"></base-button>
                <base-button @click="submited()" label="simpan" class="bg-primary"></base-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
</script>
<script>
export default {
    props: {model: {type: Object}, field: {type: Object}},
    data() {
        return {
            master: '',
            detail_fl: '',
            dataitem: {},
            config: {
                title: 'DetailUser',
                permission: [
                    {title: 'Tambah Data', key: 'tambah', value: true},
                    {title: 'Detail Pemasukan', key: 'lihat', value: true},
                    {title: 'Batal Pemasukan', key: 'batal', value: false},
                ],
                fields: [
                    {title: 'Jenis Otoritas', key: 'jenis_otoritas', type: 'text', show: true},
                    {title: 'Status', key: 'status', type: 'text', show: true},
                ],
                custom_field: [
                    {title: 'Data Barang', key: 'data_barang'}
                ],
                dialog_field: false,
                field_detail: false,
                filter: false,
            }
        }
    },
    created() {
        this.detail_fl = this.model
    },
    computed: {
        disabled() {
            return store().menu.option.key == 'lihat'
        },
        // detail_fl() {
        //     if(store().menu.option.key == 'tambah') {
        //         let items = store().items[0].detail
        //         let data = []
        //         for (let i = 0; i < items.length; i++) {
        //             data.push({
        //                 title: items[i].title,
        //                 key: items[i].key,
        //                 value: false,
        //                 active: false,
        //                 // item: items[i].item != undefined ? items[i].item : null
        //             })
        //         }
        //         return data
        //     }
        // }
    },
    methods: {
        open(val) {
            if(store().menu.option.key != 'tambah') store().detail.map(item => item.active = val.title != item.title ? false : (item.active == true ? false : true) )
            else if(store().menu.option.key == 'tambah') {
                this.model.map(item => item.active = val.title == item.title ? !item.active : false)
                this.$nextTick(() =>  this.model)
                console.log(this.model);
                
            }
        },
        account(v) {
            this.dataitem[v.title] = v.value
        },
        close() {
            store().$patch((state) => {
                state.detail_dialog = false
                state.menu.option = ''
            })
        },
        input(value) {
            let a = []
            a.push(value)
            for (let i = 0; i < a.length; i++) {
                this.dataitem[a[i].title] = a[i].value
            }
            // store().$patch((state) => { state.detailDump = this.dataitem})
        },
        submited() {
            let opt = store().menu.option.key
            if(opt == 'edit') this.dataitem.username = store().master.username
            let a = store().validate(this.field, this.dataitem, this.field)
            if(a) {
                if(opt == 'tambah') store().create(this.dataitem, this.model)
                else if(opt == 'edit') store().update(this.dataitem, this.model)
            }
        }
    },
    mounted () {
        this.detail_fl
    }
}
</script>