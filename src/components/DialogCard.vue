<script setup>
</script>

<script>

export default {
    props:
    [
      'keyform', 'tambah', 'disabled', 'ishidden', 'editbtn', 'hapus', 'headers', 'items', 'category','btncolor', 'iTitle', 'icon','iVariant', 'alpha', 'screen', 'item', 'submitForm', 'form', 'noselect', 'intable'
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
        class="text-body-2 bg-blue-custom text-white rounded-xl elevation-0 text-caption"
        prepend-icon="mdi-plus"
        height="42"
        width="150"
        >
          Tambah Data
        </v-btn>
        <v-responsive v-if="intable" width="100">
          <!-- EDIT -->
          <v-btn
          v-if="editbtn && !ishidden"
          v-bind="props"
          class="text-caption"
          variant="text"
          >
          <v-icon class="ms-n3 me-2">mdi-pencil</v-icon>
          Edit Data
          </v-btn>
          <!-- LIHAT -->
          <v-btn
          v-if="editbtn && ishidden"
          v-bind="props"
          class="text-caption"
          variant="text"
          >
          Lihat Detail
          </v-btn>
          <!-- HAPUS -->
          <v-btn
          v-if="hapus"
          class="text-caption"
          block
          variant="text"
          prepend-icon="mdi-delete"
          :hidden="ishidden"
          >
          Hapus Data
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
              <div v-if="!noselect">
                <!-- LABEL FIELD -->
                <v-label>
                  {{ headers[0].title }}
                </v-label>
                <!-- FIELD SELECT (UNTUK TAMBAH DATA) -->
                <v-text-field
                    id="tipe"
                    v-if="this.item == null"
                    v-model="data[keyform[0]]"
                    variant="outlined"
                    density="compact"
                    class="mb-5"
                    hide-details
                    readonly
                >                                
                </v-text-field>
                <v-menu activator="#tipe" class="elevation-0">
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in category.slice(this.alpha, category.length)"
                        :key="index"
                        :value="index"
                        density="compact"
                      >
                        <v-list-item-title @click="data[keyform[0]] = item" class="text-caption">{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                <!-- FIELD SELECT (UNTUK EDIT DATA) -->
                <v-select
                v-if="this.item != null"
                :items="category.slice(this.alpha, category.length)"
                density="compact"
                variant="outlined"
                v-model="edit[keyform[0]]"
                :value="Object.values(item.raw)[0]"
                ></v-select>
              </div>
              <!-- FIELD NON-SELECTABLE -->
              <div v-if="noselect">
                <!-- TAMBAH DATA -->
                <v-text-field
                v-if="this.item == null"
                :label="headers[0].title"
                density="compact"
                variant="outlined"
                v-model="data[keyform[0]]"
                required
                ></v-text-field>
                <!-- EDIT DATA -->
                <v-text-field
                v-if="this.item != null"
                :label="headers[0].title"
                density="compact"
                variant="outlined"
                v-model="edit[keyform[0]]"
                :readonly="headers[0].dis"
                ></v-text-field> 
              </div>
                <v-for v-for="h, i in headers.slice(1, headers.length-1)" :key="i">
                  <v-text-field
                    v-if="this.item == null"
                    :label="h.title"
                    density="compact"
                    variant="outlined"
                    v-model="data[keyform[i+1]]"
                    required
                    ></v-text-field> 

                    <v-text-field
                    v-if="this.item != null"
                    :label="h.title"
                    density="compact"
                    variant="outlined"
                    v-model="edit[keyform[i+1]]"
                    :readonly="headers[i+1].dis"
                    ></v-text-field> 
                </v-for>
            </v-container>
            <v-row no-gutters>
              <v-col  :hidden="disabled">
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
            </v-row>
        </form>
      </v-card>
    </v-dialog>

</template>

<style>

label.v-label{
  font-size: 10pt !important;
}

span.v-select__selection-text {
  font-size: 10pt !important;
}

input.v-field__input {
  font-size: 10pt !important;
}


</style>