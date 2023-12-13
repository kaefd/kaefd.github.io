<template>
    <div class="w-full h-full">
        <div class="relative w-full h-[56vh] md:h-[75vh] rounded-lg mt-3 px-1">
            <div class="w-full flex justify-between">
                <!-- ADD BUTTON -->
                <btn-primary @click="alert.success('Submited!')" label="Break" />
                <!-- SELECT DATE -->
                <base-input type="date" />
            </div>
            <!-- TABLE LIST -->
            <div class="mt-5 h-full flex flex-col space-y-3">
                <!-- HEADER -->
                <div class="w-full h-10 bg-white-hover rounded-lg flex justify-between px-3 md:px-10 items-center">
                    <div v-for="field in fields" class="flex">
                        <span class="w-max md:w-[10vw] " :class="field.align ? field.align : ''">{{ field.title }}</span>
                    </div>
                </div>
                <!-- BODY -->
                <div class="h-full overflow-auto flex flex-col space-y-2">
                    <!-- <div v-for="item in items">
                        <div v-for="field in fields" class="bg-white rounded-lg h-14 flex justify-around items-center">{{ item[field] }}</div>
                    </div> -->
                    <div>
                        <div class="bg-white rounded-lg h-14 flex justify-between px-3 md:px-10 items-center">
                            <div class="w-max md:w-[10vw]">
                                <div class="w-10 md:w-13 h-13 overflow-hidden flex justify-center items-center rounded-full">
                                    <!-- <img src="/src/assets/person1.png" alt="avatar" class="w-full"> -->
                                </div>
                            </div>
                            <span class="w-max md:w-[10vw]">Joni</span>
                            <span class="w-max md:w-[10vw]">09.41</span>
                            <span class="w-max md:w-[10vw]">-</span>
                            <span class="w-max md:w-[10vw]">-</span>
                            <button @click="open[0] = !open[0]">
                                <i v-if="!open[0]" class="fa-solid fa-chevron-up w-max text-xs md:w-[10vw] text-center"></i>
                                <i v-if="open[0]" class="fa-solid fa-chevron-down w-max text-xs md:w-[10vw] text-center"></i>
                            </button>
                        </div>
                        <div class="bg-white-hover rounded-lg mx-3 md:mx-10 flex justify-between items-center duration-300 overflow-hidden" :class="open[0] ? 'h-14 mt-3 mb-1 ' : 'h-0 mb-0 mt-0'">
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw] flex space-x-1">
                                <i class="fa-regular fa-image"></i>
                                <span>img.jpg</span>
                            </div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                        </div>
                    </div>
                    <div>
                        <div class="bg-white rounded-lg h-14 flex justify-between px-3 md:px-10 items-center">
                            <div class="w-max md:w-[10vw]">
                                <div class="w-10 md:w-13 h-13 overflow-hidden flex justify-center items-center rounded-full">
                                    <!-- <img src="/src/assets/person1.png" alt="avatar" class="w-full"> -->
                                </div>
                            </div>
                            <span class="w-max md:w-[10vw]">Budi</span>
                            <span class="w-max md:w-[10vw]">09.41</span>
                            <span class="w-max md:w-[10vw]">09.41</span>
                            <span class="w-max md:w-[10vw]">09.41</span>
                            <button @click="open[1] = !open[1]">
                                <i v-if="!open[1]" class="fa-solid fa-chevron-up w-max text-xs md:w-[10vw] text-center"></i>
                                <i v-if="open[1]" class="fa-solid fa-chevron-down w-max text-xs md:w-[10vw] text-center"></i>
                            </button>
                        </div>
                        <div class="bg-white-hover rounded-lg mx-3 md:mx-10 flex justify-between items-center duration-300 overflow-hidden" :class="open[1] ? 'h-14 mt-3 mb-1 ' : 'h-0 mb-0 mt-0'">
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw] flex space-x-1">
                                <i class="fa-regular fa-image"></i>
                                <span>img.jpg</span>
                            </div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                            <div class="w-max md:w-[10vw]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <fd-confirm-dialog />
</template>
<script setup>
// import { store } from '@/utils/store'
// import utils from '@/utils/utils'
import alert from '@/utils/alert'
</script>
<script>
export default {
    props: {
        fields: {type: Object},
        items: {type: Object},
    },
    data () {
        return {
            open: [],
        }
    },
}
</script>