// service
import api from '../data_barang/barang'

export default {
  get() {
    return api.getBarang()
  }
}