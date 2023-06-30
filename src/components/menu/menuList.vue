<script>
import circleButton from '../button/circleButton.vue'
import textButton from '../button/textButton.vue'
export default {
    components: {
        circleButton,
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
       <circleButton v-if="!submenu" v-bind="props" :icon="icon" :variant="variant" />
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