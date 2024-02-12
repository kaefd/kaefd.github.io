<template>
    <!-- <base-table :fields="config.fields" :items="passItem || store().detail" :master="false" :dialog_field="d_field || store().state.dialog_field" :s_table="s_table"></base-table> -->
    <PengirimanDetail :passItem="passItem" :d_field="config.fields" :s_table="true">
        <template #body-table>
            <tr v-for="item in passItem.detail" class="w-full flex items-center break-words cursor-default" :class="(store().theme == 'dark' ? 'hover:bg-dark-hover' : 'hover:bg-gray-100'), (config.fields_detail.length > 1 ? 'justify-around' : 'justify-between')">
                <td v-for="field, f in config.field_detail" scope="row" class="px-6 py-3 w-[15%] min-w-[100px] whitespace-pre-wrap capitalize">
                    <!-- {{ field.type == 'number' ? (item[field.key] > 0 ? utils.numb(item[field.key]) : 0) : (field.type == 'date' ? utils.formatDate(item[field.key]) : item[field.key]) }} -->
                    {{ field }}
                </td>
            </tr>
        </template>
    </PengirimanDetail>
</template>
<script setup>
import { store } from '@/utils/store'
import utils from '@/utils/utils';
import PengirimanDetail from '../transaksi/pengiriman/PengirimanDetail.vue';
</script>
<script>
export default {
    props: ['passItem', 'd_field', 's_table'],
    data() {
        return {
            config: {
                title: 'Detail Pengiriman Barang',
                fields: [
                    {title: 'No Pengiriman', key: 'no_pengiriman', type: 'text', show: true, rules: ['required']},
                    {title: 'Tgl Pengiriman', key: 'tgl_pengiriman', type: 'date', show: true, rules: ['required', 'date:min '+utils.last_month(), 'date:max '+ utils.today()]},
                    {title: 'Pelanggan', key: 'pelanggan', type: 'dialog', item: {point: 'nama', endpoint: 'pelanggan', title: 'Data Pelanggan', child: false, left: ['nama']}, show: true, rules: ['required']},
                    {title: 'Tujuan Bongkar', key: 'tujuan_bongkar', type: 'dialog', item: {point: 'nama', endpoint: 'alamat_bongkar', title: 'Alamat Bongkar', child: false, leftCustom: [
                        {content: ['nama']},
                        {content: ['alamat', 'kabupaten'], separate: '-'},
                    ]}, show: '', rules: ['required']},
                    {title: 'Supir', key: 'supir', type: 'text', show: true, rules: ['required']},
                    {title: 'No Polisi', key: 'no_polisi', type: 'text', show: true, rules: ['required']},
                ],
                field_detail: [
                        {title: 'No Penjualan', key: 'no_penjualan', type: 'text', show: true},
                        {title: 'Tipe Dokumen', key: 'tipe_dokumen', type: 'text', show: true},
                        {title: 'No Dokumen', key: 'no_dokumen', type: 'text', show: true},
                        {title: 'Kode Group', key: 'kode_group', type: 'text', show: true},
                        {title: 'Kode Barang', key: 'kode_barang', type: 'text', show: true},
                        {title: 'Nama Barang', key: 'nama_barang', type: 'text', show: true},
                        {title: 'Jumlah', key: 'jumlah', type: 'number', show: true},
                        {title: 'Satuan', key: 'satuan', type: 'text', show: true},
                        // {title: 'Kode Konversi', key: 'kode_konversi', type: 'text', show: true},
                        // {title: 'Nama Konversi', key: 'nama_konversi', type: 'text', show: true},
                        {title: 'Jumlah Konversi', key: 'jumlah_konversi', type: 'number', show: true},
                        {title: 'Satuan Konversi', key: 'satuan_konversi', type: 'text', show: true},
                ],
                field_detail: false,
                filter: false,
            }
        }
    },
    methods: {
        // get() {
        //     this.$nextTick(() => this.passItem)
        //     console.log(this.passItem);
        // }
    },
    created() {
        // this.get()
    }
}
</script>