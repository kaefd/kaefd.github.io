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
<v-toolbar class="bg-transparent">
    <v-span class="w-100 text-center text-button text-grey-darken-3 mt-4">
      {{ toolbar_title }}
    </v-span>
</v-toolbar>
</template>