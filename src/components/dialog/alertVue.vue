<script setup>
</script>
<script>
export default {
    props: ['sukses', 'message'],
    data(){
        return {
        }
    },
    mounted() {
        
    }
}
</script>
<template>
    <v-dialog :close-delay="1000" transition="dialog-bottom-transition" max-width="400">
      <v-card class="rounded-xl pb-3" height="200">
        <v-sheet class="mx-auto">
            <v-if v-if="sukses">
                <img src="../../assets/img/sukses.gif" style="width:150px" />
            </v-if>
            <v-if v-if="!sukses">
                <img src="../../assets/img/gagal.jpg" class="animate__animated animate__bounceIn mt-3" style="width:90px" />
            </v-if>
        </v-sheet>
        <v-span v-if="sukses" class="text-center text-button text-green mt-n10">Berhasil!</v-span>
        <v-span v-if="!sukses" class="text-center text-button text-red">Gagal!</v-span>
        <v-span v-if="sukses" class="text-center text-caption text-green-lighten-1">Data Berhasil ditambahkan!</v-span>
        <v-span v-if="!sukses" class="text-center text-caption text-red-lighten-1">{{ message }}</v-span>
        <v-div class="d-flex w-50 mx-auto justify-space-between mb-3">
            <slot name="cancelButton"></slot>
            <slot name="yesButton"></slot>
        </v-div>
      </v-card>
    </v-dialog>
</template>
