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
        class="elevation-0 text-caption px-5"
        variant="tonal"
        height="42"
        min-width="100"
        >
        {{ btn_title }}
    </v-btn>
</template>