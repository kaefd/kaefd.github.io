import api from "@/utils/api";
import { store } from "@/utils/store";

export default {
	async items(p) {
		let param = { tgl_awal: p[0], tgl_akhir: p[1] };
		let url = [
			{
				name: "pemasukan",
				key: "no_pembelian",
				head: "/pembelian_head",
				detail: "/pembelian_detail",
			},
			{
				name: "produksi",
				key: "no_produksi",
				head: "/produksi_head",
				detail: "/produksi_detail_bahan",
			},
			{
				name: "pengeluaran",
				key: "no_penjualan",
				head: "/penjualan_head",
				detail: "/penjualan_detail",
			},
			{
				name: "pengiriman",
				key: "no_pengiriman",
				head: "/pengiriman_head",
				detail: "/pengiriman_detail",
			},
		];
		let sum = {
			pemasukan: [],
			produksi: [],
			pengeluaran: [],
			pengiriman: [],
		};
		let data = [];
		for (let i = 0; i < url.length; i++) {
			let h = await api.getData(url[i].head, param);
			if(h) {
				let d = await api.getData(url[i].detail, param);
				for (let j = 0; j < h.length; j++) {
					for (let k = 0; k < d.length; k++) {
						if (h[j][url[i].key] == d[k][url[i].key])
							sum[url[i].name].push(d[k].jumlah);
					}
				}
				data.push({
					name: url[i].name,
					data: sum[url[i].name],
					sum:
						sum[url[i].name].reduce((accumulator, currentValue) => {
							return accumulator + currentValue;
						}, 0) / 1000,
				});
			}
		}
		return data;
	},
	async chart(value, periode) {
		let w = periode[0];
		let k = periode[1];

		let param = {
			tgl_awal: w,
			tgl_akhir: k,
		};

		let data = [];

		let other = [];
		let tgl = [];
		let head = await api.getData(value.head, param);
		if (!head) api.logout();
		let detail = await api.getData(value.detail, param);
		for (let k = 0; k < head.length; k++) {
			for (let j = 0; j < detail.length; j++) {
				if (detail[j]["no_" + value.key] == head[k]["no_" + value.key]) {
					other.push(detail[j].jumlah / 1000);
					tgl.push(head[k]["tgl_" + value.key]);
				}
			}
		}
		store().$patch((state) => (state.cpr = tgl));
		data = [
			{
				name: value.key,
				data: other,
			},
		];
		return data;
	},
};
