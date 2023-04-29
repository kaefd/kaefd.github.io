<script setup>
</script>

<script>
export default {
    props:['disabled','headers', 'items', 'category','btncolor', 'iTitle', 'icon','iVariant', 'alpha', 'screen', 'item', 'submitForm', 'form', 'noselect'],
    data () {
      return {
        dialog: false,
        categoryName: '',
        data: [],
        edit: {},
        valid: true,
      }
    },
    computed: {
      
      
    },
    methods: {
      submit() {
        if(this.item == null) {
          this.$emit('form', this.data)
        } else {
            
            this.$emit('edit', [this.edit, this.item.raw])
        }
        this.dialog = false
     },
     del(value) {
          this.$emit('del', value)
          this.dialog = false
      }

    }

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
            class="text-body-2 ms-2 rounded-lg"
            :color="btncolor"
            :icon="icon"
            :variant="iVariant"
            size="small"
            >
            </v-btn>
          </template>
          <!-- dialog content -->
          <v-card class="rounded-xl">
            <form ref="form" @submit.prevent="submit">
                <v-toolbar class="bg-white text-center">
                  <v-toolbar-title>
                    {{ iTitle }}
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container class="w-75">
                  <div v-if="this.noselect == false">
                    <v-label>{{ headers[0].title }}</v-label>
                    <v-select
                    v-if="this.item == null"
                    :items="category.slice(this.alpha, category.length)"
                    density="comfortable"
                    variant="outlined"
                    v-model="data[0]"
                    required
                    ></v-select>
                    <v-select
                    v-if="this.item != null"
                    :items="category.slice(this.alpha, category.length)"
                    density="comfortable"
                    variant="outlined"
                    v-model="edit[0]"
                    :value="Object.values(item.raw)[1]"
                    ></v-select>
                  </div>

                  <div v-if="this.noselect == true">
                    <v-text-field
                    v-if="this.item == null"
                    :label="headers[0].title"
                    density="comfortable"
                    variant="outlined"
                    v-model="data[0]"
                    required
                    ></v-text-field> 
                    <v-text-field
                    v-if="this.item != null"
                    :label="headers[0].title"
                    density="comfortable"
                    variant="outlined"
                    v-model="edit[0]"
                    :placeholder="Object.values(item.raw)[1]"
                    :disabled="disabled"
                    ></v-text-field> 
                  </div>

                    <v-for v-for="h, i in headers.slice(1, headers.length-1)" :key="i">
                      <v-text-field
                        v-if="this.item == null"
                        :label="h.title"
                        density="comfortable"
                        variant="outlined"
                        v-model="data[i+1]"
                        required
                        ></v-text-field> 

                        <v-text-field
                        v-if="this.item != null"
                        density="comfortable"
                        variant="outlined"
                        v-model="edit[i+1]"
                        :placeholder="Object.values(item.raw)[i+2]"
                        :disabled="disabled"
                        ></v-text-field> 
                    </v-for>
                </v-container>
                
                <v-div class="d-flex">
                  <v-btn
                  type="submit"
                  color="blue-darken-1"
                  variant="tonal"
                  height="57"
                  class="w-50 rounded-0"
                  :hidden="disabled"
                  >
                  Save
                  </v-btn>
                  <v-btn
                  v-if="this.item != null"
                  color="red-darken-1"
                  variant="tonal"
                  height="57"
                  class="w-50 rounded-0"
                  :hidden="disabled"
                  @click="del(item.raw.id)"
                  >
                  Delete
                  </v-btn>
                  <v-btn
                  v-if="this.item == null"
                  color="red-darken-1"
                  variant="tonal"
                  height="57"
                  class="w-50 rounded-0"
                  @click=" dialog = false"
                  >
                  Cancel
                  </v-btn>                  
                </v-div>
              </form>
            </v-card>
    </v-dialog>
</template>