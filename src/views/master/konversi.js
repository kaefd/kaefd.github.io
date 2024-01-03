import api from "@/utils/api";
import { store } from "@/utils/store";
import alert from "@/utils/alert";
export default {
	parameters(value) {
		if (value) return value;
		else return "";
	},
	async konversi(param) {
		store().loader("on");
		let head = await api.getData(
			"/konversi_barang?status=true",
			this.parameters(param)
		);
		let data = [];
		for (let i = 0; i < head.length; i++) {
			data.push({
				head: head[i],
			});
		}
		store().$patch((state) => { state.items = data })
		store().loader("off");
		return data;
	},
	filterData(input, fl) {
		let data = {};
		for (let i = 0; i < input.length; i++) {
			for (let j = 0; j < fl.length; j++) {
				if (input[i].title == fl[j].key) data[fl[j].key] = input[i].value;
				if (fl[j].item) {
					for (let k = 0; k < fl[j].item.length; k++) {
						if (input[i].title == fl[j].item[k].title)
							data[fl[j].item[k].key] = input[i].value;
					}
				}
			}
		}
		return data;
	},
	async filtered(input) {
		let ft_kode = store().state.filter[0].item;
		if (input != "") {
			ft_kode.map((item) => {
				let same = Object.fromEntries(
					Object.entries(input).filter(([key]) => key == item.key)
				);
				if (same[Object.keys(same)] != undefined)
					item.show = same[Object.keys(same)];
				else item.show = true;
			});
		}
		store().$patch((state) => {
			state.state.filter[0].item = ft_kode;
		});
		const filtered = ft_kode.filter((item) => item.show === true);

		let x = "";
		await this.konversi().then((response) => (x = response));
		const filterData = x.filter((it) =>
			filtered.some((k) => it.head.kode_barang.includes(k.title))
		);
		if (filtered != "")
			store().$patch((state) => {
				state.items = filterData;
			});
		else
			store().$patch((state) => {
				state.items = x;
			});
	},
	create(data) {
		store().loader("on");
		api.create("/konversi_barang", data).then((res) => {
			if(res.status == 200) {
				alert.success(null, res.data)
				store().resetState()
			} else alert.success(null, 'Data Berhasil Disimpan')
			this.konversi()
		})
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
		setTimeout(() => {
			store().loader('off')
		}, 2500)
	},
	update(data) {
		store().loader('on')
		let master = [store().master];
		let field = store().state.fields;

		master.map((item) => {
			for (let i = 0; i < field.length; i++) {
				item[field[i].key] =
					data[field[i].key] != undefined
						? data[field[i].key]
						: item[field[i].key];
			}
		});
		api.update("/konversi_barang", master[0]).then((res) => {
			if(res.status == 200) {
				alert.success(null, res.data)
				store().resetState()
			} else alert.success(null, 'Data Berhasil Diupdate')
			this.konversi()
		})
        .catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
		setTimeout(() => {
			store().loader('off')
		}, 2500)
	},
	delete(data) {
		alert
			.confirm(
				"Apakah anda yakin ?",
				"Anda akan menghapus " + data.kode_konversi
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loader('on')
					api
						.delete("konversi_barang", { kode_konversi: data.kode_konversi })
						.then((res) => {
							if(res.status == 200) {
								alert.success(null, res.data)
							} else alert.success(null, 'Data Berhasil Dihapus')
							this.konversi()
						})
						.catch((error) => {
							if(error.response.status == 500) {
								alert.failed(null, error.response.data)
							} else alert.failed(null)
						})
						store().resetState()
						setTimeout(() => {
							store().loader('off')
						}, 2500)
				}
			});
	},
};
