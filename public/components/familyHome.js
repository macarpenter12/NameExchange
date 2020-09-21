/* global axios */

const familyHome = {
    name: 'familyHome',
    data: function() {
        return {
            family: this.$store.state.family,
            memberName: '',
            drawExceptionGiver: '',
            drawExceptionRecipient: ''
        };
    },
    props: [
        'familyName'
    ],
    methods: {
        async addMember() {
            try {
                let res = await axios.post(`/family/${this.familyName}/member`, {
                    name: this.memberName
                });
                console.log('response:', res.data);
                this.family = res.data;
                this.memberName = '';
            } catch(err) {
                console.log(err);
            }
        },

        async addDrawException() {
            try {
                let res = axios.post(`/family/${this.familyName}/exception`, {
                    giver: this.drawExceptionGiver,
                    recipient: this.drawExceptionRecipient
                });
                console.log('response:', res.data);
                this.family = res.data;
            } catch(err) {
                console.log(err);
            }
        }
    },
    template: `
        <div>
            <h2>Welcome, {{ family.name }} family!</h2>
            <div class='row'>
                <div class='col-lg'>
                    <div class='miniDisplay' id='familyMembers'>
                        <h3>Members:</h3>
                        <p><input v-model='memberName'></p>
                        <p><button @click='addMember'>Add member</button></p>
                        <ul>
                            <li v-for='member in family.members'>{{ member.name }}</li>
                        </ul>
                    </div>
                </div>
                <div class='col-lg'>
                    <div class='miniDisplay' id='familyExceptions'>
                        <h3>Exceptions:</h3>
                        <p>
                            <select v-model='drawExceptionGiver'>
                            <option v-for='member in family.members'>{{ member.name }}</option>
                        </select> cannot draw
                            <select v-model='drawExceptionRecipient'>
                            <option v-for='member in family.members'>{{ member.name }}</option>
                        </select>
                        </p>
                        <p><button @click='addDrawException'>Add exception</button></p>
                        <ul>
                            <li v-for='exception in family.exceptions'>{{ exception.giver }} cannot draw {{ exception.recipient }}</li>
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
