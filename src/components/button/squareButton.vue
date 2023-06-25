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
        :color="color"
        height="42">
        {{ btn_title }}
    </v-btn>
</template>