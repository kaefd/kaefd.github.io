<script>
export default {
    components: {
  },
    props:['icon'],
    data () {
        return {
        }
    }
}
</script>

<template>
<v-btn
    variant="text"
    color="grey-darken-2"
    size="small"
    icon>
    <v-icon>{{ icon }}</v-icon>
</v-btn>        
</template>