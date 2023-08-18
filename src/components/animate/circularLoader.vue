
<script>
export default {
    props: ['loading'],
    data() {
        
    }
}
</script>

<template>
  <v-overlay
      :model-value="loading"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular
        color="white"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<style>

</style>