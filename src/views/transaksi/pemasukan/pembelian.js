import router from "@/router";
import alert from "@/utils/alert";
import api from "@/utils/api";
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
		let supplier = await api.getData("/supplier");
		head.map((item) => {
			(item.supplier = supplier.filter(
				(it) => it.kode_supplier == item.kode_supplier
			)[0]?.nama),
			(item.rupiah = item.total_nilai * item.kurs)
		});
		store().loading = false;
		return head;
	},
	async getDetail(head) {
		let param = {
			no_pembelian: head.no_pembelian,
		};
		const data = await api.getData("pembelian_detail/no_pembelian", param)
		data.map(item => item.total_nilai = item.nilai)
        return data
	},
	create(head, detail) {
		let detail_item = detail.map(item => {
			return {
				kode_barang: item.kode_barang,
				jumlah: item.jumlah || 0,
				jumlah_diterima: item.jumlah_diterima || 0,
				nilai: item.nilai || 0,
			}
		})
		let payload = {
			tgl_pembelian: head.tgl_pembelian,
			tipe_dokumen: head.tipe_dokumen,
			no_dokumen: head.no_dokumen,
			tgl_dokumen: head.tgl_dokumen,
			kode_supplier: head.supplier,
			no_invoice: head.no_invoice,
			no_bl: head.no_bl,
			mata_uang: head.mata_uang,
			kurs: head.kurs,
			pembelian_detail: JSON.stringify(detail_item),
		}
		store().loading = true
		api
			.create("/pembelian_head", payload)
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
			"Anda akan membatalkan " + data.no_pembelian
		)
		.then((result) => {
			if (result.isConfirmed) {
				store().loading = true
				api
					.delete("pembelian_head", { no_pembelian: data.no_pembelian })
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
}