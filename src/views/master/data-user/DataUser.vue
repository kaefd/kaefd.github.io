<template>
    <base-page :config="config">
        <template #detail-page="item">
            <!-- <div class="h-full w-1/4 bg-red-500"></div> -->
            <DetailUser :h_field="config.fields.head" :h_items="item.h_items" :d_items="item.d_items"></DetailUser>
        </template>
    </base-page>
</template>
<script setup>
import otoritas from '@/router/otoritas';
import DetailUser from './DetailUser.vue';
import user from './user'
import { store } from '@/utils/store'
</script>
<script>
export default {
    data() {
        return {
            active: undefined,
            model: '',
            config: {
                title: 'Data User',
                child: true,
                permission: {
                    create: true,
                    edit: true,
                    delete: true,
                    search: true,
                    select_column: false,
                    export: false,
                    filter: false,
                },
                fields: {
                    head: [
                        {title: 'username', key: 'username', type: 'text', column: false, dialog: true, show: true, read: {show: true, disabled: true}, edit: {show: true, disabled: true}, delete: {show: true, disabled: false}, sort: 'desc', rules: ['required']},
                        {title: 'password', key: 'password', type: 'password', column: false, dialog: true, show: false, read: {show: false, disabled: true}, edit: {show: true, disabled: false}, delete: {show: true, disabled: true}, sort: 'desc', rules: ['required', 'min 8']},
                    ],
                },
                menu: {
                    head: [
                        { title: 'Tambah User Baru', key: 'create' },
                        { title: 'Edit Data User', key: 'edit' },
                        { title: 'Hapus Data User', key: 'delete' },
                    ],
                },
            }
        }
    },
    methods: {
        async get () {
            let check = otoritas.check('Data User')
            if(!check) return this.$router.push('/')
                store().data.items = await user.user()
        },
    },
    beforeMount() {
        store().s_dialog = false
        store().resetState()
    },
    mounted() {
        store().init()
        this.get()
    }
}
</script>