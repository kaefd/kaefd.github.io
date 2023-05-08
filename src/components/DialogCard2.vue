<script>
import { defineComponent } from "vue"


export default defineComponent({
    name: 'DialogCard2',
    props: ['hiddenbtn', 'btn', 'itemDetail'],
    data() {
        return {
            search: '',
            dialog1: false,
            dialog2: false,
            dialItem:'',
            items: [
                {name: 'galvalum', key: 'g'},
                {name: 'other', key: 'o'},
            ],
        }
    },
    computed: {
    filteredList() {
      return this.items.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    method: {
        
    }
    }
})   
</script>

<template>
    <v-dialog v-model="dialog1">
        <!-- button dialog -->
        <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            class="text-body-2 text-white btn-custom"
            color="#ff6e40"
            size="large"
            :hidden="hiddenbtn">
            {{ btn }}
            </v-btn>
        </template>
        <v-card class="py-5 px-5 rounded-lg">
            <v-card-title class="text-center mb-3">Stok Barang</v-card-title>
            <v-text-field
                id="input"
                v-model="search"
                append-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                density="compact"
                variant="outlined"
                class="mb-4"
            ></v-text-field>

            <v-list id="itemType" v-for="(item, i) in items" :key="i" >
                <v-dialog v-model="dialog2">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        @click="dialItem = item"
                        class="mx-3">
                        {{ item.name }}
                    </v-list-item>
                    </template>

                    <v-card class="px-7 py-5 mx-auto rounded-lg" width="400">
                        <v-card-title class="text-center">{{ dialItem.name }}</v-card-title>
                        <v-card-text>{{ dialItem.code }}</v-card-text>
                        <v-text-field
                            v-for="it in itemDetail" :key="it"
                            :label="it.name"
                            variant="outlined"
                            density="comfortable"
                            :disabled="hiddenbtn"
                        />
                        <div class="d-inline w-100">
                            <v-btn class="text-body-1 btn-custom bg-blue-darken-4 w-75 me-3">Simpan</v-btn>
                            <v-btn @click="dialog2 = false" variant="tonal" class="text-body-1 btn-custom w-auto">Batal</v-btn>
                        </div>
                    </v-card>

                </v-dialog>
            </v-list>
        </v-card>
        
    </v-dialog>
</template>