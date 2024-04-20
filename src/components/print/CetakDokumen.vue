<template>
    <div class="hddn w-full h-full absolute top-0 left-0 z-10" :class="store().dark ? 'bg-dark-base' : 'bg-base'">
        <div class="hddn rounded h-full animate__animated animate__fadeIn animate__faster">
            <div class="bodyp hddn bg-scrim fixed w-full p-3 flex items-center justify-between text-lg md:text-xl">
                <div class="hddn flex space-x-3">
                    <button @click="close()">
                        <i class="ri-arrow-left-line"></i>
                    </button>
                    <span class="font-semibold capitalize">{{ title }}</span>
                </div>
                <button @click="print()" class="mx-3 text-2xl hddn">
                    <i class="ri-printer-line"></i>
                </button>
            </div>
            <div id="print" class="w-full h-full flex justify-center pt-16 overflow-auto">
                <div class="page w-screen md:w-max h-max">
                    <slot name="dokumen"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {store} from '@/utils/store'
import utils from '@/utils/utils'
</script>
<script>
export default {
    props: {title: {type: String}},

    methods: {
        close() {
            this.$emit('close', 'print')
        },
        print() {
            window.print()
        },
    },
}
</script>
<style scoped>
@media print {
@page {
    margin: 0mm;
}
.bodyp {
    visibility: hidden !important;
}
/* .bodyp {
    visibility: hidden;
    padding: 0 !important;
    margin: 0 !important;
} */
.page {
    /* width: 20cm;
    height: 11cm; */
    width: unset !important;
    border: none;
    box-shadow: none !important;
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
}
  #print {
    visibility: visible;
    position: absolute;
    margin: 0;
    padding: 0;
    left: 0;
    top: 0;
    justify-items: start !important;
    align-items: start !important;
    color: black !important;
    text-rendering: optimizeLegibility;
    image-rendering: auto;
  }
}
</style>