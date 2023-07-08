<script>
export default {
    components: {
  },
    props:['label', 'rules', 'disabled', 'hideDetails', 'type'],
    data () {
        return {
        }
    }
}
</script>

<template>
    <v-sheet class="d-flex flex-column">
        <v-label>{{ label }}</v-label>
        <v-text-field
            :type="type"
            variant="outlined"
            density="compact"
            style="width: 220px; max-width:220px"
            class="mx-1 mb-1"
            :rules="rules"
            :disabled="disabled"
            :hide-details="hideDetails"
        >
        </v-text-field>
    </v-sheet>
</template>