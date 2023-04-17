<script>
  export default {
    props:['btnTitle','cardTitle', 'headers','category'],
  }
</script>

<template v-slot:activator="{ props }">
    <v-btn
      class="bg-indigo-darken-1 text-body-2"
      v-bind="props"
      icon="mdi-download"
      variant="tonal"
      size="small"
    >
    </v-btn>
  </template>