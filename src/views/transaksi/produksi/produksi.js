import api from "@/utils/api";
import alert from "@/utils/alert";
import { store } from "@/utils/store";
export default {
	async produksi(param, fl) {
		let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loader("on");
		let head = await api.getData("/produksi_head", parameters);
		let bahan = await api.getData("/produksi_detail_bahan", parameters);
		let barang = await api.getData("/produksi_detail_barang", parameters);
		let data = [];
		let a = [];
		for (let i = 0; i < head.length; i++) {
			let b = bahan.filter((item) => item.no_produksi == head[i].no_produksi);
			let c = barang.filter((item) => item.no_produksi == head[i].no_produksi);
			let kodebrg = [];
			let jml = [];
			for (let j = 0; j < c.length; j++) {
				kodebrg.push(c[j].kode_barang);
				jml.push(c[j].jumlah);
			}
			a.push({
				no_produksi: head[i].no_produksi,
				tgl_produksi: head[i].tgl_produksi,
				kode_group: head[i].kode_group,
				kode_bahan: b[0].kode_barang,
				jumlah_bahan: b[0].jumlah,
				kode_barang: [...new Set(kodebrg)].toString(),
				jumlah: jml.reduce(
					(accumulator, currentValue) => accumulator + currentValue,
					0
				),
			});
		}
		for (let i = 0; i < a.length; i++) {
			data.push({
				head: a[i],
				detail: barang.filter((item) => a[i].no_produksi == item.no_produksi),
			});
		}
		let field = fl || store().state.fields[0]
		let newdata = data.sort((a, b) => b.head[field.key].localeCompare(a.head[field.key]))
		store().$patch((state) => { state.items = newdata })
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
						if (input[i].title == fl[j].item[k]) {
							let n_fl = fl[j].item[k].replace("-", "");
							data[n_fl] = input[i].value;
						}
					}
				}
			}
		}
		return data;
	},
	async filtered(input) {
		const periode = Object.fromEntries(
			Object.entries(input).filter(([key, value]) => value !== false)
		);
		// const periode = [filtered.tgl_awal, filtered.tgl_akhir]
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
		await this.produksi(p).then((response) => (x = response));
		store().$patch((state) => {
			state.items = x;
		});
	},
	create(data) {
		store().loader('on');
		let detail = store().detail;
		let newDetail = [];
		for (let i = 0; i < detail.length; i++) {
			// let kode_konversi = detail[i].kode_konversi || "";
			// let jml_konversi = detail[i].kode_konversi || 0;
			newDetail.push({
				kode_barang: detail[i].kode_barang,
				jumlah: detail[i].jumlah,
				// kode_konversi: kode_konversi,
				// jumlah_konversi: jml_konversi,
			});
		}
		let json = JSON.stringify(newDetail);
		let payload = {
			tgl_produksi: data.tgl_produksi,
			kode_group: data.kode_group.kode_group,
			kode_bahan: data.kode_bahan.kode_barang,
			produksi_detail_barang: json,
		};
		let result = api
			.create("/produksi_head", payload)
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
				} else alert.success(null, "Data Berhasil Disimpan");
				store().resetState()
				this.produksi();
				return 'success'
			})
			.catch((error) => {
				if (error.response.status == 500) {
					alert.failed(null, error.response.data);
				} else alert.failed(null);
				return 'failed'
			})
			setTimeout(() => {
				store().loader('off')
			}, 2500)
			return result
	},
	delete(data) {
		alert
			.confirm("Apakah anda yakin ?", "Anda akan menghapus " + data.no_produksi)
			.then((result) => {
				if (result.isConfirmed) {
					store().loader('on');
					api
						.delete("produksi_head", { no_produksi: data.no_produksi })
						.then((res) => {
							if (res.status == 200) {
								alert.success(null, res.data);
							} else alert.success(null, "Data Berhasil Dibatalkan");
							this.produksi();
						})
						.catch((error) => {
							if (error.response.status == 500) {
								alert.failed(null, error.response.data);
							} else alert.failed(null);
						})
						setTimeout(() => {
							store().loader('off')
						}, 2500)
				}
			});
	},
};
