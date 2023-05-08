<script setup>
</script>

<script>

export default {
    props:
    [
      'keyform', 'tambah', 'disabled', 'ishidden', 'headers', 'items', 'category','btncolor', 'iTitle', 'icon','iVariant', 'alpha', 'screen', 'item', 'submitForm', 'form', 'noselect', 'intable'
    ],
    data () {
      
      return {
        dialog: false,
        categoryName: '',
        edit: this.form,
        data: this.tambah,
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
            this.$emit('edit', this.edit)
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
            <!-- TAMBAH -->
            <v-btn
            v-if="!intable"
            v-bind="props"
            class="text-body-2 rounded-lg"
            color="indigo-darken-1"
            icon="mdi-plus"
            variant="tonal"
            size="small"
            >
            </v-btn>
            <v-responsive v-if="intable" width="100">
              <!-- EDIT -->
              <v-btn
              v-bind="props"
              class="text-caption rounded-lg"
              :color="btncolor"
              :icon="icon"
              :variant="iVariant"
              width="30"
              height="30"
              >
              </v-btn>
              <!-- HAPUS -->
              <v-btn
              class="text-caption ms-2 rounded-lg"
              color="orange-darken-3"
              icon="mdi-delete"
              variant="tonal"
              width="30"
              height="30"
              :hidden="ishidden"
              @click="del(edit)"
              >
              </v-btn>
            </v-responsive>
          </template>
          <!-- CONTENT DIALOG EDIT/TAMBAH -->
          <v-card class="rounded-xl">
            <form ref="form" @submit.prevent="submit">
                <v-toolbar class="bg-white text-center">
                  <v-toolbar-title>
                    {{ iTitle }}
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-container class="w-75">
                  <!-- SELECT FIELD -->
                  <div v-if="this.noselect == false">
                    <!-- LABEL FIELD -->
                    <v-label>
                      {{ headers[0].title }}
                    </v-label>
                    <!-- FIELD SELECT (UNTUK TAMBAH DATA) -->
                    <v-select
                      v-if="this.item == null"
                      :items="category.slice(this.alpha, category.length)"
                      density="comfortable"
                      variant="outlined"
                      v-model="data[keyform[0]]"
                      required
                    ></v-select>
                    <!-- FIELD SELECT (UNTUK EDIT DATA) -->
                    <v-select
                    v-if="this.item != null"
                    :items="category.slice(this.alpha, category.length)"
                    density="comfortable"
                    variant="outlined"
                    v-model="edit[keyform[0]]"
                    :value="Object.values(item.raw)[0]"
                    ></v-select>
                  </div>
                  <!-- FIELD NON-SELECTABLE -->
                  <div v-if="this.noselect == true">
                    <!-- TAMBAH DATA -->
                    <v-text-field
                    v-if="this.item == null"
                    :label="headers[0].title"
                    density="comfortable"
                    variant="outlined"
                    v-model="data[keyform[0]]"
                    required
                    ></v-text-field>
                    <!-- EDIT DATA -->
                    <v-text-field
                    v-if="this.item != null"
                    :label="headers[0].title"
                    density="comfortable"
                    variant="outlined"
                    v-model="edit[keyform[0]]"
                    :readonly="headers[0].dis"
                    ></v-text-field> 
                  </div>

                    <v-for v-for="h, i in headers.slice(1, headers.length-1)" :key="i">
                      <v-text-field
                        v-if="this.item == null"
                        :label="h.title"
                        density="comfortable"
                        variant="outlined"
                        v-model="data[keyform[i+1]]"
                        required
                        ></v-text-field> 

                        <v-text-field
                        v-if="this.item != null"
                        :label="h.title"
                        density="comfortable"
                        variant="outlined"
                        v-model="edit[keyform[i+1]]"
                        :readonly="headers[i+1].dis"
                        ></v-text-field> 
                    </v-for>
                </v-container>
                
                <v-row no-gutters>
                  <v-col :hidden="disabled">
                    <v-btn
                    type="submit"
                    color="blue-darken-1"
                    variant="tonal"
                    height="57"
                    class="w-100 rounded-0"
                    >
                    simpan
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                    color="orange-darken-1"
                    variant="tonal"
                    height="57"
                    class="w-100 rounded-0"
                    @click=" dialog = false"
                    >
                    batal
                    </v-btn>                  
                  </v-col>
                </v-row>
              </form>
            </v-card>
    </v-dialog>
</template>