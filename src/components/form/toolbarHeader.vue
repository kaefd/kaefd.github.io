<script>
export default {
    components: {
  },
    props:['toolbar_title'],
    data () {
        return {
        }
    }
}
</script>

<template>
<v-toolbar class="bg-white">
    <v-span class="text-button w-100 text-center font-weight-medium text-blue-custom">
      {{ toolbar_title }}
    </v-span>
</v-toolbar>
<v-divider></v-divider>
</template>