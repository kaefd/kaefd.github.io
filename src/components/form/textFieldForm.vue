<script>
export default {
    components: {
  },
    props:['label', 'rules', 'disabled', 'hideDetails', 'type', 'value'],
    data () {
        return {
        }
    }
}
</script>

<template>
        <v-text-field
            :type="type"
            :label="label"
            variant="outlined"
            density="compact"
            class="mb-3"
            :rules="rules"
            hide-details
            :disabled="disabled"
        >
        </v-text-field>
</template>