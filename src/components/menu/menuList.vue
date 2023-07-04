<script>
import btnOption from '../button/btnOption.vue'
import textButton from '../button/textButton.vue'
export default {
    components: {
        btnOption,
        textButton,
  },
    props:['icon', 'items', 'variant', 'submenu', 'index'],
    data () {
        return {
        }
    },
    methods : {
        clicked(key) {
            this.$emit('result', key, this.index)
        }
    }
}
</script>

<template>
<v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
       <btnOption v-if="!submenu" v-bind="props" />
       <textButton v-if="submenu" v-bind="props" :icon="icon" />
    </template>
    <v-list>
      <v-list-item
        v-for="(c, index) in items"
        :key="index"
        :value="c.key"
        @click="clicked(c.key)"
        density="compact"
        class="text-caption"
        :prepend-icon="c.icon"
      >
      {{ c.title }}
      </v-list-item>
    </v-list>
</v-menu>       
</template>