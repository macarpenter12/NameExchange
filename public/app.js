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
        currentView: 'loadFamily'
    },
    methods: {
        changeComponent(payload) {
            this.currentView = payload.view;
        }
    },
    template: `
        <div>
            <transition name='component-fade' mode='out-in'>
                <component
                    :is='currentView'
                    @familyLoaded='changeComponent' />
            </transition>
        </div>
    `
});
