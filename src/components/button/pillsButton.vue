<script>
export default {
    components: {
  },
    props:['icon', 'btn_title'],
    data () {
        return {
        }
    }
}
</script>

<template>
<v-btn
    class="text-body-2 bg-blue-custom text-white rounded-xl elevation-0 text-caption ms-2"
    :prepend-icon="icon"
    height="42"
    width="150"
    >
      {{ btn_title }}
</v-btn>     
</template>