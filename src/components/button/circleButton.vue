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
    class="rounded-circle
    text-caption
    elevation-0
    bg-grey-lighten-4
    text-indigo"
    size="small"
    :icon="icon">
</v-btn>        
</template>