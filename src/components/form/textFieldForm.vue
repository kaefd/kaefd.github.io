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
            variant="text"
            density="compact"
            class=" mb-2 border rounded"
            :rules="rules"
            hide-details
            :disabled="disabled"
            style="min-width: 185px; width: 197px; max-width: 197px; height: 38px;"
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