/* global Vuex */

export default new Vuex.Store({
    state: {
        familyName: '',
        family: {
            name: '',
            members: [],
            exceptions: []
        }
    },
    mutations: {
        setFamily (state, payload) {
            state.family = payload.family;
        }
    }
});