const otoritas = (data) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].status == 'true') {
            a.push({
                username: data[i].username,
                jenis_otoritas: data[i].jenis_otoritas,
            })
        }
    }
    return a
}
const routes = (data, target) => {
    for (let i = 0; i < data.length; i++) {
        if(data[i].jenis_otoritas == target) {
            return data[i].jenis_otoritas
        }
    }
}
const all = (data, user) => {
    let a = []
    for (let i = 0; i < data.length; i++) {
        if(data[i].username == user) {
            a.push({
                jenis_otoritas: data[i].jenis_otoritas,
                status: data[i].status,
            })
        }
    }
    return a
}
export default {
    otoritas,
    routes,
    all,
}