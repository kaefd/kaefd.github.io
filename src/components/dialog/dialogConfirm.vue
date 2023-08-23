<script>
</script>
<script>
export default {
    props: ['object', 'item', 'mess'],
    data() {
        return {
            
        }
    },
    computed : {
        message() {
            if(this.item.kode_barang){
                return this.item.kode_barang
            } if(this.item.kode_pelanggan){
                return this.item.kode_pelanggan
            } if(this.item.no_penjualan){
                return this.item.no_penjualan
            } if(this.item.no_pengiriman){
                return this.item.no_pengiriman
            } if(this.item.no_produksi){
                return this.item.no_produksi
            } if(this.item.username){
                return this.item.username
            } else return this.item
        }
    }
}
</script>
<template>
    <v-dialog transition="dialog-bottom-transition" max-width="400">
      <v-card class="rounded-xl">
        <v-sheet class="mx-auto mt-7">
            <img src="../../assets/img/confirm.png" style="width:100px" class="animate_animated animate__bounceIn animate__delay-2s" />
        </v-sheet>
          <v-card-title class="text-center mt-5 text-body-1">Apakah Anda Yakin ?</v-card-title>
          <v-span class="text-center mb-7 text-caption">Anda Akan {{ mess + " " + message }}</v-span>
          <v-divider></v-divider>
          <v-div class="d-flex mt-3 mb-5 me-5 ms-auto">
              <slot name="cancelButton"></slot>
              <slot name="yesButton"></slot>
          </v-div>
      </v-card>
    </v-dialog>
</template>
