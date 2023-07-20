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
    <v-span class="text-button w-100 text-center font-weight-bold text-orange">
      {{ toolbar_title }}
    </v-span>
</v-toolbar>
<v-divider></v-divider>
</template>