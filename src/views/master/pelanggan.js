import api from "@/utils/api";
import alert from "@/utils/alert";
import { store } from "@/utils/store";
export default {
	parameters(value) {
		if (value) return value;
		else return "";
	},
	async pelanggan(param) {
		store().loader("on");
		let head = await api.getData(
			"/pelanggan?status=true",
			this.parameters(param)
		);
		let data = [];
		for (let i = 0; i < head.length; i++) {
			data.push({
				head: head[i],
			});
		}
		store().$patch((state) => {
			state.items = data;
		});
		store().loader("off");
		return data;
	},
	create(data) {
		store().loader("on");
		let result = api
			.create("/pelanggan", data)
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
					store().resetState();
				} else alert.success(null, "Data Berhasil Disimpan");
				this.pelanggan();
				return 'success'
			})
			.catch((error) => {
				if (error.response.status == 500) {
					alert.failed(null, error.response.data);
				} else alert.failed(null);
				return 'failed'
			});
		setTimeout(() => {
			store().loader("off");
		}, 2500);
		return result
	},
	update(data) {
		store().loader("on");
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
		let result = api
			.update("/pelanggan", master[0])
			.then((res) => {
				if (res.status == 200) {
					alert.success(null, res.data);
					store().resetState();
				} else alert.success(null, "Data Berhasil Diupdate");
				this.pelanggan();
				return 'success'
			})
			.catch((error) => {
				if (error.response.status == 500) {
					alert.failed(null, error.response.data);
				} else alert.failed(null);
				return 'failed'
			});
		setTimeout(() => {
			store().loader("off");
		}, 2500);
		return result
	},
	delete(data) {
		alert
			.confirm(
				"Apakah anda yakin ?",
				"Anda akan menghapus " + data.kode_pelanggan
			)
			.then((result) => {
				if (result.isConfirmed) {
					store().loader("on");
					api
						.delete("pelanggan", { kode_pelanggan: data.kode_pelanggan })
						.then((res) => {
							if (res.status == 200) {
								alert.success(null, res.data);
							} else alert.success(null, "Data Berhasil Dihapus");
							this.pelanggan();
						})
						.catch((error) => {
							alert.failed("Gagal !", error.response.data);
						});
					setTimeout(() => {
						store().loader("off");
					}, 2500);
				}
			});
	},
};
