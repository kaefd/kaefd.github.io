<template>
    <div class="h-full w-full">
        <base-table :fields="config.fields" :items="items" :master="true">
        <template #dialog-content>
                <base-detail :field="config.field_detail" :items="store().master.head" :child="config.child" :param="config.param">
                    <template #detail="passItem">
                        <PengirimanDetail :passItem="passItem.passItem" :d_field="config.dialog_field" :s_table="true" :custom="true">
                            <template #body-table>
                                <tr v-for="item in passItem.passItem.detail" class="w-full flex items-center break-words cursor-default" :class="(store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (config.fields_detail.length > 1 ? 'justify-around' : 'justify-between')">
                                    <td v-for="field, f in config.fields_detail" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                                        {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : item[field.key]) }}
                                    </td>
                                </tr>
                            </template>
                        </PengirimanDetail>
                    </template>
                </base-detail>
            </template>
        </base-table>
    </div>
</template>
<script setup>
import { store } from '@/utils/store';
import lapbc from './lapbc'
import utils from '@/utils/utils';
import PengirimanDetail from '../transaksi/pengiriman/PengirimanDetail.vue';
import DetailPgm from './DetailPgm.vue';
</script>
<script>
export default {
    // props: {config: {type: Object}},
    data() {
        return {
            items: '',
            config: {
                title: 'Data Barang',
                child: false,
                permission: [],
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog'},
                    {title: 'Supir', key: 'supir', type: 'text', show: true},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true},
                ],
                field_detail: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', show: true},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog'},
                    {title: 'Supir', key: 'supir', type: 'text', show: true},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true},
                ],
                fields_detail: [
                    { title: 'No Penjualan', key: 'no_penjualan', type: 'text', show: true },
                    { title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true },
                    { title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true },
                    { title: 'Kode Group', key: 'kode_group', type: 'text', show: true },
                    { title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true },
                    { title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true },
                    { title: 'Jumlah', key: 'jumlah', type: 'number', show: true },
                    { title: 'Satuan', key: 'satuan', type: 'text', show: true },
                    // {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true},
                    // {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true},
                    { title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true },
                    { title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true },
                ],
                child: [
                    {title: 'No Penjualan', key: 'no_penjualan', type: 'text', show: true},
                    {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true},
                    {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true},
                    {title: 'Kode Group', key: 'kode_group', type: 'text', show: true},
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                    {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                    {title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true},
                    {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true},
                ],
                dialog_field: [
                    {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: false},
                    {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: false},
                    {title: 'No Penjualan', key: 'no_penjualan', type: 'text', show: false, rules: ['unique']},
                    {title: 'Jumlah', key: 'jumlah', type: 'number', show: true, rules: ['required']},
                    {title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true},
                    {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true},
                ],
            }
        }
    },
    methods: {
        async get() {
            store().loader('on')
            const no_pjl = store().detail[0].no_penjualan
            this.items = await lapbc.detailPgm(no_pjl)
            if(this.items) store().loader('off')
            store().$patch((state) => {
                state.dialog = false
            })
        },
    },
    beforeMount() {
        // store().resetState()
    },
    mounted() {
        this.get()
    },
}
</script>