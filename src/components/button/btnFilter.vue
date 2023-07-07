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
        variant="text"
        icon
    >
        <v-icon size="20" color="blue-custom">mdi-filter</v-icon>
    </v-btn>
</template>