<script>
export default {
    components: {
  },
    props:['btn_title', 'icon'],
    data () {
        return {
        }
    }
}
</script>

<template>
    <v-btn
        class="elevation-0 text-caption px-5 text-white rounded"
        color="blue-custom"
        height="42"
        width="137"
        :prepend-icon="icon">
        <v-span class="text-wrap">{{ btn_title }}</v-span>
    </v-btn>
</template>