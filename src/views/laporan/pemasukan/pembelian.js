import api from "@/utils/api";
import filter from "@/utils/filter";
import { store } from "@/utils/store";

export default {
    async pembelian(param, fl) {
		let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loading = true;
		let head = await api.getData("/pembelian_head", parameters);
		let detail = await api.getData("/pembelian_detail", parameters);
		let supplier = await api.getData("/supplier");
		head.map((item) => {
			let sp = supplier.filter((it) => it.kode_supplier == item.kode_supplier);
			let dtl = detail.filter((it) => it.no_pembelian == item.no_pembelian);
			let kode = [];
			let nama = [];
			let hsc = [];
			for (let i = 0; i < dtl.length; i++) {
				kode.push(dtl[i].kode_barang);
				nama.push(dtl[i].nama_barang);
				hsc.push(dtl[i].hs_code);
			}
			item.supplier = sp != "" ? sp[0].nama : item.kode_supplier;
			item.kode_barang = [...new Set(kode)].toString();
			item.nama_barang = [...new Set(nama)].toString();
			item.hs_code = [...new Set(hsc)].toString();
			item.rupiah = item.total_nilai * item.kurs;
		});
		const nw_ft = store().filter
		let filteredData = nw_ft ? filter.ft_object(nw_ft, head) : head
		store().loading = false;
		return filteredData;
	},
	async getDetail(head) {
		let param = {
			no_pembelian: head.no_pembelian,
		};
		const data = await api.getData("pembelian_detail/no_pembelian", param)
		data.map(item => item.total_nilai = head.total_nilai)
        return data
	},
}