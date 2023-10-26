<script>
export default {
    components: {
  },
    props:['icon', 'btn_title', 'placeholder', 'color'],
    data () {
        return {
          variant: 'text'
        }
    }
}
</script>

<template>
<v-text-field
  density="compact"
  :variant="variant || 'text'"
  class="text-caption rounded"
  :class="{'border' : !variant, 'bg-white rounded-xl' : variant, 'text-blue-custom' : !color, color : color}"
  :prepend-inner-icon="icon || 'mdi-magnify'"
  :placeholder="placeholder"
  single-line
  hide-details
  style="height: 42px; min-width: 200px !important;"
>
</v-text-field>    
</template>
<style scoped>
.border {
    border-width: thin !important;
    border-style: solid !important;
}
.border:focus-within {
  border-width: 2px !important;
  border-color: rgba(45, 123, 175, 0.589) !important;
}
</style>