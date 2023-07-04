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
        class="me-2"
        size="small"
        height="40"
        width="40"
        variant="text"
    >
        <v-icon size="20" color="blue-custom">mdi-tune-vertical</v-icon>
    </v-btn>
</template>