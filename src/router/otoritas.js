import {store} from '@/utils/store';

const otoritas = JSON.parse(localStorage.getItem('otoritas'))
export default {
	check(value) {
		let result = otoritas.find((item) => item.jenis_otoritas == value)
			? true
			: false;
		return result;
	},
	groupCheck(o) {
		if (o == "Dashboard") return true;
		else if (o == "Master") {
			let data = otoritas.filter(
			    (item) =>
					item.jenis_otoritas == "Data Barang" ||
					item.jenis_otoritas == "Data Pelanggan" ||
					item.jenis_otoritas == "Data Supplier" ||
					item.jenis_otoritas == "Data Konversi Barang" ||
					item.jenis_otoritas == "Data User"
			);
			if (data != "") return true;
			else return false;
		} else if (o == "Transaksi") {
			let data = otoritas.filter(
			    (item) =>
                    item.jenis_otoritas == "Pembelian" ||
                    item.jenis_otoritas == "Produksi" ||
                    item.jenis_otoritas == "Penjualan" ||
                    item.jenis_otoritas == "Pengiriman"
			)
			if (data != "") return true;
			else return false;
		} else if (o == "Laporan") {
			let data = otoritas.filter(
			    (item) =>
                    item.jenis_otoritas == "Laporan" ||
                    item.jenis_otoritas == "Laporan Stok Barang" ||
                    item.jenis_otoritas == "Laporan Pembelian" ||
                    item.jenis_otoritas == "Laporan Pengeluaran" ||
                    item.jenis_otoritas == "Laporan Pengiriman" ||
                    item.jenis_otoritas == "Laporan Detail Pengeluaran" ||
                    item.jenis_otoritas == "Laporan Log User"
			)
			if (data != "") return true;
			else return false;
		} else if (o == "export") {
            let data = otoritas.filter(
			    (item) =>
                    item.jenis_otoritas == "Export pdf" ||
                    item.jenis_otoritas == "Export xlsx"
			)
			if (data != "") return true;
			else return false;
		}
	},
};