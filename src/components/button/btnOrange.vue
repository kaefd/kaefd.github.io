<script>
export default {
    components: {
  },
    props:['btn_title'],
    data () {
        return {
        }
    }
}
</script>

<template>
    <v-btn
        class="elevation-0 text-white text-caption px-5"
        color="orange-lighten-1"
        height="42"
        min-width="100"
        >
        {{ btn_title }}
    </v-btn>
</template>