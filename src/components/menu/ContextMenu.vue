<template>
    <div v-if="isActive" @click="close()" class="absolute top-0 left-0 bottom-0 right-0 h-screen w-screen z-[2]"></div>
    <div class="absolute top-0 left-0 bottom-0 right-0 h-screen w-screen">
        <div v-if="isActive" ref="boxMenu" class="absolute rounded w-48 min-h-12 space-y-1 text-sm shadow-full-xl p-2 z-[3]" :class="store().dark ? 'dark' : 'bg-white'"
        :style="elementStyle">
            <slot name="menu-item" :menuOpt="menuOpt">
                <div v-for="menu in menuOpt" @click="option(menu)"
                    class="p-2 w-full cursor-pointer rounded" :class="store().dark ? 'hover:bg-dark-hover' : 'hover:bg-primary-hover'">
                    <span>{{ menu.title }}</span>
                </div>
                <div v-if="refresh" @click="option({key: 'refresh'})"
                    class="p-2 w-full border-t cursor-pointer rounded" :class="store().dark ? 'hover:bg-dark-hover' : 'hover:bg-primary-hover'">
                    <span>Refresh</span>
                </div>
            </slot>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import otoritas from '@/router/otoritas'
</script>
<script>
export default {
    props: {
        isActive: {type: Boolean, required: true},
        items: {type: Object, required: true},
    },
    data() {
        return {
            xpos: 0,
            ypos: 0,
            refresh: false
        }
    },
    computed: {
        elementStyle() {
            let h = this.ypos < 300 ? 300 : this.ypos
            return {
                position: 'absolute',
                top: screen.height - store().state.data.Yaxis <= h ? store().state.data.Yaxis - this.ypos + 'px' : store().state.data.Yaxis + 'px',
                left: screen.width - store().state.data.Xaxis <= this.xpos ? store().state.data.Xaxis - this.xpos + 'px' : store().state.data.Xaxis + 'px',
            }
        },
        menuOpt () {
            if(store().state.action == 'read') {
                this.refresh = true
                if(store().single_detail != '' && store().single_detail != undefined) return this.items
                else if(this.items) return this.items.filter(item => item.key != 'edit' && item.key != 'delete' && item.key != 'cetak_suratjalan' && item.key != 'cetak_do')
            }
            if(store().state.action == 'create') {
                this.refresh = false
                // let menu = [
                //     {title: 'Tambah detail', key: 'create_detail'},
                //     {title: 'Edit detail', key: 'edit_detail'},
                //     {title: 'Hapus detail', key: 'delete_detail'},
                // ]
                if(store().single_detail && store().single_detail != '') return this.items
                else return this.items?.slice(0,1)
            }
            if(store().state.action == undefined) {
                this.refresh = true
                return [this.items.find(item => item.key == 'create' && otoritas.check(item[store().state.action]) == true)]
            }
            else {
                this.refresh = true
                // if(store().state.title == 'Data User') return store().state.permission.filter(p => p.key != 'lihat')
                return this.items
            }
        }
    },
    methods: {
        option(value) {
            this.$emit('resContext', value)
            this.$emit('close', 'context')
        },
        close() {
            store().single_detail = ''
            this.$emit('close', 'context')
        },
        boxMenu() {
            this.xpos = this.$refs.boxMenu.clientWidth;
            this.ypos = this.$refs.boxMenu.clientHeight;
        }
    },
    mounted() {
        if(this.menuOpt) this.boxMenu()
    }
}
</script>