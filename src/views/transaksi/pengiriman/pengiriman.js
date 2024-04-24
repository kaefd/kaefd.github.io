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
				)[0].nama);
		});
		const nw_ft = store().filter
		let filteredData = nw_ft ? filter.ft_object(nw_ft, head) : head
		store().loading = false;
		return filteredData;
	},
	async getDetail(head) {
		store().loading = true
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
		store().loading = false
        return res
	},
	async blmTerkirim() {
		let head = await api.getData("penjualan_head/belum_terkirim");
		let detail = await api.getData("penjualan_detail/belum_terkirim");
		let stokBarang = await api.getData("group_barang");
		let data = [];
		for (let i = 0; i < head.length; i++) {
			for (let j = 0; j < detail.length; j++) {
				if (detail[j].no_penjualan == head[i].no_penjualan) {
					for (let k = 0; k < stokBarang.length; k++) {
						if (
							stokBarang[k].kode_group == head[i].kode_group &&
							stokBarang[k].kode_barang == detail[j].kode_barang
						) {
							data.push({
								kode_barang: detail[j].kode_barang,
								nama_barang: detail[j].nama_barang,
								no_penjualan: head[i].no_penjualan,
								no_urut: detail[j].no_urut,
								kode_group: head[i].kode_group,
								nopen: head[i].tipe_dokumen + "-" + head[i].no_dokumen,
								tipe_dokumen: head[i].tipe_dokumen,
								no_dokumen: head[i].no_dokumen,
								belum_terkirim: detail[j].jumlah - detail[j].jumlah_terkirim,
								stok_akhir: stokBarang[k].stok_akhir,
								satuan: detail[j].satuan,
							});
						}
					}
				}
			}
		}
		return data;
	},
	create(head, detail) {
		let detail_item = detail.map(item => {
			return {
				no_penjualan: item.no_penjualan,
				no_urut: item.no_urut,
				kode_barang: item.kode_barang,
				jumlah: item.jumlah || 0,
				kode_konversi: item.kode_konversi || "",
				jumlah_konversi: item.jumlah_konversi || 0,
				satuan_konversi: item.satuan_konversi || "",
			}
		})
		let payload = {
			no_pengiriman: head.no_pengiriman,
			tgl_pengiriman: head.tgl_pengiriman,
			kode_pelanggan: head.pelanggan,
			kode_alamat_bongkar: head.tujuan_bongkar,
			keterangan: head.keterangan || "",
			supir: head.supir,
			no_polisi: head.no_polisi,
			pengiriman_detail: JSON.stringify(detail_item),
		}
		store().loading = true
		api
			.create("/pengiriman_head", payload)
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
				} else alert.success(null, "Data Berhasil Disimpan");
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
	},
	delete(data) {
		alert
			.confirm(
				"Apakah anda yakin ?",
				"Anda akan membatalkan " + data.no_pengiriman
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loading = true
					api
						.delete("pengiriman_head", { no_pengiriman: data.no_pengiriman })
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