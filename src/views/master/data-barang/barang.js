import { store } from '@/utils/store'
import api from '@/utils/api'
import router from '@/router';
import alert from '@/utils/alert';
import filter from '@/utils/filter';

export default {
    parameters(value) {
		if (value) return value;
		else return "";
	},
    async barang(param) {
		const nw_ft = store().filter
        store().loading = true
        let data = await api.getData("/barang?status=true");
        let filteredData = nw_ft ? filter.ft_object(nw_ft, data) : data
        store().loading = false
        return filteredData;
    },
    create(value) {
        store().loading = true
        let data = JSON.stringify(value)
		api.create("/barang", data).then((res) => {
			if(res.status == 200) {
				alert.success(null, res.data)
			} else alert.success(null, 'Data Berhasil Disimpan')
            setTimeout(() => {
                router.go()
            }, 2500)
		})
		.catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
		setTimeout(() => {
			store().loading = false
		}, 2500)
    },
    edit(value) {
        store().loading = true
		let data = JSON.stringify(value)
		api.update("/barang", data).then((res) => {
			if(res.status == 200) {
				alert.success(null, res.data)
			} else alert.success(null, 'Data Berhasil Diupdate')
            setTimeout(() => {
                router.go()
            }, 2500)
		})
		.catch(error => {
			if(error.response.status == 500) {
				alert.failed(null, error.response.data)
			} else alert.failed(null)
		})
		setTimeout(() => {
			store().loading = false
		}, 2500)
    },
    delete(data) {
        alert
			.confirm("Apakah anda yakin ?", "Anda akan menghapus " + data.kode_barang)
			.then((result) => {
				if (result.isConfirmed) {
					store().loading = true
					api
						.delete("barang", { kode_barang: data.kode_barang })
						.then((res) => {
							if(res.status == 200) {
								alert.success(null, res.data)
							} else alert.success(null, 'Data Berhasil Dihapus')
							setTimeout(() => {
                                router.go()
                            }, 2500)
						})
						.catch((error) => {
							if(error.response.status == 500) {
								alert.failed(null, error.response.data)
							} else alert.failed(null)
						})
					setTimeout(() => {
						store().loading = false
					}, 2500)
				}
			});
	},
    }