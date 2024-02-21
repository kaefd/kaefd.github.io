<template>
    <div v-if="store().menu.show" @click="close()" @contextmenu.prevent="move()" class="absolute top-0 left-0 bottom-0 right-0 h-screen w-screen"></div>
    <div ref="boxMenu" class="absolute border rounded-lg w-52 min-h-12 space-y-1 text-sm shadow-xl p-2" :class="store().theme == 'dark' ? 'dark' : 'bg-white'"
        :style="elementStyle">
        <div v-for="menu in menuOpt" @click="option(menu)"
            class="p-2 w-full cursor-pointer rounded-md" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-primary-hover'">
            <span>{{ menu.title }}</span>
        </div>
        <div v-if="refresh" @click="option('refresh')"
            class="p-2 w-full cursor-pointer rounded-md" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-primary-hover'">
            <span>Refresh</span>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import otoritas from '@/router/otoritas'
</script>
<script>
export default {
    data() {
        return {
            xpos: 0,
            ypos: 0,
            refresh: false
        }
    },
    computed: {
        screen() {
            return {
                height: screen.height,
                width: screen.width,
            }
        },
        elementStyle() {
            return {
                position: 'absolute',
                top: screen.height - store().menu.screenY < 200 ? store().menu.screenY - this.ypos + 'px' : store().menu.screenY + 'px',
                left: screen.width - store().menu.screenX < this.xpos ? store().menu.screenX - this.xpos + 'px' : store().menu.screenX + 'px',
                // left = x
            }
        },
        menuOpt () {
            let menu = [
                {title: 'Hapus', key: 'hapus_detail'},
            ]
            if(store().menu.option.key == 'lihat') {
                store().$patch((state) => {
                    state.menu.show = false
                })
            }
            if(store().menu.option.key == 'tambah') return menu
            else {
                this.refresh = true
                if(store().state.title == 'Data User') return store().state.permission.filter(p => p.key != 'lihat')
                else return store().state.permission.filter(item => item.key != 'lihat' && otoritas.check(item.key) == true)
            }
        }
    },
    methods: {
        option(value) {
            let same = store().state.permission.filter((item) => item.key == value.key)
            if(same != '') store().$patch((state) => { state.menu.option = value })
            if(value == 'refresh') {
                store().resetState()
                store().refreshData()
            }
            // if (value.key == 'lihat') {
            //     store().$patch((state) => { 
            //         state.detail_dialog = true
            //         state.menu.show = false
            //      })
            // }
            else if (value.key == 'tambah') {
                store().$patch((state) => {
                    state.detail_dialog = true
                    state.master = '',
                    state.detail= ''
                })
            }else if (value.key == 'edit') {
                store().$patch((state) => {
                    state.detail_dialog = true
                })
            } else if (value.key == 'suratjalan') {
                store().$patch((state) => {
                    state.print = true
                    state.suratjalan = true
                })
            } else if (value.key == 'do') {
                store().$patch((state) => {
                    state.print = true
                    state.do = true
                })
            } else if (value.key == 'hapus') {
                store().delete()
            } 
            //else if (value.key == 'detail') {
            //     store().openDialog()
            // }
            else if (value.key == 'hapus_detail') {
                console.log(store().s_detail);
                let data = store().detail.filter(item => item != store().s_detail)
                store().detail.splice(0, store().detail.length, ...data)
            }
            store().$patch((state) => { state.menu.show = false })
        },
        close() {
            store().$patch((state) => {
                state.menu.show = false
            })
        },
        move() {
            store().menu.show = !store().menu.show
        },
        boxMenu() {
            this.xpos = this.$refs.boxMenu.clientWidth;
            this.ypos = this.$refs.boxMenu.clientHeight;
        }
    },
    mounted() {
        this.boxMenu()
    }
}
</script>