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
  class="text-blue-custom rounded border-sm text-caption"
  prepend-inner-icon="mdi-magnify"
  :placeholder="placeholder"
  single-line
  hide-details
  style="height: 42px;"
>
</v-text-field>    
</template>