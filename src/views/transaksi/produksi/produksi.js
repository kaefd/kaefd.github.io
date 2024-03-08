import api from "@/utils/api"
import { store } from "@/utils/store"
import alert from "@/utils/alert";
import router from "@/router";

export default {
	async produksi(param, fl) {
		let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loading = true;
		let head = await api.getData("/produksi_head", parameters);
		let bahan = await api.getData("/produksi_detail_bahan", parameters);
		let barang = await api.getData("/produksi_detail_barang", parameters);
        let a = []
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
		store().loading = false;
		return a;
	},
	async getDetail(head) {
		let param = {
			tgl_awal: store().periode[0],
			tgl_akhir: store().periode[1]
		};
		// const data = await api.getData("produksi_detail_barang/no_produksi", param);
		const data = await api.getData("produksi_detail_barang", param);
        const res = data.filter(item => item.no_produksi == head.no_produksi)
        return res
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
	create(data, detail) {
		let detail_item = detail.map(item => {
			return {
				kode_barang: item.kode_barang,
				jumlah: item.jumlah,
			}
		})
		let payload = {
			tgl_produksi: data.tgl_produksi,
			kode_group: data.kode_group,
			kode_bahan: data.kode_bahan,
			produksi_detail_barang: JSON.stringify(detail_item),
		}
		store().loading = true
		api
			.create("/produksi_head", payload)
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
				} else alert.success(null, "Data Berhasil Disimpan");
				setTimeout(() => {
					router.go()
				}, 2500)
			})
			.catch((error) => {
				if (error.response.status == 500) {
					alert.failed(null, error.response.data);
				} else alert.failed(null);
			})
			setTimeout(() => {
				store().loading = false
			}, 2500)
	},
	delete(data) {
		alert
			.confirm(
				"Apakah anda yakin ?",
				"Anda akan membatalkan " + data.no_produksi
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loading = true
					api
						.delete("produksi_head", { no_produksi: data.no_produksi })
						.then((res) => {
							if (res.status == 200) {
								alert.success(null, res.data);
								store().loading = false
							} else alert.success(null, "Data Berhasil Dibatalkan");
							router.go()
						})
						.catch((error) => {
							if (error.response.status == 500) {
								alert.failed(null, error.response.data);
							} else alert.failed(null);
						})
						setTimeout(() => {
							store().loading = false
						}, 2500)
				}
			});
	}
};