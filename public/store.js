/* global Vuex */

export default new Vuex.Store({
    state: {
        currentView: 'loadFamily',
        family: {
            name: '',
            members: [],
            exceptions: []
        }
    },
    mutations: {
        changeView (state, payload) {
            state.currentView = payload.view;
        },
        setFamily (state, payload) {
            state.family = payload.family;
        }
    }
});
