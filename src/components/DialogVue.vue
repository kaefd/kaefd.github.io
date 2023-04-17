<script>
  export default {
    props:['btnTitle','cardTitle', 'headers','category', 'icon'],
    data: () => ({
      dialog: false,
    }),
  }
</script>

<template>
      <v-dialog
        v-model="dialog"
        width="400"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="text-body-2 rounded-lg"
            color="indigo-darken-1"
            v-bind="props"
            icon="mdi-plus"
            variant="tonal"
            size="small"
          >
          </v-btn>
        </template>
        <v-card class="py-5">
            <v-card-title class="text-center">
                <span class="text-body-3">{{ cardTitle }}</span>
            </v-card-title>
        <v-divider></v-divider>
          <v-card-text class="w-75 mx-auto">
                <v-select
                    :label="headers[0].title"
                    :items="category.slice(1, category.length)"
                    density="comfortable"
                    variant="outlined"
                ></v-select>
                
                <v-text-field
                    :label="headers[1].title"
                    density="comfortable"
                    variant="outlined"
                ></v-text-field> 
                <v-text-field
                    :label="headers[2].title"
                    density="comfortable"
                    variant="outlined"
                ></v-text-field>            
                <v-text-field
                    :label="headers[3].title"
                    density="comfortable"
                    variant="outlined"
                ></v-text-field>            
                <v-text-field
                    :label="headers[4].title"
                    density="comfortable"
                    variant="outlined"
                ></v-text-field>            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </template>