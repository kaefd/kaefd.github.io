<script setup>
</script>
<script>
export default {
    props: ['object']
}
</script>
<template>
    <v-dialog transition="dialog-bottom-transition" max-width="400">
      <v-card class="rounded-xl">
          <v-card-title class="text-center mt-7 text-body-1">Apakah Anda Yakin ?</v-card-title>
          <v-span class="text-center mb-7 text-caption">Anda Akan Menghapus {{ object }}</v-span>
          <v-div class="d-flex w-50 mx-auto justify-space-between mb-5">
              <slot name="cancelButton"></slot>
              <slot name="yesButton"></slot>
          </v-div>
      </v-card>
    </v-dialog>
</template>
