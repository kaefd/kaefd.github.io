<template>
    <div  v-if="store().s_dialog" class="text-sm w-full h-full top-0 left-0 absolute flex justify-center items-center overflow-hidden">
        <div v-if="store().s_dialog" @click="close()" class="fixed top-0 left-0 h-full w-full z-[0] bg-scrim"></div>
        <div class="bottom-0 rounded h-[86vh] md:h-[95vh] w-[28%] min-w-[350px] max-w-[450px] mb-16 md:mb-0 p-7 flex flex-col items-center duration-300" :class="store().s_dialog ? (store().dark ? ' animate__animated animate__fadeInUp animate__faster duration-400 dark' : ' animate__animated animate__fadeInUp animate__faster duration-400 bg-white') : (store().dark ? ' dark' : ' bg-white')">
            <div class="not-sr-only md:sr-only absolute text-xl right-7">
                <button  @click="close()">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            <span class="font-semibold text-lg">Detail User</span>
            <div class="flex flex-col gap-y-3 items-center">
                <div class="w-20 h-20 flex justify-center items-center overflow-hidden rounded-full py-10">
                    <img src="@/assets/img/person1.png"/>
                </div>
                <div v-for="fl in h_field" class="w-[270px] h-fit flex capitalize items-center justify-between">
                    <span>{{ fl.title }}</span>
                    <base-input :type="fl.type" :label="fl.title" :value="h_items[fl.key]" :disabled="fl[store().state.action]?.disabled" @input="account"></base-input>
                </div>
            </div>
            <span class="text-center uppercase my-3">otoritas</span>
            <div class="h-full w-full overflow-auto">
                <div v-if="store().state.action != 'create'" v-for="dt in items">
                    <div class="flex justify-between items-center p-2">
                        <base-input type="checkbox" :label="dt.title" :value="dt.value" @input="input" :disabled="disabled"></base-input>
                        <button @click="open(dt)" class="w-1/4 py-1 text-right">
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
                <div v-if="store().state.action == 'create'" v-for="df in items">
                    <div class="flex justify-between items-center p-2">
                        <base-input type="checkbox" :label="df.title" :value="df.value" @input="input"></base-input>
                        <button @click="open(df)" class="w-1/4 py-1 text-right">
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
            <div v-if="store().state.action != 'read'" class="w-full flex justify-end gap-x-2 mt-2">
                <base-button @click="close()" label="batal" class="bg-primary-hover"></base-button>
                <base-button @click="submited()" label="simpan" class="bg-primary"></base-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { store } from '@/utils/store'
import validation from '@/utils/validation';
import user from './user.js'
</script>
<script>
export default {
    props: {
        h_field: {type: Object, required: true},
        h_items: {type: Object, required: true},
        d_items: {type: Object, required: true},
    },
    data() {
        return {
            master: '',
            detail_fl: '',
            dataitem: {},
        }
    },
    created() {
        this.detail_fl = this.model
    },
    computed: {
        disabled() {
            return store().state.action == 'read'
        },
        items() {
            return this.d_items
        }
    },
    methods: {
        open(val) {
            if(store().state.action != 'create') this.d_items.map(item => item.active = val.title != item.title ? false : (item.active == true ? false : true) )
            else if(store().state.action == 'create') {
                this.d_items.map(item => item.active = val.title == item.title ? !item.active : false)
                
            }
        },
        account(v) {
            this.dataitem[v.title] = v.value
        },
        close() {
            store().s_dialog = false
            store().init()
            this.dataitem = {}
        },
        input(value) {
            let a = []
            if(this.items.find(item => item.title == value.title)?.item != undefined) {
                this.items.map(item => {
                    if(item.title == value.title) {
                        let res = item.item?.map(it => {
                            return {
                                title: it.title,
                                value: value.value
                            }
                        })
                        
                        a = [...[value], ...res]
                        return item.item?.map(it => it.value = value.value)
                    }
                })
            } else a.push(value)
            for (let i = 0; i < a.length; i++) {
                this.dataitem[a[i].title] = a[i].value
            }
        },
        submited() {
            let head = this.h_field.filter(item => item.rules != undefined)
            let h_valid = head != '' ? validation.validate(head, this.dataitem, head) : true
            if(h_valid) {
                let opt = store().state.action
                if(opt == 'create') user.create(this.dataitem, this.items)
                else if(opt == 'edit') user.update(this.dataitem, this.items)
            }
            
        }
    },
    mounted () {
        this.detail_fl
    }
}
</script>