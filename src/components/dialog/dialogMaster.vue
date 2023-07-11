<script>
// import textButton from '../button/textButton.vue'
import btnInfo from '../button/btnInfo.vue'
import BtnOrange from '../button/btnOrange.vue'
import textFieldForm from '../form/textFieldForm.vue'
import toolbarHeader from '../form/toolbarHeader.vue'
export default {
    components : {
      btnInfo,
      toolbarHeader,
      textFieldForm,
        BtnOrange,
    },
    props:
    [
      'keyform', 'tambah', 'disabled', 'ishidden', 'editbtn', 'hapus', 'headers', 'category', 'toolbar_title','alpha', 'view', 'item', 'form', 'noselect', 'intable'
    ],
    data () {
      
      return {
        edit: this.form,
        data: this.tambah,
        list: [
          {title: 'Lihat Detail', key: 'lihat'},
          {title: 'Edit Data', icon: 'mdi-pencil', key: 'edit'},
          {title: 'Hapus Data', icon: 'mdi-delete', key: 'hapus'},
        ],
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
      },
    }

}
</script>
<template>
    <v-dialog
      :scrim="false"
      transition="dialog-bottom-transition"
      width="370"
    >
    <!-- button dialog -->
      <template v-slot:activator="{ props }">
        <!-- TAMBAH -->
        <btnInfo v-if="!intable" icon="mdi-plus" btn_title="Tambah Data" v-bind="props" />
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
            <toolbar-header :toolbar_title="toolbar_title" />
            <v-container class="mt-5 d-flex flex-column align-center">
              <!-- SELECT FIELD -->
              <div v-if="!noselect">
                <!-- FIELD SELECT (UNTUK TAMBAH DATA) -->
                <text-field-form
                    v-if="this.item == null"
                    id="tambah"
                    :label="headers[0].title"
                    v-model="data[keyform[0]]"
                    readonly
                    :hide-details="true"
                >                                
                </text-field-form>
                <v-menu activator="#tambah" class="elevation-0">
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in category.slice(this.alpha, category.length)"
                        :key="index"
                        :value="index"
                        density="compact"
                      >
                        <v-list-item-title  @click="data[keyform[0]] = item" class="text-caption">{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                </v-menu>
                <!-- FIELD SELECT (UNTUK EDIT DATA) -->
                <text-field-form
                  v-if="item != null"
                  id="tipe"
                  :label="headers[0].title"
                  v-model="edit[keyform[0]]"
                  :value="Object.values(item.raw)[0]"
                  :hide-details="true"
                  readonly
                >                                
                </text-field-form>
                <v-menu activator="#tipe" class="elevation-0">
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in category.slice(this.alpha, category.length)"
                        :key="index"
                        :value="index"
                        density="compact"
                      >
                        <v-list-item-title @click="edit[keyform[0]] = item" class="text-caption">{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                </v-menu>
              </div>
              <!-- FIELD NON-SELECTABLE -->
              <div v-if="noselect">
                <!-- TAMBAH DATA -->
                <text-field-form
                v-if="this.item == null"
                :label="headers[0].title"
                v-model="data[keyform[0]]"
                required
                :hide-details="true"
                ></text-field-form>
                <!-- EDIT DATA -->
                <text-field-form
                v-if="this.item != null"
                :label="headers[0].title"
                v-model="edit[keyform[0]]"
                :readonly="headers[0].dis"
                :hide-details="true"
                ></text-field-form> 
              </div>
                <v-for v-for="h, i in headers.slice(1, headers.length-1)" :key="i">
                  <text-field-form
                    v-if="this.item == null"
                    :label="h.title"
                    v-model="data[keyform[i+1]]"
                    required
                    :hide-details="true"
                  ></text-field-form> 
                  <text-field-form
                    v-if="this.item != null"
                    :label="h.title"
                    v-model="edit[keyform[i+1]]"
                    :readonly="headers[i+1].dis"
                    :hide-details="true"
                  ></text-field-form> 
                </v-for>
            </v-container>
            <v-divider></v-divider>
            <v-div v-if="!view" class="d-flex align-center float-end ma-5">
                <slot name="cancel"></slot>
                <btn-orange btn_title="Simpan" class="ms-2"/>
            </v-div>
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