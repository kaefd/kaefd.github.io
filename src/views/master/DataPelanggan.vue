<template>
    <base-page :config="config"></base-page>
</template>
<script setup>
import pelanggan from './pelanggan'
import { store } from '@/utils/store'
import otoritas from '@/router/otoritas';
</script>
<script>
export default {
    data() {
        return {
            config: {
                title: 'Data Pelanggan',
                child: false,
                permission: [
                    {title: 'Tambah Data', key: 'tambah'},
                    {title: 'Detail Data', key: 'lihat'},
                    {title: 'Ubah Data', key: 'edit'},
                    {title: 'Hapus Data', key: 'hapus'}
                ],
                fields: [
                    {title: 'Kode Pelanggan', key: 'kode_pelanggan', type: 'text', show: true, sort: 'desc'},
                    {title: 'Nama', key: 'nama', type: 'text', show: true, sort: 'desc'},
                    {title: 'Alamat', key: 'alamat', type: 'text', show: true, sort: 'desc'},
                    {title: 'NPWP', key: 'npwp', type: 'text', show: true, sort: 'desc'},
                ],
                field_detail: [
                    {title: 'Kode Pelanggan', key: 'kode_pelanggan', type: 'text', show: true, edit: false, rules: ['required']},
                    {title: 'Nama', key: 'nama', type: 'text', show: true, rules: ['required']},
                    {title: 'Alamat', key: 'alamat', type: 'text', show: true},
                    {title: 'NPWP', key: 'npwp', type: 'text', show: true},
                ],
                filter: false,
            }
        }
    },
    methods: {
        async get () {
            let a = otoritas.Cakses('Data Pelanggan')
            if(a) {
                let data = await pelanggan.pelanggan()
                // let perm = store().otoritas
                // for (let i = 0; i < perm.length; i++) {
                //     if(perm[i].jenis_otoritas == 'Tambah Pelanggan Baru') this.config.permission.push({title: 'Tambah Data', key: 'tambah'})
                //     this.config.permission.push({title: 'Detail Data', key: 'lihat'})
                //     if(perm[i].jenis_otoritas == 'Ubah Pelanggan') this.config.permission.push({title: 'Ubah Data', key: 'edit'})
                //     if(perm[i].jenis_otoritas == 'Hapus Pelanggan') this.config.permission.push({title: 'Hapus Data', key: 'hapus'})
                //     if(perm[i].jenis_otoritas == 'Export pdf') this.config.permission.push({title: 'Export pdf', key: 'pdf'})
                //     if(perm[i].jenis_otoritas == 'Export xlsx') this.config.permission.push({title: 'Export xlsx', key: 'xlsx'})
                // }
                store().$patch((state) => {
                    state.items = data
                    state.state = this.config
                })
            } else this.$router.push('/')
        }
    },
    beforeMount() {
        store().resetState()
    },
    async mounted() {
        this.get()
    }
}
</script>