<template>
    <div @contextmenu.prevent="context($event)" class="absolute overflow-x-hidden bottom-0 right-0 w-full h-full text-sm" :class="store().dark ? 'bg-dark-base' : 'bg-base'">
        <div class="w-[95%] mx-auto flex flex-col gap-y-3 h-full md:pb-3">
            <slot name="full-content">
                <div class="mt-5 p-5 z-[1] rounded-lg flex flex-col flex-wrap gap-y-5 animate__animated animate__fadeIn animate__faster"  :class="store().dialog ? (store().dark ? 'dark' : 'bg-white') : (store().dark ? 'dark' : 'bg-white'), d_field ? 'h-fit' : 'h-full'">
                    <div class="flex items-center space-x-3 text-[1.12rem]">
                        <slot name="header-detail">
                            <button @click="close('detail')">
                                <i class="ri-arrow-left-line"></i>
                            </button>
                        </slot>
                        <span class="font-semibold capitalize">{{ `detail ${config.title}` }}</span>
                    </div>
                    <!-- HEAD -->
                    <slot name="header-content" :h_field="h_field">
                        <div class="flex flex-col flex-wrap gap-y-2 gap-x-32 pt-1 w-full" :class="!d_field ? 'h-max' : 'h-max md:h-max lg:h-[40vh] xl:h-[23vh]'">
                            <div v-for="fl in h_field">
                                <div class="flex justify-between items-center md:w-72">
                                    <label class="w-[24%] break-normal">{{ fl.title }}</label>
                                    <base-input :type="fl.type"  :option="fl.item" :value="h_items[fl.key]" :fl_item="fl.item" :default="fl.default" :rules="fl.rules" :label="fl.key" :allItems="dataitem" :keys="fl.key" @input="input" :disabled="fl[store().state.action].disabled"></base-input>
                                </div>
                            </div>
                        </div>
                    </slot>
                </div>
                <!-- DETAIL -->
                <div v-if="d_field" class="rounded-lg min-h-[350px] h-full overflow-auto p-3 flex flex-col justify-between animate__animated animate__fadeIn animate__faster" :class="store().dark ? 'dark' : 'bg-white'">
                    <base-table :fields="config.fields.detail" :tbl_footer="config.tbl_footer" :filter="config.filter" :show_filter="false" :select_column="true" :export="false" :search="false" :items="d_items || detail_items" :permission="config.permission" @openDetail="resTable">
                        <template #body-row="items">
                            <slot name="rowtbl" :items="items.items" :header="items.header"></slot>
                        </template>    
                    </base-table>
                </div>
            </slot>
            <!-- BUTTON ACTION -->
            <div v-if="store().state.action == 'create' || store().state.action == 'edit'" class="w-full px-3 md:px-5 pb-2 flex justify-end space-x-2">
                <base-button  @click="close('detail')" class="bg-primary-hover w-full md:w-max" label="Batal"></base-button>
                <base-button @click="save()" class="bg-primary w-full md:w-max" label="Simpan"></base-button>
            </div>
            <!-- CONTEXT MENU -->
            <ContextMenu v-if="offContext" :isActive="openContext" :items="contextItem" @close="close" @resContext="resContext" />
            <!-- DIALOG INPUT -->
            <input-dialog v-if="DialInput" :open="DialInput" :data_dialog="data_dialog" :fields="fl_child" :detail="d_items || detail_items" @close="close" @resDialInput="resDialInput">
                <template #left="data_left">
                    <slot name="d-left" :data_left="data_left.data_left"></slot>
                </template>
            </input-dialog>
            <!-- DIALOG -->
            <base-dialog v-if="dialog" :active="dialog" :fields="fl_child" :items="s_detail" :detail="d_items || detail_items" @resDialog="resDialog" @close="close"></base-dialog>
        </div>
    </div>
</template>
<script setup>
import ContextMenu from '@/components/menu/ContextMenu.vue';
import alert from '@/utils/alert';
import { store } from '@/utils/store'
import validation from '@/utils/validation';
</script>
<script>
export default {
    props: {
        config: {type: Object, required: true},
        h_items: {type: Object, required: true},
        d_items: {type: Object, required: true},
        isActive: {type: Boolean, required: true},
    },
    data() {
        return {
            openContext: false,
            DialInput: false,
            dialog: false,
            data_dialog: '',
            fl_child: '',
            tmp: [],
            dataitem: this.h_items || {},
            detail_items: '',
            s_detail: ''
        }
    },
    computed: {
        h_field() {
            return this.config.fields.head.filter(item => item[store().state.action]?.show == true)
        },
        d_field() {
            if(this.config.fields.detail) return this.config.fields.detail.filter(item => item[store().state.action]?.show == true)
            else return false
        },
        offContext() {
            if(!this.openContext || store().state.action == 'read' || this.dialog || this.DialInput ) return false
            else return true
        }
    },
    methods: {
        context(event) {
            store().state.data.Xaxis = event.clientX
            store().state.data.Yaxis = event.clientY
            this.openContext = true
        },
        resContext(value) {
            if(value.key == 'create_detail') {
                store().single_detail = ''
                this.data_dialog = this.config.menu.detail[0].item
                this.fl_child = this.config.fields.detail.filter(item => item.dialog == true)
                this.DialInput = true
            }
            if(value.key == 'edit_detail') {
                this.fl_child = this.config.fields.detail.filter(item => item.dialog == true)
                this.s_detail = store().single_detail
                this.dialog = true
            }
            if(value.key == 'delete_detail') {
                this.s_detail = store().single_detail
                let idx = this.detail_items.indexOf(this.s_detail)
                this.detail_items.splice(idx, 1)
            }
            this.openContext = false
        },
        resTable(value) {
            this.s_detail = value
            this.fl_child = this.config.fields.detail.filter(item => item.dialog == true)
            this.dialog = true
        },
        resDialog(key, value) {
        },
        resDialInput(value) {
            this.tmp.push(value)
            this.detail_items = this.tmp
        },
        close(s) {
            if(s == 'detail') {
                store().state.action = 'read'
                this.$emit('close', 'detail')
            }
            if(s == 'context') {
                this.openContext = false
                store().single_detail = ''
            }
            if(s == 'dialog_input') {
                this.DialInput = false
            }
            if(s == 'dialog') {
                this.dialog = false
            }
        },
        input(value) {
            let a = []
            a.push(value)
            for (let i = 0; i < a.length; i++) {
                this.dataitem[a[i].title] = a[i].value
            }
        },
        save() {
            let head = this.h_field.filter(item => item.rules != undefined)
            let h_valid = head != '' ? validation.validate(head, this.dataitem, head) : true
            let d_valid = this.d_field ? (this.detail_items != '' ? true : false) : true
            if(!d_valid) return alert.warning(null, 'detail masih kosong')
            if(h_valid && d_valid) {
                let s = this.$router.currentRoute.value.matched[0].children.find(item => item.title == this.config.title).key.toLowerCase()
                if(store().state.action == 'create') store().create(s, this.dataitem, this.detail_items)
                if(store().state.action == 'edit') store().edit(s, this.dataitem, this.detail_items)
            }
        }
    },
    mounted() {
        store().TopBar = false
        store().AppBar = false
    }
}
</script>
<style scoped>
::-webkit-scrollbar {
	width: 0;
	height: 0;
}
</style>