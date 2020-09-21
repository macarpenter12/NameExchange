/*global Vue*/
import Store from './store.js'
import loadFamily from './components/loadFamily.js';
import familyHome from './components/familyHome.js';

var App = new Vue({
    el: '#app',
    name: 'App',
    components: {
        loadFamily,
        familyHome
    },
    store: Store,
    data: {
        currentView: 'loadFamily',
        familyName: '',
        family: {}
    },
    methods: {
        changeComponent(payload) {
            this.currentView = payload.view;
        }
    },
    created () {
        // this.currentView = this.$store.state.currentView;
        this.family = this.$store.state.family;
        this.familyName = this.family.name;
    },
    template: `
        <div id='app'>
            <transition name='fade'>
                <component
                    :is='currentView'
                    @familyLoaded='changeComponent' 
                </component>
            </transition>
        </div>
    `
});
