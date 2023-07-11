
<script>
import { useCurrencyInput } from 'vue-currency-input'
import textFieldForm from './textFieldForm.vue'
  
  export default {
  components: { textFieldForm },
    name: 'currencyInput',
    props: {
      modelValue: Number, // Vue 2: value
      options: Object,
      label: String,
    },
    setup(props) {
      const { inputRef } = useCurrencyInput(props.options)
  
      return { inputRef }
    }
  }
  </script>

  <template>
    <text-field-form
      :label="label"
      ref="inputRef"
      type="text"
      :model-value="modelValue"
    />
  </template>
  