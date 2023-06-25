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
    size="small"
    icon>
    <v-icon>{{ icon }}</v-icon>
</v-btn>        
</template>