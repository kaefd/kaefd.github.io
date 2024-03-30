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
			item.status_ = item.status == "open" ? "Menunggu" : "Selesai";
		});
		
		store().loading = false
		return head;
	},
	async getDetail(head) {
		let param = {
			no_penjualan: head.no_penjualan,
		};
		let detail = await api.getData('/pengiriman_detail/no_penjualan', param)
		let detail_pjl = await api.getData('/penjualan_detail/no_penjualan', param)
		let plg = await api.getData('pelanggan')
		let bongkar = await api.getData('alamat_bongkar')
		let data = []
		let kuota = detail_pjl.map(it => it.jumlah)
		let pgm = detail_pjl.map(it => it.jumlah_terkirim)
		
		for (let i = 0; i < detail.length; i++) {
			let h = await api.getData(`/pengiriman_head/no_pengiriman?no_pengiriman=${detail[i].no_pengiriman}`)
			data.push({
				no_pengiriman: detail[i].no_pengiriman,
				tgl_pengiriman: h[0].tgl_pengiriman,
				supir: h[0].supir,
				pelanggan: plg.find(p => p.kode_pelanggan == h[0].kode_pelanggan).nama,
				tujuan_bongkar: bongkar.find(p => p.kode_pelanggan == h[0].kode_alamat_bongkar).nama,
				no_polisi: h[0].no_polisi,
				kode_barang: detail[i].kode_barang,
				jumlah: detail[i].jumlah,
				blmterkirim: kuota.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - pgm.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
			})
		}
		return data
	}
	// async kodegroup() {
	// 	let array = await api.getData("group_barang");
	// 	let head = Array.from(new Set(array.map((obj) => obj.kode_group))).map(
	// 		(kode_group) => {
	// 			return array.find((obj) => obj.kode_group === kode_group);
	// 		}
	// 	);
	// 	return head;
	// },
	// async detailPgm (no_pjl) {
	// 	const param = { no_penjualan: no_pjl }
	// 	let detail = await api.getData('/pengiriman_detail/no_penjualan', param)
	// 	let data = []
	// 	for (let i = 0; i < detail.length; i++) {
	// 		let h = await api.getData(`/pengiriman_head/no_pengiriman?no_pengiriman=${detail[i].no_pengiriman}`)
	// 		data.push({
	// 			head: {
	// 				no_pengiriman: detail[i].no_pengiriman,
	// 				tgl_pengiriman: h[0].tgl_pengiriman,
	// 				supir: h[0].supir,
	// 				no_polisi: h[0].no_polisi,
	// 			}
	// 		})
	// 	}
	// 	return data
	// },
	// async content_detail (no_pgm) {
	// 	let param = {
	// 		no_pengiriman: no_pgm
	// 	}
	// 	const h = await api.getData('pengiriman_head/no_pengiriman', param)
	// 	let d = await api.getData('pengiriman_detail/no_pengiriman', param)
	// 	let data = []
	// 	for (let i = 0; i < d.length; i++) {
	// 		let pjl = await api.getData('penjualan_head/no_penjualan', {no_penjualan: d[i].no_penjualan})
	// 		data.push({
	// 			no_penjualan: d[i].no_penjualan,
	// 			tipe_dokumen: pjl[0].tipe_dokumen,
	// 			no_dokumen: pjl[0].no_dokumen,
	// 			kode_group: d[i].kode_group,
	// 			kode_barang: d[i].kode_barang,
	// 			nama_barang: d[i].nama_barang,
	// 			jumlah: d[i].jumlah,
	// 			satuan: d[i].satuan,
	// 			jumlah_konversi: d[i].jumlah_konversi,
	// 			satuan_konversi: d[i].satuan_konversi,
	// 		})
	// 	}
	// 	return {
	// 		head: h,
	// 		detail: data
	// 	}
	// },
	// filterData(input, fl) {
	// 	let data = {};
	// 	for (let i = 0; i < input.length; i++) {
	// 		for (let j = 0; j < fl.length; j++) {
	// 			if (input[i].title == fl[j].key) data[fl[j].key] = input[i].value;
	// 			if (fl[j].item) {
	// 				for (let k = 0; k < fl[j].item.length; k++) {
	// 					if (input[i].title == fl[j].item[k].title) {
	// 						data[fl[j].item[k].key] = input[i].value;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 	return data;
	// },
	// async filtered(input) {
	// 	const periode = Object.fromEntries(
	// 		Object.entries(input).filter(
	// 			([key, value]) => value !== false && value !== true
	// 		)
	// 	);
		
	// 	let x = "";

	// 	if (periode.tgl_awal != undefined) {
	// 		store().$patch((state) => {
	// 			state.periode[0] = periode.tgl_awal;
	// 		});
	// 	}
	// 	if (periode.tgl_akhir != undefined) {
	// 		store().$patch((state) => {
	// 			state.periode[1] = periode.tgl_akhir;
	// 		});
	// 	}

	// 	let p = {
	// 		tgl_awal: store().periode[0],
	// 		tgl_akhir: store().periode[1],
	// 	};
	// 	await this.pengeluaran(p).then((response) => {
	// 		x = response;
	// 	});
	// 	// const filterData = x.filter((it) => {
	// 	// 	let a = filtered.some((k) => it.head.tipe_dokumen.includes(k.key));
	// 	// 	let b = "";
	// 	// 	let all = filtered.find((f) => f.key == "semua");
	// 	// 	if (all == undefined) {
	// 	// 		b = filtered.some((k) => it.head.status.includes(k.title));
	// 	// 		return a && b;
	// 	// 	} else return a;
	// 	// });
	// 	store().$patch((state) => {
	// 		state.items = x;
	// 	});
    //     console.log(x);
    //     return x
	// },
};
