<script>
export default {
    components: {
  },
    props:['btn_title', 'color'],
    data () {
        return {
        }
    }
}
</script>

<template>
    <v-btn
        class="elevation-0 text-small px-6"
        color="grey-lighten-3"
        height="42"
        :prepend-icon="icon">
        {{ btn_title }}
    </v-btn>
</template>