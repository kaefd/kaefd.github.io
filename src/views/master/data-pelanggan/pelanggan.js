import { store } from '@/utils/store'
import api from '@/utils/api'
import alert from '@/utils/alert';
import router from '@/router';

export default {
    parameters(value) {
		if (value) return value;
		else return "";
	},
    async pelanggan(param) {
        store().loading = true
        let data = await api.getData("/pelanggan?status=true", this.parameters(param));
        store().data.items = data
        store().loading = false
        return data;
    },
    create(value) {
        store().loading = true
        let data = JSON.stringify(value)
		api.create("/pelanggan", data).then((res) => {
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
		api.update("/pelanggan", data).then((res) => {
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
	    .confirm("Apakah anda yakin ?", "Anda akan menghapus " + data.kode_pelanggan)
	    .then((result) => {
	    	if (result.isConfirmed) {
	    		store().loading = true
	    		api
	    			.delete("pelanggan", { kode_pelanggan: data.kode_pelanggan })
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