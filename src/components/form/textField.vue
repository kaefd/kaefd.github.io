<script>
export default {
    components: {
  },
    props:['icon', 'btn_title', 'placeholder'],
    data () {
        return {
        }
    }
}
</script>

<template>
<v-text-field
  density="compact"
  variant="text"
  class="text-indigo-darken-4 rounded-lg border text-body-2 font-small"
  prepend-inner-icon="mdi-magnify"
  :placeholder="placeholder"
  single-line
  hide-details
>
</v-text-field>    
</template>