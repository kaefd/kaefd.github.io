<script setup>
import otoritas from '../../service/page/otoritas';
import BtnCancel from '../button/btnCancel.vue';
import BtnOrange from '../button/btnOrange.vue';

</script>
<script>
export default {
    components: {
        BtnCancel,
        BtnOrange
},
    props: ['headers', 'items', 'user_otoritas', 'edit'],
    data () {
      return {
        ubah: this.edit,
        ds: {
          data_barang: null,
        }
      }
    },
    mounted() {
    }
}
</script>
<template>
    <v-div v-if="edit" class="d-flex me-0 ms-auto">
      <btn-cancel color="red" btn_title="Hapus Akun" />
      <btn-cancel @click="edit = false" btn_title="Batal" class="mx-2" />
      <btn-orange btn_title="Simpan" />
    </v-div>
</template>
