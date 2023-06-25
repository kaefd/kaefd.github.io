<script>
export default {
    components: {
  },
    props:['label'],
    data () {
        return {
        }
    },
    computed: {
        
    },
    methods: {
    },
    mounted () {
    }
}
</script>

<template>
    <v-checkbox
      :label="label"
      color="orange-lighten-1"
      class="mb-n6"
      hide-details
    ></v-checkbox>
</template>