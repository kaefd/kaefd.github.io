import api from '@/utils/api'
import alert from '@/utils/alert'
import {store} from '@/utils/store'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    async pelanggan (param) {
        store().loader('on')
        let head = await api.getData('/pelanggan?status=true', this.parameters(param))
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        store().loader('off')
        return data
    },
    create(data) {
        store().loader('on')
        api.create('/pelanggan', data).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
    },
    update(data) {
        let master = [store().master]
        let field = store().state.fields

        master.map((item) => {
            for (let i = 0; i < field.length; i++) {
                item[field[i].key] = data[field[i].key] != undefined ? data[field[i].key] : item[field[i].key]
            }
        })
        store().loader('on')
        api.update('/pelanggan', master[0]).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.kode_pelanggan).then((result) => {
            if(result.isConfirmed) {
                api.delete('pelanggan', {kode_pelanggan: data.kode_pelanggan}).then(result => {
                    alert.success(null, 'Data Berhasil Dihapus').then(
                        setTimeout(() => {
                            location.reload()
                        }, 2500))
                }).catch((error) => {
                    alert.failed('Gagal !', error.response.data)
                })
            }
        })
    },
}