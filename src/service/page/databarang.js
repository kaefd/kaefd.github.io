<v-row class="d-flex w-100">
<v-col>
  <v-card class="elevation-0 pa-3 vh-75 rounded-lg bg-transparent" min-width="250">
    <v-btn class="rounded-xl bg-blue-custom text-white elevation-0 text-caption" height="42" width="150">Tambah Baru</v-btn>
    <v-list class="bg-transparent">
      <v-list-item
        class="text-caption font-weight-bold"
        >
        KODE USER
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item
      v-for="item, i in items" :key="i"
      class="text-caption" density="compact"
      @click="pilihUser(item.username)"
      >
      {{ item.username }}
      </v-list-item>
    </v-list>
  </v-card>
</v-col>
<v-col cols="4">
  <v-card class="elevation-0 pt-5 h-100 rounded-lg bg-grey-lighten-4" min-width="320" max-width="300">
    <p class="h5 text-center text-blue-darken-4 mb-5">DETAILS USER</p>
    <v-text-field
      label="Username"
      v-model="userselect"
      density="compact"
      variant="outlined"
      class="w-75 mx-auto"
      readonly
      />
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      density="compact"
      variant="outlined"
      class="w-75 mx-auto"
      readonly
      />
    <p class="w-100 bg-blue-custom pa-1 text-center text-button text-white">JENIS OTORITAS</p>
    <v-list
    v-scroll.self="onScroll"
    class="overflow-y-auto bg-transparent"
    max-height="300">
      
      <!-- <v-for v-for="o, i in jns_otoritas" :key="i">
        <v-list-group :value="o">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                class="me-0 ms-auto"
                height="5"
              ><v-checkbox color="blue" :model-value="true" class="mt-5" :label="o.title"></v-checkbox></v-list-item>
            </template>
  
            <v-if v-if=" otoritas[i].action != '' ">
              <v-checkbox
                v-for="act, a in otoritas[i].action" :key="a"
                color="blue"
                :model-value="act.check"
                :label="act.title"
                class="ms-6 mb-n6"
              >
              </v-checkbox>
            </v-if>
        </v-list-group>
      </v-for> -->
      <v-list-item
        v-for="jns, i in jns_otoritas" :key="i"
        class="text-caption"
        density="compact"
        @click="dialogotoritas[i] = true"
      >
      <v-checkbox density="compact" class="mb-n7" :label="jns" :model-value="true" readonly></v-checkbox>
      <v-dialog v-model="dialogotoritas[i]" @update="dialogotoritas" max-width="400">
        <v-card class="pa-5">
          <v-span class="text-caption font-weight-bold">Otoritas</v-span>
          <v-divider></v-divider>
            <v-checkbox
              class="text-caption mb-n7"
              density="compact"
              v-for="oto, j in userotoritas('admin', jns)" :key="j"
              :label="oto"
              :model-value="true"
              readonly
            ></v-checkbox>
        </v-card>
      </v-dialog>
      </v-list-item>
    </v-list>
  </v-card>
</v-col>
</v-row>
