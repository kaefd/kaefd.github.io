<template>
    <div @click="close()" class="absolute top-0 right-0 h-full w-full"></div>
    <div class="absolute border rounded w-40 max-h-min min-h-12 space-y-1" :class="store().theme == 'dark' ? 'dark' : 'bg-white'"
        :style="elementStyle">
        <div @click="option()"
            class="p-3 w-full cursor-pointer" :class="store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'">
            <span class="text-sm">Refresh</span>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
</script>
<script>
export default {
    computed: {
        elementStyle() {
            return {
                position: 'absolute',
                left: store().Rmenu.screenX/screen.width*100 + '%',
                bottom: ((screen.height - store().Rmenu.screenY-150)/screen.height * 100) + '%',
            }
        },
    },
    methods: {
        close() {
            store().$patch((state) => {
                state.Rmenu.show = false
            })
        },
        option() {
            store().resetState()
            store().refreshData()
        }
    }
}
</script>