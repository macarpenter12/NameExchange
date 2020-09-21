/* global axios */

const loadFamily = {
    name: 'loadFamily',
    data: function() {
        return {
            familyName: '',
            family: {
                name: '',
                members: [],
                exceptions: []
            }
        };
    },
    props: [
        'changeComponent'
    ],
    methods: {
        async addFamily() {
            try {
                let res = await axios.post('/family', {
                    name: this.familyName
                });
                console.log('response:', res.data);
                this.$store.commit('setFamily', { family: res.data });
                this.$emit('familyLoaded', { view: 'familyHome' });
            }
            catch (err) {
                console.log('error:', err);
            }
        },

        async findFamily() {
            try {
                let res = await axios.get('/family/' + this.familyName);
                console.log('response:', res.data);

                if (typeof res.data.name !== 'undefined') {
                    this.$store.commit('setFamily', { family: res.data });
                    this.$emit('familyLoaded', { view: 'familyHome' });
                } else {
                    alert(`Unable to find the ${this.familyName} family.`);
                }
            }
            catch (err) {
                console.log('error:', err);
            }
        }
    },
    template: `
        <div>
            <div class='miniHeader'>
                <h2>Enter your family name and click Add to create your family.</h2>
            </div>
            <p><input v-model='familyName'></p>
            <p><button @click='addFamily'>Add my family</button></p>
            <p><button @click='findFamily'>Find my existing family</button></p>
        </div>
    `
};

export default loadFamily;
