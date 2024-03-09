import api from "@/utils/api";
import alert from "@/utils/alert";
import { store } from "@/utils/store";
export default {
	async pengeluaran(param, fl) {
		let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loading = true
		let head = await api.getData("/penjualan_head", parameters);
		let detail = await api.getData("/penjualan_detail", parameters);
		let pelanggan = await api.getData("/pelanggan");

		head.map((item) => {
			let dtl = detail.filter((it) => it.no_penjualan == item.no_penjualan);
			let kode = [];
			let nama = [];
			let hsc = [];
			let satuan = [];
			let jumlah = [];
			for (let i = 0; i < dtl.length; i++) {
				kode.push(dtl[i].kode_barang);
				nama.push(dtl[i].nama_barang);
				hsc.push(dtl[i].hs_code);
				satuan.push(dtl[i].satuan);
				jumlah.push(dtl[i].jumlah);
			}
			item.pelanggan = pelanggan.filter(
				(it) => it.kode_pelanggan == item.kode_pelanggan
			)[0]?.nama;
			item.kode_barang = [...new Set(kode)].toString();
			item.nama_barang = [...new Set(nama)].toString();
			item.hs_code = [...new Set(hsc)].toString();
			item.satuan = [...new Set(satuan)].toString();
			item.jumlah = jumlah.reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			}, 0);
		});
		
		store().loading = false
		return head;
	},
	async getDetail(head) {
		let param = {
			no_penjualan: head.no_penjualan,
		};
		const data = await api.getData("penjualan_detail/no_penjualan", param);
		data.map(item => item.total_harga = head.total_penjualan)
        return data
	},
}