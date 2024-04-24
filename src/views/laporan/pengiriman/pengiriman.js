import api from "@/utils/api"
import { store } from "@/utils/store"
import alert from "@/utils/alert";
import router from "@/router";
import filter from "@/utils/filter";

export default {
	async pengiriman(param, fl) {
		let parameters = "";
		if (store().param) parameters = store().param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loading = true;
		let head = await api.getData("/pengiriman_head", parameters);
		let detail = await api.getData("/pengiriman_detail", parameters);
		let bongkar = await api.getData("/alamat_bongkar");
		let pelanggan = await api.getData("/pelanggan");
		head.map((item) => {
			(item.tujuan_bongkar = bongkar.filter(
				(it) => it.kode_pelanggan == item.kode_alamat_bongkar
			)[0].nama),
				(item.alamat = pelanggan.filter(
					(p) => p.kode_pelanggan == item.kode_pelanggan
				)[0].alamat);
			(item.kabupaten = bongkar.filter(
				(it) => it.kode_pelanggan == item.kode_alamat_bongkar
			)[0].kabupaten),
				(item.pelanggan = pelanggan.filter(
					(p) => p.kode_pelanggan == item.kode_pelanggan
				)[0].nama),
			item.kode_barang = [...new Set(detail.filter(d => d.no_pengiriman == item.no_pengiriman).map(dm => dm.kode_barang))].toString()
			item.jumlah = detail.filter(d => d.no_pengiriman == item.no_pengiriman).map(dm => dm.jumlah).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
		});
		const nw_ft = store().filter
        let filteredData = nw_ft ? filter.ft_object(nw_ft, head) : head
		store().loading = false;
		return filteredData;
	},
	async getDetail(head) {
		let param = {
			no_pengiriman: head.no_pengiriman,
		};
		const data = await api.getData("pengiriman_detail/no_pengiriman", param);
        let res = []
        for (let i = 0; i < data.length; i++) {
            let pjl = await api.getData('penjualan_head/no_penjualan', {no_penjualan: data[i].no_penjualan})
            res.push({
                no_penjualan: data[i].no_penjualan,
                tipe_dokumen: pjl[0].tipe_dokumen,
                no_dokumen: pjl[0].no_dokumen,
                kode_group: data[i].kode_group,
                kode_barang: data[i].kode_barang,
                nama_barang: data[i].nama_barang,
                jumlah: data[i].jumlah,
                satuan: data[i].satuan,
                jumlah_konversi: data[i].jumlah_konversi,
                satuan_konversi: data[i].satuan_konversi,
            })
            
        }
		
        return res
	}
}