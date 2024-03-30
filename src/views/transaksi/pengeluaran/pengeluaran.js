import api from "@/utils/api"
import { store } from "@/utils/store"
import alert from "@/utils/alert";
import router from "@/router";

export default {
	async pengeluaran(param, fl) {
		let parameters = "";
		if (param) parameters = param;
		else
			parameters = {
				tgl_awal: store().periode[0],
				tgl_akhir: store().periode[1],
			};
		store().loading = true;
		let head = await api.getData("/penjualan_head", parameters);
		let pelanggan = await api.getData("/pelanggan");
        head.map(item => {
			item.pelanggan = pelanggan.find(p => p.kode_pelanggan == item.kode_pelanggan)?.nama,
			item.status_ = item.status == 'open' ? 'Menunggu' : 'Selesai'
		})
		store().loading = false;
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
    async kodegroup() {
		let array = await api.getData("group_barang");
		let head = Array.from(new Set(array.map((obj) => obj.kode_group))).map(
			(kode_group) => {
				return array.find((obj) => obj.kode_group === kode_group);
			}
		);
		return head;
	},
	create(head, detail) {
		let detail_item = detail.map(item => {
			return {
				kode_barang: item.kode_barang,
				jumlah: item.jumlah,
				harga_jual: item.harga_jual,
			}
		})
		let payload = {
			tgl_penjualan: head.tgl_penjualan,
			tipe_dokumen: head.tipe_dokumen,
			no_dokumen: head.no_dokumen,
			tgl_dokumen: head.tgl_dokumen,
			kode_pelanggan: head.pelanggan,
			kode_group: head.kode_group,
			penjualan_detail: JSON.stringify(detail_item),
		}
		store().loading = true
		api
			.create("/penjualan_head", payload)
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
				"Anda akan membatalkan " + data.no_penjualan
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loading = true
					api
						.delete("penjualan_head", { no_penjualan: data.no_penjualan })
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