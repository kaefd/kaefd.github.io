// plugin
// import functions from "../functions"

export default {
    head(data) {
        // Lakukan pemrosesan data yang diperlukan
        const head = data.map((item) => ({
          no_pengiriman: item.no_pengiriman,
          tgl_pengiriman: item.tgl_pengiriman,
          kode_pelanggan: item.kode_pelanggan,
          kode_alamat_bongkar: item.kode_alamat_bongkar,
          supir: item.supir,
          no_polisi: item.no_polisi,
        }));
        return head;
      },
      detail(data) {
        const detail = data.map((item) => ({
          no_penjualan: item.no_penjualan,
          tipe_dokumen: item.tipe_dokumen,
          no_dokumen: item.no_dokumen,
          kode_group: item.kode_group,
          kode_barang: item.kode_barang,
          nama_barang: item.nama_barang,
          hs_code: item.hs_code,
          jumlah: item.jumlah,
          satuan: item.satuan,
        }));
          return detail;
      },
    //   datapengiriman(head, detail, pjlhead){
    //     // ambil pgm dari head, didapat detail
    //     let dtl = []
    //     for (let i = 0; i < head.length; i++) {
    //         for (let j = 0; j < detail.length; j++) {
    //             if(head[i].no_pengiriman == detail[j].no_pengiriman) {
    //                 for (let k = 0; k < pjlhead.length; k++) {
    //                     if(detail)
    //                 }
    //             }
    //         }
    //     }
    //     let data = [
    //         {
    //             head:[
    //                 {
    //                     no_pengiriman: item.no_pengiriman,
    //                     tgl_pengiriman: item.tgl_pengiriman,
    //                     kode_pelanggan: item.kode_pelanggan,
    //                     kode_alamat_bongkar: item.kode_alamat_bongkar,
    //                     supir: item.supir,
    //                     no_polisi: item.no_polisi,
    //                 }
    //             ],
    //             detail:[
    //                 {
    //                     no_penjualan: item.no_penjualan,
    //                     tipe_dokumen: item.tipe_dokumen,
    //                     no_dokumen: item.no_dokumen,
    //                     kode_group: item.kode_group,
    //                     kode_barang: item.kode_barang,
    //                     nama_barang: item.nama_barang,
    //                     hs_code: item.hs_code,
    //                     jumlah: item.jumlah,
    //                     satuan: item.satuan,
    //                 }
    //             ]
    //         }
    //     ]

    //     return data
    //   },
      nopgm(head) {
        for (let i = 0; i < head.length; i++) {
            return head[i].no_pengiriman
        }
      }
  }