<script>
export default {
    components: {
  },
    props:['label'],
    data () {
        return {
        }
    }
}
</script>

<template>
<v-text-field
    :label="label"
    variant="outlined"
    density="compact"
    style="min-width: 200px; max-width:300px"
>
</v-text-field>    
</template>