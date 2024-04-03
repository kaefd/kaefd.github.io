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
			let no_urut = [];
			for (let i = 0; i < dtl.length; i++) {
				kode.push(dtl[i].kode_barang);
				nama.push(dtl[i].nama_barang);
				no_urut.push(dtl[i].no_urut);
				hsc.push(dtl[i].hs_code);
				satuan.push(dtl[i].satuan);
				jumlah.push(dtl[i].jumlah);
			}
			item.pelanggan = pelanggan.filter(
				(it) => it.kode_pelanggan == item.kode_pelanggan
			)[0]?.nama;
			item.kode_barang = [...new Set(kode)].toString();
			item.nama_barang = [...new Set(nama)].toString();
			item.no_urut = [...new Set(no_urut)]
			item.hs_code = [...new Set(hsc)].toString();
			item.satuan = [...new Set(satuan)].toString();
			item.jumlah = jumlah.reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			}, 0);
			item.status_ = item.status == "open" ? "Menunggu" : "Selesai";
		});
		let nopen = [...new Set(head.map(n => n.no_dokumen))]
		let data = []
		for (let i = 0; i < nopen.length; i++) {
			data.push({
				no_penjualan: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.no_penjualan
				}).filter(n => n != undefined),
				tgl_penjualan: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.tgl_penjualan
				}).filter(n => n != undefined),
				tipe_dokumen: [...new Set(head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.tipe_dokumen
				}).filter(n => n != undefined))].toString(),
				no_dokumen: nopen[i],
				kode_group: [...new Set(head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.kode_group
				}).filter(n => n != undefined))].toString(),
				pelanggan: head.find(it => it.no_dokumen == nopen[i]).pelanggan,
				kode_barang: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.kode_barang
				}).filter(n => n != undefined).toString(),
				nama_barang: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.nama_barang
				}).filter(n => n != undefined).toString(),
				no_urut: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.no_urut
				}).filter(n => n != undefined),
				hs_code: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.hs_code
				}).filter(n => n != undefined).toString(),
				satuan: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.satuan
				}).filter(n => n != undefined).toString(),
				jumlah: head.map(it => {
					if(it.no_dokumen == nopen[i]) return it.jumlah
				}).filter(n => n != undefined).reduce((accumulator, currentValue) => {
					return accumulator + currentValue;
				}, 0),
			})
			
		}
		store().loading = false
		return data;
	},
	async getDetail(head) {
		let data = []
		for (let i = 0; i < head.no_penjualan.length; i++) {
			let param = {
				no_penjualan: head.no_penjualan[i]
			}
			let urut = head.no_urut[i]
			let item = await api.getData('penjualan_detail/no_penjualan', param)
			for (let k = 0; k < urut.length; k++) {
				data.push({
					no_penjualan: item[k].no_penjualan,
					no_urut: item[k].no_urut,
					tgl_penjualan: head.tgl_penjualan[i],
					tipe_dokumen: head.tipe_dokumen,
					no_dokumen: head.no_dokumen,
					kode_group: head.kode_group,
					kode_barang: item[k].kode_barang,
					nama_barang: item[k].nama_barang,
					jumlah: item[k].jumlah,
					jumlah_terkirim: item[k].jumlah_terkirim,
					blmterkirim: item[k].jumlah - item[k].jumlah_terkirim,
				})
			}
		}
		return data
	},
	async getDetailPJL(h) {
		let param = {
			no_penjualan: h.no_penjualan,
			no_urut: h.no_urut,
		};
		let detail = await api.getData('pengiriman_detail/no_penjualan', param)
		let pjl = await api.getData('penjualan_head/no_penjualan', {no_penjualan: h.no_penjualan})
		let pelanggan = await api.getData('pelanggan')
		let bongkar = await api.getData('alamat_bongkar')
		let data = []

		for (let i = 0; i < detail.length; i++) {
			let head = await api.getData('pengiriman_head/no_pengiriman', {no_pengiriman: detail[i].no_pengiriman})
			data.push({
				no_pengiriman: head[0].no_pengiriman,
				no_penjualan: detail[i].no_penjualan,
				tipe_dokumen: pjl.find(p => p.no_penjualan == detail[i].no_penjualan).tipe_dokumen,
				no_dokumen: pjl.find(p => p.no_penjualan == detail[i].no_penjualan).no_dokumen,
				kode_group: pjl.find(p => p.no_penjualan == detail[i].no_penjualan).kode_group,
				no_urut: h.no_urut,
				tgl_pengiriman: head[0].no_pengiriman,
				supir: head[0].supir,
				no_polisi: head[0].no_polisi,
				pelanggan: pelanggan.find(p => p.kode_pelanggan == head[0].kode_pelanggan).nama,
				tujuan_bongkar: bongkar.find(p => p.kode_pelanggan == head[0].kode_alamat_bongkar).nama,
				kode_barang: detail[i].kode_barang,
				nama_barang: detail[i].nama_barang,
				satuan: detail[i].satuan,
				satuan_konversi: detail[i].satuan_konversi,
				jumlah: detail[i].jumlah,
				jumlah_konversi: detail[i].jumlah_konversi,
			})
		}
		return data
	},
};
