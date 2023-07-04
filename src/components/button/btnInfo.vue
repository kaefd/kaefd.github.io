<script>
export default {
    components: {
  },
    props:['btn_title', 'icon'],
    data () {
        return {
        }
    }
}
</script>

<template>
    <v-btn
        class="elevation-0 text-white text-caption px-5"
        color="blue-custom"
        height="42"
        min-width="100"
        :prepend-icon="icon">
        {{ btn_title }}
    </v-btn>
</template>