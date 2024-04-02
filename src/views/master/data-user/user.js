import api from '@/utils/api'
import {store} from '@/utils/store'
import alert from '@/utils/alert'
import router from '@/router'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    
    async user (param) {
        store().loading = true
        let head = await api.getData('/user')
        let detail = await api.getData('/user_otoritas')
        let data = []
        let newData = []
            for (let i = 0; i < head.length; i++) {
                        newData.push({
                            title: 'Data Barang',
                            key: 'data_barang',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Barang') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Barang').status,
                            active: false,
                            item: [
                                {title: 'Tambah Barang Baru', key: 'tambah_barang_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head[i].username).status},
                                {title: 'Ubah Barang', key: 'ubah_barang', value: detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head[i].username).status},
                                {title: 'Hapus Barang', key: 'hapus_barang', value: detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Data Pelanggan',
                            key: 'data_pelanggan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Pelanggan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Pelanggan').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pelanggan Baru', key: 'tambah_pelanggan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head[i].username).status},
                                {title: 'Ubah Pelanggan', key: 'ubah_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head[i].username).status},
                                {title: 'Hapus Pelanggan', key: 'hapus_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Data Supplier',
                            key: 'data_supplier',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Supplier') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data Supplier').status,
                        },
                        {
                            title: 'Data User',
                            key: 'data_user',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data User') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Data User').status,
                        },
                        {
                            title: 'Pembelian',
                            key: 'pembelian',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pembelian') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pembelian').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pembelian Baru', key: 'tambah_pembelian_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head[i].username).status},
                                {title: 'Batal Pembelian', key: 'batal_pembelian', value: detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head[i].username).status},
                                {title: 'Persentase', key: 'persentase', value: detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head[i].username) != undefined ? detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head[i].username).status : 'false'},
                            ]
                        },
                        {
                            title: 'Produksi',
                            key: 'produksi',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Produksi') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Produksi').status,
                            active: false,
                            item: [
                                {title: 'Tambah Produksi Baru', key: 'tambah_produksi_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head[i].username).status},
                                {title: 'Batal Produksi', key: 'batal_produksi', value: detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Penjualan',
                            key: 'penjualan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Penjualan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Penjualan').status,
                            active: false,
                            item: [
                                {title: 'Tambah Penjualan Baru', key: 'tambah_penjualan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head[i].username).status},
                                {title: 'Batal Penjualan', key: 'batal_penjualan', value: detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head[i].username).status},
                                {title: 'Status Penjualan', key: 'status_penjualan', value: detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Pengiriman',
                            key: 'pengiriman',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengiriman') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengiriman').status,
                            active: false,
                            item: [
                                {title: 'Tambah Pengiriman Baru', key: 'tambah_pengiriman_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head[i].username).status},
                                {title: 'Cetak Surat Jalan', key: 'cetak_surat_jalan', value: detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head[i].username).status},
                                {title: 'Cetak DO', key: 'cetak_do', value: detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head[i].username).status},
                                {title: 'Batal Pengiriman', key: 'batal_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head[i].username).status},
                                {title: 'Alamat Bongkar', key: 'alamat_bongkar', value: detail.find(it => it.jenis_otoritas == 'Alamat Bongkar' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Alamat Bongkar' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Laporan',
                            key: 'laporan',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Laporan') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Laporan').status,
                            active: false,
                            item: [
                                {title: 'Laporan Stok Barang', key: 'laporan_stok_barang', value: detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head[i].username).status},
                                {title: 'Laporan Pembelian', key: 'laporan_pembelian', value: detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head[i].username).status},
                                {title: 'Laporan Penjualan', key: 'laporan_penjualan', value: detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head[i].username).status},
                                {title: 'Laporan Pengiriman', key: 'laporan_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head[i].username).status},
                                {title: 'Laporan Detail Pengeluaran', key: 'laporan_bc', value: detail.find(it => it.jenis_otoritas == 'Laporan Detail Pengeluaran' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Detail Pengeluaran' && it.username == head[i].username).status},
                                {title: 'Laporan Log User', key: 'laporan_log_user', value: detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head[i].username).status},
                            ]
                        },
                        {
                            title: 'Pengaturan Umum',
                            key: 'pengaturan_umum',
                            username: head[i].username,
                            value: detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengaturan Umum') == undefined ? 'false' : detail.find(it => it.username == head[i].username && it.jenis_otoritas == 'Pengaturan Umum').status,
                            active: false,
                            item: [
                                {title: 'Export pdf', key: 'pdf', value: detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head[i].username).status},
                                {title: 'Export xlsx', key: 'xlsx', value: detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head[i].username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head[i].username).status},
                            ]
                        })
        }
        store().loading = false
        return head
    },
    beforeCreate() {
        let newData = []
        newData.push({
            title: 'Data Barang',
            key: 'data_barang',
            username: '',
            value: false,
            active: false,
            item: [
                {title: 'Tambah Barang Baru', key: 'tambah_barang_baru', value: false},
                {title: 'Ubah Barang', key: 'ubah_barang', value: false},
                {title: 'Hapus Barang', key: 'hapus_barang', value: false},
            ]
        },
        {
            title: 'Data Pelanggan',
            key: 'data_pelanggan',
            username: '',
            value: false,
            active: false,
            item: [
                {title: 'Tambah Pelanggan Baru', key: 'tambah_pelanggan_baru', value: false},
                {title: 'Ubah Pelanggan', key: 'ubah_pelanggan', value: false},
                {title: 'Hapus Pelanggan', key: 'hapus_pelanggan', value: false},
            ]
        },
        {
            title: 'Data Supplier',
            key: 'data_supplier',
            username: false,
            value: false,
        },
        {
            title: 'Data User',
            key: 'data_user',
            username: false,
            value: false,
        },
        {
            title: 'Pembelian',
            key: 'pembelian',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Tambah Pembelian Baru', key: 'tambah_pembelian_baru', value: false},
                {title: 'Batal Pembelian', key: 'batal_pembelian', value: false},
                {title: 'Persentase', key: 'persentase', value: false},
            ]
        },
        {
            title: 'Produksi',
            key: 'produksi',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Tambah Produksi Baru', key: 'tambah_produksi_baru', value: false},
                {title: 'Batal Produksi', key: 'batal_produksi', value: false},
            ]
        },
        {
            title: 'Penjualan',
            key: 'penjualan',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Tambah Penjualan Baru', key: 'tambah_penjualan_baru', value: false},
                {title: 'Batal Penjualan', key: 'batal_penjualan', value: false},
                {title: 'Status Penjualan', key: 'status_penjualan', value: false},
            ]
        },
        {
            title: 'Pengiriman',
            key: 'pengiriman',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Tambah Pengiriman Baru', key: 'tambah_pengiriman_baru', value: false},
                {title: 'Cetak Surat Jalan', key: 'cetak_surat_jalan', value: false},
                {title: 'Cetak DO', key: 'cetak_do', value: false},
                {title: 'Batal Pengiriman', key: 'batal_pengiriman', value: false},
                {title: 'Alamat Bongkar', key: 'alamat_bongkar', value: false},
            ]
        },
        {
            title: 'Laporan',
            key: 'laporan',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Laporan Stok Barang', key: 'laporan_stok_barang', value: false},
                {title: 'Laporan Pembelian', key: 'laporan_pembelian', value: false},
                {title: 'Laporan Penjualan', key: 'laporan_penjualan', value: false},
                {title: 'Laporan Pengiriman', key: 'laporan_pengiriman', value: false},
                {title: 'Laporan Detail Pengeluaran', key: 'laporan_bc', value: false},
                {title: 'Laporan Log User', key: 'laporan_log_user', value: false},
            ]
        },
        {
            title: 'Pengaturan Umum',
            key: 'pengaturan_umum',
            username: false,
            value: false,
            active: false,
            item: [
                {title: 'Export pdf', key: 'pdf', value: false},
                {title: 'Export xlsx', key: 'xlsx', value: false},
            ]
        })
        return newData
    },
    async getDetail(head) {
        let detail = await api.getData('user_otoritas', {username: head.username})
        let res = [
            {
                title: 'Data Barang',
                key: 'data_barang',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Barang') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Barang').status,
                active: false,
                item: [
                    {title: 'Tambah Barang Baru', key: 'tambah_barang_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Barang Baru' && it.username == head.username).status},
                    {title: 'Ubah Barang', key: 'ubah_barang', value: detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Barang' && it.username == head.username).status},
                    {title: 'Hapus Barang', key: 'hapus_barang', value: detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Barang' && it.username == head.username).status},
                ]
            },
            {
                title: 'Data Pelanggan',
                key: 'data_pelanggan',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Pelanggan') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Pelanggan').status,
                active: false,
                item: [
                    {title: 'Tambah Pelanggan Baru', key: 'tambah_pelanggan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pelanggan Baru' && it.username == head.username).status},
                    {title: 'Ubah Pelanggan', key: 'ubah_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Ubah Pelanggan' && it.username == head.username).status},
                    {title: 'Hapus Pelanggan', key: 'hapus_pelanggan', value: detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Hapus Pelanggan' && it.username == head.username).status},
                ]
            },
            {
                title: 'Data Supplier',
                key: 'data_supplier',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Supplier') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data Supplier').status,
            },
            {
                title: 'Data User',
                key: 'data_user',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data User') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Data User').status,
            },
            {
                title: 'Pembelian',
                key: 'pembelian',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pembelian') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pembelian').status,
                active: false,
                item: [
                    {title: 'Tambah Pembelian Baru', key: 'tambah_pembelian_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pembelian Baru' && it.username == head.username).status},
                    {title: 'Batal Pembelian', key: 'batal_pembelian', value: detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pembelian' && it.username == head.username).status},
                    {title: 'Persentase', key: 'persentase', value: detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head.username) != undefined ? detail.find(it => it.jenis_otoritas == 'Persentase' && it.username == head.username).status : 'false'},
                ]
            },
            {
                title: 'Produksi',
                key: 'produksi',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Produksi') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Produksi').status,
                active: false,
                item: [
                    {title: 'Tambah Produksi Baru', key: 'tambah_produksi_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Produksi Baru' && it.username == head.username).status},
                    {title: 'Batal Produksi', key: 'batal_produksi', value: detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Produksi' && it.username == head.username).status},
                ]
            },
            {
                title: 'Penjualan',
                key: 'penjualan',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Penjualan') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Penjualan').status,
                active: false,
                item: [
                    {title: 'Tambah Penjualan Baru', key: 'tambah_penjualan_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Penjualan Baru' && it.username == head.username).status},
                    {title: 'Batal Penjualan', key: 'batal_penjualan', value: detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Penjualan' && it.username == head.username).status},
                    {title: 'Status Penjualan', key: 'status_penjualan', value: detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Status Penjualan' && it.username == head.username).status},
                ]
            },
            {
                title: 'Pengiriman',
                key: 'pengiriman',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pengiriman') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pengiriman').status,
                active: false,
                item: [
                    {title: 'Tambah Pengiriman Baru', key: 'tambah_pengiriman_baru', value: detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Tambah Pengiriman Baru' && it.username == head.username).status},
                    {title: 'Cetak Surat Jalan', key: 'cetak_surat_jalan', value: detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak Surat Jalan' && it.username == head.username).status},
                    {title: 'Cetak DO', key: 'cetak_do', value: detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Cetak DO' && it.username == head.username).status},
                    {title: 'Batal Pengiriman', key: 'batal_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Batal Pengiriman' && it.username == head.username).status},
                    {title: 'Alamat Bongkar', key: 'alamat_bongkar', value: detail.find(it => it.jenis_otoritas == 'Alamat Bongkar' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Alamat Bongkar' && it.username == head.username).status},
                ]
            },
            {
                title: 'Laporan',
                key: 'laporan',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Laporan') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Laporan').status,
                active: false,
                item: [
                    {title: 'Laporan Stok Barang', key: 'laporan_stok_barang', value: detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Stok Barang' && it.username == head.username).status},
                    {title: 'Laporan Pembelian', key: 'laporan_pembelian', value: detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Pembelian' && it.username == head.username).status},
                    {title: 'Laporan Penjualan', key: 'laporan_penjualan', value: detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Penjualan' && it.username == head.username).status},
                    {title: 'Laporan Pengiriman', key: 'laporan_pengiriman', value: detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Pengiriman' && it.username == head.username).status},
                    {title: 'Laporan Detail Pengeluaran', key: 'laporan_bc', value: detail.find(it => it.jenis_otoritas == 'Laporan Detail Pengeluaran' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Detail Pengeluaran' && it.username == head.username).status},
                    {title: 'Laporan Log User', key: 'laporan_log_user', value: detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Laporan Log User' && it.username == head.username).status},
                ]
            },
            {
                title: 'Pengaturan Umum',
                key: 'pengaturan_umum',
                username: head.username,
                value: detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pengaturan Umum') == undefined ? 'false' : detail.find(it => it.username == head.username && it.jenis_otoritas == 'Pengaturan Umum').status,
                active: false,
                item: [
                    {title: 'Export pdf', key: 'pdf', value: detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export pdf' && it.username == head.username).status},
                    {title: 'Export xlsx', key: 'xlsx', value: detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head.username) == undefined ? 'false' : detail.find(it => it.jenis_otoritas == 'Export xlsx' && it.username == head.username).status},
                ]
            }
        ]
        return res
    },
    create(input, fl) {
        store().loading = true
        let detail = []
        for (let i = 0; i < fl.length; i++) {
            detail.push({
                username: input.username,
                jenis_otoritas: fl[i].title,
                status: input[fl[i].title] != undefined ? String(input[fl[i].title]) : 'false'
            })
            if(fl[i].item) {
                for (let j = 0; j < fl[i].item.length; j++) {
                    detail.push({
                        username: input.username,
                        jenis_otoritas: fl[i].item[j].title,
                        status: input[fl[i].item[j].title] != undefined ? String(input[fl[i].item[j].title]) : 'false'
                    })
                }
            }
        }
        let data = {
            username: input.username,
            password: input.password,
            otoritas: JSON.stringify(detail)
        }
        api.create('/user', data).then(res => {
            if(res.status == 200) {
				alert.success(null, res.data)
			} else alert.success(null, 'Data Berhasil Disimpan')
            router.go()
        })
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
        setTimeout(() => {
			store().loading = false
		}, 2500)
    },
    update(input, fl) {
        store().loading = true
        let master = store().single_detail
        let detail = []
        for (let i = 0; i < fl.length; i++) {
            detail.push({
                username: master.username,
                jenis_otoritas: fl[i].title,
                status: input[fl[i].title] != undefined ? String(input[fl[i].title]) : (fl[i].value != undefined ? String(fl[i].value) : 'false')
            })
            if(fl[i].item) {
                for (let j = 0; j < fl[i].item.length; j++) {
                    detail.push({
                        username: master.username,
                        jenis_otoritas: fl[i].item[j].title,
                        status: input[fl[i].item[j].title] != undefined ? String(input[fl[i].item[j].title]) : (fl[i].item[j].value != undefined ? String(fl[i].item[j].value) : 'false')
                    })
                }
            }
        }
        let data = {
            username: master.username,
            password: input.password,
            otoritas: JSON.stringify(detail)
        }
        api.update('/user', data).then(res => {
            if(res.status == 200) {
				alert.success(null, res.data)
			} else alert.success(null, 'Data Berhasil Diupdate')
            router.go()
        })
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
        setTimeout(() => {
			store().loading = false
		}, 2500)
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.username).then((result) => {
            if(result.isConfirmed) {
                store().loading = true
                api.delete('user', {username: data.username}).then(res => {
                    if(res.status == 200) {
                        alert.success(null, res.data)
                    } else alert.success(null, 'Data Berhasil Dihapus')
                    router.go()
                }).catch((error) => {
                    if(error.response.status == 500) {
                        alert.failed(null, error.response.data)
                    } else alert.failed(null)
                })
                setTimeout(() => {
                    store().loading = false
                }, 2500)
            }
        })
    },
}