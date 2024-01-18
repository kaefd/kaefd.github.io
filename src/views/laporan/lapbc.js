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
		store().loader("on");
		let head = await api.getData("/penjualan_head", parameters);
		let detail = await api.getData("/penjualan_detail", parameters);
		let pelanggan = await api.getData("/pelanggan");

		let data = [];
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
			)[0].nama;
			item.kode_barang = [...new Set(kode)].toString();
			item.nama_barang = [...new Set(nama)].toString();
			item.hs_code = [...new Set(hsc)].toString();
			item.satuan = [...new Set(satuan)].toString();
			item.jumlah = jumlah.reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			}, 0);
			// item.status = item.status == "open" ? "menunggu" : "selesai";
		});
		detail.map((item) => (item.total_harga = item.harga_jual * item.jumlah));
		for (let i = 0; i < head.length; i++) {
			data.push({
				head: head[i],
				detail: detail.filter(
					(item) => head[i].no_penjualan == item.no_penjualan
				),
			});
		}
		let field = fl || store().state.fields[0];
		let newdata = data.sort((a, b) =>
			b.head[field.key].localeCompare(a.head[field.key])
		);
		store().$patch((state) => {
			state.items = newdata;
		});
		store().loader("off");
		return newdata;
	},
	async kodegroup() {
		let array = await api.getData("group_barang");
		let head = Array.from(new Set(array.map((obj) => obj.kode_group))).map(
			(kode_group) => {
				return array.find((obj) => obj.kode_group === kode_group);
			}
		);
		return head;
	},
	filterData(input, fl) {
		let data = {};
		for (let i = 0; i < input.length; i++) {
			for (let j = 0; j < fl.length; j++) {
				if (input[i].title == fl[j].key) data[fl[j].key] = input[i].value;
				if (fl[j].item) {
					for (let k = 0; k < fl[j].item.length; k++) {
						if (input[i].title == fl[j].item[k].title) {
							data[fl[j].item[k].key] = input[i].value;
						}
					}
				}
			}
		}
		return data;
	},
	async filtered(input) {
		const periode = Object.fromEntries(
			Object.entries(input).filter(
				([key, value]) => value !== false && value !== true
			)
		);
		
		let x = "";

		if (periode.tgl_awal != undefined) {
			store().$patch((state) => {
				state.periode[0] = periode.tgl_awal;
			});
		}
		if (periode.tgl_akhir != undefined) {
			store().$patch((state) => {
				state.periode[1] = periode.tgl_akhir;
			});
		}

		let p = {
			tgl_awal: store().periode[0],
			tgl_akhir: store().periode[1],
		};
		await this.pengeluaran(p).then((response) => {
			x = response;
		});
		// const filterData = x.filter((it) => {
		// 	let a = filtered.some((k) => it.head.tipe_dokumen.includes(k.key));
		// 	let b = "";
		// 	let all = filtered.find((f) => f.key == "semua");
		// 	if (all == undefined) {
		// 		b = filtered.some((k) => it.head.status.includes(k.title));
		// 		return a && b;
		// 	} else return a;
		// });
		store().$patch((state) => {
			state.items = x;
		});
        console.log(x);
        return x
	},
	create(data) {
		store().loader("on");
		let detail = store().detail;
		let newDetail = [];
		for (let i = 0; i < detail.length; i++) {
			newDetail.push({
				kode_barang: detail[i].kode_barang,
				jumlah: detail[i].jumlah,
				harga_jual: detail[i].harga_jual,
			});
		}
		let json = JSON.stringify(newDetail);
		let payload = {
			tgl_penjualan: data.tgl_penjualan,
			tipe_dokumen: data.tipe_dokumen,
			no_dokumen: data.no_dokumen,
			tgl_dokumen: data.tgl_dokumen,
			kode_pelanggan: data.pelanggan.kode_pelanggan,
			kode_group: data.kode_group.kode_group,
			penjualan_detail: json,
		};
		let result = api
			.create("/penjualan_head", payload)
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
				} else alert.success(null, "Data Berhasil Disimpan");
				store().resetState();
				this.pengeluaran();
				return "success";
			})
			.catch((error) => {
				if (error.response.status == 500) {
					alert.failed(null, error.response.data);
				} else alert.failed(null);
				return "failed";
			});
		setTimeout(() => {
			store().loader("off");
		}, 2500);
		return result;
	},
	delete(data) {
		alert
			.confirm(
				"Apakah anda yakin ?",
				"Anda akan membatalkan " + data.no_penjualan
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loader("on");
					api
						.delete("penjualan_head", { no_penjualan: data.no_penjualan })
						.then((res) => {
							if (res.status == 200) {
								alert.success(null, res.data);
							} else alert.success(null, "Data Berhasil Dibatalkan");
							this.pengeluaran();
						})
						.catch((error) => {
							if (error.response.status == 500) {
								alert.failed(null, error.response.data);
							} else alert.failed(null);
						});
					setTimeout(() => {
						store().loader("off");
					}, 2500);
				}
			});
	},
};
