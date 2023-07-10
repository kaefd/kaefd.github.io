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
            style="width: 220px; max-width:220px"
            class="mx-1"
            :class="hideDetails ? 'mb-5' : 'mb-2'"
            :rules="rules"
            :hide-details="hideDetails"
            :disabled="disabled"
        >
        </v-text-field>
</template>