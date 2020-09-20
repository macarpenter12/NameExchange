/* global VueRouter */
import loadFamily from './components/loadFamily.js';
import familyHome from './components/familyHome.js';

export default new VueRouter({
   routes: [
       {
           path: '/',
           name: 'loadFamily',
           component: loadFamily,
           props: true
       },
       {
           path: '/family/:familyName/home',
           name: 'familyHome',
           component: familyHome,
           props: true
       }
    ] 
});
