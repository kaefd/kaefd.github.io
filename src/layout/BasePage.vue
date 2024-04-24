<template>
    <div class="w-full h-full" :class="store().dark ? 'bg-dark-base' : 'bg-base'">
        <!-- CONTENT -->
        <div class="relative w-[95%] mx-auto h-[88%] md:h-[98%] rounded animate__animated animate__fadeIn animate__faster" :class="store().dark ? 'dark' : 'bg-white'">
            <!-- TABLE -->
            <div class="w-full h-full p-5">
                <base-table @contextmenu.prevent="context($event)" :title="config.title" :tbl_footer="config.tbl_footer" :base="true" :s_table="s_table" :fields="tableHeader" :filter="config.filter" :show_filter="true" :select_column="true" :export="true" :search="true" :items="items || store().data.items" :permission="config.permission" @openDetail="resTable"></base-table>
            </div>
        </div>
        <!-- CONTEXT MENU -->
        <ContextMenu v-if="openContext && !openDetail" :isActive="openContext" :items="contextItem" @close="close" @resContext="resContext" />
        <!-- DETAIL -->
        <slot name="detail-page" :d_items="d_items" :h_items="h_items">
            <base-detail v-if="openDetail" :config="config" @close="close" :h_items="h_items" :d_items="d_items" :base="false">
                <template #full-content>
                    <slot name="full-content"></slot>
                </template>
                <template #header-content>
                    <slot name="header-content" :items="d_items"></slot>
                </template>
                <template #rowtbl="items">
                    <slot name="row-table" :items="items.items" :header="items.header"></slot>
                </template>
                <template #d-left="data_left">
                    <slot name="left" :data_left="data_left.data_left"></slot>
                </template>
            </base-detail>
        </slot>
        <!-- CETAK DOKUMEN -->
        <CetakDokumen v-if="print" @close="close" :title="print_title">
            <template #dokumen>
                <SuratJalan v-if="config.permission.cetak_suratjalan && suratjalan" :head="store().single_detail" />
                <CetakDo v-if="config.permission.cetak_do && cetak_do" :head="store().single_detail" />
            </template>
        </CetakDokumen>
    </div>
</template>

<script setup>
import ContextMenu from '@/components/menu/ContextMenu.vue'
import { store } from '@/utils/store'
import CetakDokumen from '@/components/print/CetakDokumen.vue'
import SuratJalan from '@/views/transaksi/pengiriman/SuratJalan.vue'
import CetakDo from '@/views/transaksi/pengiriman/CetakDo.vue'
import user from '@/views/master/data-user/user'
</script>
<script>
    export default {
        props: {
            config: {type: Object, required: true},
            items: {type: Object},
            s_table: {type: Boolean}
        },
        data() {
            return {
                openContext: false,
                openDetail: false,
                h_items: '',
                d_items: '',
                print: false,
                print_title: '',
                suratjalan: false,
                cetak_do: false
            }
        },
        computed: {
            contextItem () {
                if(this.config.menu) {
                    return this.config.menu.head.filter(item => this.config.permission[item.key] == true)
                } else return ''
            },
            tableHeader() {
                return this.config.fields.head.filter(item => item.show == true)
            }
        },
        methods: {
            init() {
                store().TopBar = true
                store().AppBar = true
            },
            context(event) {
                this.openContext = false
                store().state.data.Xaxis = event.clientX
                store().state.data.Yaxis = event.clientY
                setTimeout(() => {
                    if(!this.openDetail) this.openContext = true
                }, 90)
            },
            async resContext(value) {
                let k = this.$router.currentRoute.value.matched[0].children.find(item => item.title == this.config.title).key.toLowerCase()
                let path = this.$router.currentRoute.value.path
                if(value.key == 'create') {
                    store().state.action = 'create'
                    store().single_detail = ''
                    this.h_items = ''
                    this.d_items = ''
                    if(this.config.title == 'Data User') {
                        this.d_items = user.beforeCreate()
                        store().s_dialog = true
                    }
                    else this.openDetail = true
                }
                if(value.key == 'edit') {
                    store().state.action = 'edit'
                    this.h_items = store().single_detail
                    if(this.config.title == 'Data User') {
                        this.d_items = await user.getDetail(store().single_detail)
                        store().s_dialog = true
                    } else this.openDetail = true
                }
                if(value.key == 'delete') {
                    return await store().delete(k, store().single_detail)
                }
                if(value.key == 'cetak_suratjalan') {
                    this.print = true
                    this.print_title = 'Cetak Surat Jalan'
                    this.suratjalan = true
                }
                if(value.key == 'cetak_do') {
                    this.print = true
                    this.print_title = 'Cetak Surat Delivery Order'
                    this.cetak_do = true
                }
                if(value.key == 'refresh') {
                    // let module = await import(/* @vite-ignore */`../views${path}/${k}.js`)
                    let data = await store().get(k)
                    store().data.items = data
                }
            },
            async resTable(value) {
                let k = this.$router.currentRoute.value.matched[0].children.find(item => item.title == this.config.title).key.toLowerCase()
                if(this.config.title == 'Data User') store().s_dialog = true
                else this.openDetail = true
                this.h_items = value
                if(this.config.child) {
                    store().loading = true
                    this.d_items = await store().getDetail(k, value)
                    store().loading = false
                }
            },
            close(obj) {
                if(obj == 'context') this.openContext = false
                if(obj == 'detail') this.openDetail = false
                if(obj == 'print') {
                    this.print = false
                    this.suratjalan = false
                    this.cetak_do = false
                    this.print_title = ''
                }
                this.init()
            }
        },
        mounted() {
            this.init()
        }
    }
</script>