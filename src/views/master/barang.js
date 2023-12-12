import api from '@/utils/api'
import {store} from '@/utils/store'
import alert from '@/utils/alert'
export default {
    parameters(value) {
        if(value) return  value
        else return ''
    },
    async barang (param) {
        store().loader('on')
        let head = await api.getData('/barang?status=true', this.parameters(param))
        let data = []
        for (let i = 0; i < head.length; i++) {
            data.push({
                head: head[i],
            })
            
        }
        store().loader('off')
        return data
    },
    filterData(input, fl) {
        let data = {}
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < fl.length; j++) {
                if(input[i].title == fl[j].key) data[fl[j].key] = input[i].value
                if(fl[j].item) {
                    for (let k = 0; k < fl[j].item.length; k++) {
                        // data[fl[j].item[k].key] = input[i].title == fl[j].item[k].title ? input[i].value : fl[j].item[k].show
                        if(input[i].title == fl[j].item[k].title) data[fl[j].item[k].key] = input[i].value
                    }
                }
            }
        }
        return data
    },
    async filtered(input) {
        let ft_kategori = store().state.filter[0].item
        if(input != '') {
            ft_kategori.map((item) => {
                let same = Object.fromEntries(Object.entries(input).filter(([key]) => key == item.key))
                if(same[Object.keys(same)] != undefined) item.show = same[Object.keys(same)]
                else item.show = true
            })
        }
        store().$patch((state) => { state.state.filter[0].item = ft_kategori})
        const filtered = ft_kategori.filter(item => item.show === true)
        // let keys = Object.keys(filtered)
        // let newk = []
        // for (let i = 0; i < keys.length; i++) {
        //     newk.push(keys[i])
        // }
        let x = ''
        await this.barang().then(response => x = response)
        const filterData = x.filter(it =>
            filtered.some(k => it.head.kategori_barang.includes(k.title))
        )
        if(filtered != '') store().$patch((state) => { state.items = filterData})
        else store().$patch((state) => { state.items = x})
        // console.log(filterData);

        // let x = ''
        // await this.barang().then(response => x = response)
        // if(input != '') {
        //     let category = Object.fromEntries(Object.entries(input).filter(([key, value]) => value == true))
        //     let ncategory = Object.fromEntries(Object.entries(input).filter(([key, value]) => value == false))
        //     // x.filter(item => item.kategori_barang == Object.keys(category)[0])
        //     console.log(Object.keys(category)[0]);
            
        // }
        // store().$patch((state) => state.state.items = x)

    },
    create(data) {
        store().loader('on')
        api.create('/barang', data).then(res => {
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
        api.update('/barang', master[0]).then(res => {
            alert.success(null, res.data).then(
                setTimeout(() => {
                    location.reload()
                }, 2500)
            )
        })
    },
    delete(data) {
        alert.confirm('Apakah anda yakin ?', 'Anda akan menghapus '+data.kode_barang).then((result) => {
            if(result.isConfirmed) {
                api.delete('barang', {kode_barang: data.kode_barang}).then(result => {
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