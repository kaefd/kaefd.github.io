<script>
import BtnCancel from '../button/btnCancel.vue'
import BtnInfo from '../button/btnInfo.vue'
// import textButton from '../button/textButton.vue'
import btnInfo from '../button/btnInfo.vue'
import BtnOrange from '../button/btnOrange.vue'
import textFieldForm from '../form/textFieldForm.vue'
import toolbarHeader from '../form/toolbarHeader.vue'
import MenuList from '../menu/menuList.vue'
export default {
    components : {
    btnInfo,
    toolbarHeader,
    textFieldForm,
    BtnOrange,
    BtnCancel,
    MenuList,
    BtnInfo
},
    props:
    [
      'keyform', 'tambah', 'disabled', 'ishidden', 'master', 'hapus', 'headers', 'category', 'toolbar_title','alpha', 'view', 'item', 'form', 'noselect', 'intable'
    ],
    data () {
      
      return {
        dialog: false,
        edit: {},
        data: this.tambah,
        list: [
          {title: 'Edit Data', icon: 'mdi-pencil', key: 'edit'},
          {title: 'Hapus Data', icon: 'mdi-delete', key: 'hapus'},
        ],
        valid: true,
        required: [
          value => {
            if (value)  return true

            return 'harus diisi !'
          },
        ],
      }
    },
    computed: {
    },
    methods: {
      menuAksi(v) {
            v == 'edit' ? this.dialog = true : false
        },
      submit(value) {
        if(this.item == null) {
          this.$emit('form', value)
        } else {

          this.$emit('edit', value)
        }
        this.dialog = false
      },
      del(value) {
          this.$emit('del', value)
      },
      async validate () {
        const { valid } = await this.$refs.form.validate()
        let data = {}
        if (valid){
          if(this.item == null) {
            data = this.data
          } else {
            data = this.item
          }
            return this.submit(data)
        }
       },
    },
    mounted () {
      
    }
    

}
</script>
<template>
    <v-dialog
      v-model="dialog"
      :scrim="false"
      transition="dialog-bottom-transition"
      width="370"
      max-width="400"
    >
    
      <template v-slot:activator="{ props }">
        <!-- TAMBAH -->
        <btn-info v-if="!intable" v-bind="props" icon="mdi-plus" btn_title="Tambah Baru"/>
        <!-- <MenuList
            v-if="edit && intable"
            :submenu="true"
            icon="mdi-dots-vertical"
            :items="list"
            @result="menuAksi"
        /> -->
      </template>
      <!-- CONTENT DIALOG EDIT/TAMBAH -->
      <v-card class="rounded-xl">
        <v-form  @submit.prevent ref="form">
          <toolbar-header :toolbar_title="toolbar_title" />
            <v-container class="mt-5 d-flex flex-column align-center">
              <!-- SELECT FIELD -->
              <v-div v-if="!noselect">
                <!-- FIELD SELECT (UNTUK TAMBAH DATA) -->
                <div v-if="this.item == null" class="d-flex align-center">
                  <span class="text-caption" style="width:70px;">{{ headers[0].title }}</span>
                  <text-field-form
                      id="tambah"
                      :label="headers[0].title"
                      v-model="data[keyform[0]]"
                      readonly
                      :rules="required"
                  >                                
                  </text-field-form>
                  <v-menu activator="#tambah" class="elevation-0">
                      <v-list class="h-dropdown">
                        <v-list-item
                          v-for="(item, index) in category.slice(this.alpha, category.length)"
                          :key="index"
                          density="compact"
                        >
                          <v-list-item-title  @click="data[keyform[0]] = item" class="text-caption">{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                  </v-menu>
                </div>
                <!-- FIELD SELECT (UNTUK EDIT DATA) -->
                <div v-if="item != null" class="d-flex align-center">
                  <span class="text-caption" style="width:70px;">{{ headers[0].title }}</span>
                  <text-field-form
                    :id="keyform[0] == 'kode_barang' ? '' : tipe"
                    :label="headers[0].title"
                    :model-value="item[keyform[0]]"
                    readonly
                    :rules="required"
                  >                                
                  </text-field-form>
                  <v-menu activator="#tipe" class="elevation-0">
                      <v-list>
                        <v-list-item
                          v-for="(i, index) in category.slice(this.alpha, category.length)"
                          :key="index"
                          density="compact"
                        >
                          <v-list-item-title @click="item[keyform[0]] = i" class="text-caption">{{ i }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                  </v-menu>
                </div>
              </v-div>
              <!-- FIELD NON-SELECTABLE -->
              <v-div v-if="noselect">
                <!-- TAMBAH DATA -->
                <div v-if="item == null" class="d-flex align-center">
                  <span class="text-caption" style="width:70px;">{{ headers[0].title }}</span>
                  <text-field-form
                  v-if="this.item == null"
                  :label="headers[0].title"
                  v-model="data[keyform[0]]"
                  :rules="required"
                  ></text-field-form>
                  <!-- EDIT DATA -->
                  <text-field-form
                  v-if="this.item != null"
                  :label="headers[0].title"
                  :model-value="item[keyform[0]]"
                  :readonly="headers[0].dis"
                  :rules="required"
                  ></text-field-form> 
                </div>
              </v-div>
              <div v-for="h, i in headers.slice(1, headers.length-1)" :key="i">
                <div class="d-flex align-center">
                  <span class="text-caption" style="width:70px;">{{ h.title }}</span>
                  <text-field-form
                    v-if="this.item == null"
                    :label="h.title"
                    v-model="data[keyform[i+1]]"
                    :rules="required"
                    :type="keyform[i+1] == 'berat' ? 'number' : text"
                  ></text-field-form> 
                  <text-field-form
                    v-if="this.item != null"
                    :label="h.title"
                    :model-value="item[keyform[i+1]]"
                    :readonly="headers[i+1].dis"
                    :rules="required"
                    :type="keyform[i+1] == 'berat' ? 'number' : text"
                  ></text-field-form>
                </div>
              </div>
            </v-container>
            <v-divider></v-divider>
            <v-div v-if="!view" class="d-flex align-center float-end ma-5">
                <btn-cancel v-if="!edit" @click="data = '', dialog = false" btn_title="Batal" />
                <slot name="cancel"></slot>
                <btn-orange type="submit" @click="validate" btn_title="Simpan" class="ms-2"/>
            </v-div>
        </v-form>
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
.h-dropdown {
  height: fit-content !important;
  max-height: 260px !important;
}

</style>