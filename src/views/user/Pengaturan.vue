<template>
    <div class="h-screen w-screen top-0 left-0 ps-24 py-5 absolute flex justify-center items-center" :class="store().theme == 'dark' ? 'bg-dark-base' : 'bg-base'">
        <div class="w-full h-full mx-5 md:mx-8 p-5 rounded-xl animate__animated animate__fadeIn animate__faster" :class="store().theme == 'dark' ? 'dark' : 'bg-white'">
            <div class=" flex items-center space-x-3 text-xl">
                <button @click="close()">
                    <i class="ri-arrow-left-line"></i>
                </button>
                <span class="font-semibold capitalize">Pengaturan</span>
            </div>
            <div class="flex flex-col gap-y-3 my-10">
                <div class="flex flex-col gap-y-2 md:w-72">
                    <label>Ukuran Font</label>
                    <div class="flex space-x-2 items-center">
                        <span>{{ fontSize }}pt</span>
                        <k-range
                            class=""
                            :value="fontSize"
                            :step="1"
                            :min="3"
                            :max="24"
                            @input="(e) => (fontSize = parseInt(e.target.value, 10))"
                        />
                        <span>24pt</span>
                    </div>
                </div>
            </div>
        </div>
    </div>        
</template>
<script setup>
import { store } from '@/utils/store'
import { kRange } from 'konsta/vue'
</script>
<script>
export default {
    data() {
        return { 
            fontSize: 3
        }
    },
    methods: {
        close() {
            this.$emit('close', false)
        }
    }
}
</script>