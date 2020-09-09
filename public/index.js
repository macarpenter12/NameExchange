/*global Vue*/
/*global axios*/

var App = new Vue({
    el: '#app',
    data: {
        familyName: '',
        memberName: '',
        family: {
            name: '',
            members: [],
            exceptions: []
        },
        drawExceptionGiver: '',
        drawExceptionRecipient: ''
    },
    methods: {
        async addMember() {
            axios.post(`/family/${this.familyName}/member`, {
                    name: this.memberName
                })
                .then(res => {
                    console.log('response:', res.data);
                    this.family = res.data;
                    this.memberName = '';
                })
                .catch(err => {
                    console.log(err);
                });

        },

        async addDrawException() {
            axios.post(`/family/${this.familyName}/exception`, {
                    giver: this.drawExceptionGiver,
                    recipient: this.drawExceptionRecipient
                })
                .then(res => {
                    console.log('response:', res.data);
                    this.family = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        async addFamily() {
            axios.post('/family', {
                    name: this.familyName
                })
                .then(res => {
                    console.log('response:', res.data);
                    this.family = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        async findFamily() {
            axios.get('/family/' + this.familyName)
                .then(res => {
                    console.log('response:', res.data);
                    this.family = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
});
