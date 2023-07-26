<script>
import api from '../service/api'

export default {
    data () {
        return {
            items: '',
            authority: ''
        }
    },
    methods: {
        async fetchData() {
        // if(this.authority != []) {
          this.items = await api.getBarang()
        //   let user = localStorage.getItem('user')
        //   let userOtoritas = await api.getOtoritas(user)
        //   this.authority = otoritas.otoritas(userOtoritas)
          // if(this.authority == []) return
        // } 
      },
    },

    mounted() {
        this.fetchData()
    }
}
</script>

<template>
TEST PAGE <hr/>
{{ items }}
</template>
