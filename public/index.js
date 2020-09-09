/*global Vue*/
/*global axios*/

var App = new Vue({
    el: '#app',
    data: {
        memberName: '',
        family: {
            name: '',
            members: []
        },
        familyNameToFind: '',
        familyToFind: {
            name: '',
            members: []
        },
        drawExceptionGiver: '',
        drawExceptionRecipient: '',
        drawExceptions: []
    },
    methods: {
        addMember() {
            for (let i = 0; i < this.family.members.length; i++) {
                if (this.family.members[i].name === this.memberName) {
                    alert('That name already exists in this family. Please use a nickname if necessary.');
                    return;
                }
            }
            this.family.members.push({ name: this.memberName });
            this.memberName = '';
        },

        addDrawException() {
            this.drawExceptions[this.drawExceptionGiver].push(this.drawExceptionRecipient);
        },

        async addFamily() {
            // Assign unique names
            let givers = this.family.members.slice();
            let recipients = this.family.members.slice();

            for (let i = 0; i < givers.length; i++) {
                // Choose random recipient
                let rand = Math.floor(Math.random() * recipients.length);
                // Don't draw yourself
                while (recipients[rand].name === givers[i].name) {
                    rand = Math.floor(Math.random() * recipients.length);
                }
                this.family.members[i].assignment = recipients[rand].name;
                recipients.splice(rand, 1);
            }

            console.log('family after assignment:', this.family);

            axios.post('/family', this.family)
                .then(res => {
                    console.log('response:', res.data);
                    // reset the family
                    this.family = {
                        name: '',
                        members: []
                    };
                })
                .catch(function(err) {
                    console.log(err);
                });
        },

        async findFamily() {
            axios.get('/family/' + this.familyNameToFind)
                .then(res => {
                    console.log('response:', res.data);
                    this.familyToFind = res.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
});
