<script>
export default {
    props:['headers', 'items', 'category','btncolor', 'iTitle', 'icon','iVariant', 'alpha', 'screen'],
    data () {
      return {
        dialog: false,
      }
    },
}
</script>

<template>
    <v-dialog
          v-model="dialog"
          :scrim="false"
          transition="dialog-bottom-transition"
          :width="screen"
        >
        <!-- button dialog -->
          <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            class="text-body-2  rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            size="small">
            </v-btn>
          </template>
          <!-- dialog content -->
          <v-card>
                <v-toolbar light>
                <v-btn
                    icon
                    dark
                    @click="dialog = false"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ iTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                        variant="text"
                        @click="dialog = false"
                        >
                        Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-container class="w-75">
                    <v-select
                    :label="headers[0].title"
                    :items="category.slice(this.alpha, category.length)"
                    density="comfortable"
                    variant="outlined"
                    ></v-select>
                    <v-for v-for="h in headers.slice(1, headers.length-1)" :key="h">
                        <v-text-field
                        :label="h.title"
                        density="comfortable"
                        variant="outlined"
                        ></v-text-field> 
                    </v-for>
                </v-container>
                    <v-btn
                    color="red-darken-1"
                    variant="tonal"
                    block
                    height="50"
                    @click="dialog = false"
                    >
                    Delete
                    </v-btn>
            </v-card>
    </v-dialog>
</template>