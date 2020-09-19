/* global axios */

const familyHome = {
    name: 'familyHome',
    data: function() {
        return {
            memberName: '',
            drawExceptionGiver: '',
            drawExceptionRecipient: ''
        };
    },
    methods: {
        async addMember() {
            axios.post(`/family/${this.$parent.familyName}/member`, {
                    name: this.memberName
                })
                .then(res => {
                    console.log('response:', res.data);
                    this.$parent.family = res.data;
                    this.memberName = '';
                })
                .catch(err => {
                    console.log(err);
                });
        },

        async addDrawException() {
            axios.post(`/family/${this.$parent.familyName}/exception`, {
                    giver: this.drawExceptionGiver,
                    recipient: this.drawExceptionRecipient
                })
                .then(res => {
                    console.log('response:', res.data);
                    this.$parent.family = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    template: `
        <div>
            <h2>Welcome, {{ $parent.family.name }} family!</h2>
            <div class='row'>
                <div class='col-lg'>
                    <div class='miniDisplay' id='familyMembers'>
                        <h3>Members:</h3>
                        <p><input v-model='memberName'></p>
                        <p><button @click='addMember'>Add member</button></p>
                        <ul>
                            <li v-for='member in $parent.family.members'>{{ member.name }}</li>
                        </ul>
                    </div>
                </div>
                <div class='col-lg'>
                    <div class='miniDisplay' id='familyExceptions'>
                        <h3>Exceptions:</h3>
                        <p>
                            <select v-model='drawExceptionGiver'>
                            <option v-for='member in $parent.family.members'>{{ member.name }}</option>
                        </select> cannot draw
                            <select v-model='drawExceptionRecipient'>
                            <option v-for='member in $parent.family.members'>{{ member.name }}</option>
                        </select>
                        </p>
                        <p><button @click='addDrawException'>Add exception</button></p>
                        <ul>
                            <li v-for='exception in $parent.family.exceptions'>{{ exception.giver }} cannot draw {{ exception.recipient }}</li>
                        </ul>
                    </div>
                </div>
            </div>
    
            <div class='miniDisplay' id='drawNames'>
                <!-- TODO: Display drawn names and offer to draw new names -->
            </div>
        </div>
    `
};

export default familyHome;
