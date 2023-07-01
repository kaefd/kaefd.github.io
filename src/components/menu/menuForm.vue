<script>
export default {
    props:['icon', 'items'],
    data () {
        return {
        }
    },
    methods : {
        clicked(key) {
            this.$emit('result', key)
        }
    }
}
</script>

<template>
<v-menu transition="slide-y-transition">
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