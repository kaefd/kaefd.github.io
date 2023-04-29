import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
        }
    },

    getters: {
        auth(state) {
            return state.user
        }
    }
})