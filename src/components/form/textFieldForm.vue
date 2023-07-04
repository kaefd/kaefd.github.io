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
    style="width: 220px; max-width:220px"
    class="mx-1"
>
</v-text-field>    
</template>