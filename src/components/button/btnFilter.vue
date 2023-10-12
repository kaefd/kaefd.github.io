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
        class=""
        size="small"
        variant="text"
        icon
    >
        <v-icon size="20" color="blue-custom">mdi-filter</v-icon>
    </v-btn>
</template>