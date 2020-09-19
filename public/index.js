/*global Vue*/
import VueRouter from './router.js';

var App = new Vue({
    el: '#app',
    name: 'App',
    data: {
        familyName: '',
        family: {
            name: '',
            members: [],
            exceptions: []
        }
    },
    router: VueRouter,
    template: `
        <div id='app'>
            <router-view />
        </div>
    `
});
