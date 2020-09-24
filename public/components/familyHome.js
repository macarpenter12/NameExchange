const familyHome = {
    name: 'familyHome',
    data: function() {
        return {
            family: {},
            memberName: '',
            drawExceptionGiver: '',
            drawExceptionRecipient: '',
	    showDrawings: false
        };
    },
    created() {
	this.family = this.$store.state.family;
    },
    methods: {
        async addMember() {
            try {
                let res = await axios.post(`/family/${this.family.name}/member`, {
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
                let res = await axios.post(`/family/${this.family.name}/exception`, {
                    giver: this.drawExceptionGiver,
                    recipient: this.drawExceptionRecipient
                });
                console.log('response:', res.data);
                this.family = res.data;
            } catch(err) {
                console.log(err);
            }
        },

        drawNames() {
	    let namesDrawnIndexes = [];
            for (let i = 0; i < this.family.members.length; i++) {
		// Draw random names/indexes.
		// Make sure not to draw him/herself or someone who has already been drawn.
                let rand = Math.floor(Math.random() * this.family.members.length);
		while (namesDrawnIndexes.includes(rand) || rand === i) {
		    rand = Math.floor(Math.random() * this.family.members.length);
		}
		namesDrawnIndexes.push(rand);
		this.family.members[i].assignment = this.family.members[rand].name;
            };
	    this.showDrawings = true;
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
                        <h3>Exceptions (beta):</h3>
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
    
            <div class='miniDisplay' id='nameDrawings'>
		<h3>Name Drawings: </h3>
                <!-- TODO: Display drawn names and offer to draw new names -->
		<p><button v-if='showDrawings === false' @click='drawNames'>Draw Names!</button></p>
		<ul>
		    <li v-if='showDrawings === true' v-for='member in family.members'>{{ member.name }} drew {{ member.assignment }}</li>
		</ul>
            </div>
        </div>
    `
};

export default familyHome;
