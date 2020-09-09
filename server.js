const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

const DB_ADDRESS = 'mongodb://localhost:27017/nameExchange';
const mongoose = require('mongoose');
mongoose.connect(DB_ADDRESS, {
    useNewUrlParser: true
});

const familySchema = new mongoose.Schema({
    name: String,
    members: [{
        name: String,
        assignment: String
    }]
});
const Family = mongoose.model('Family', familySchema);

const PORT_NUMBER = 3002;



app.get('/', async(req, res) => {
    res.sendFile('public/index.html', { root: __dirname }); 
});

app.get('/family/:name', async(req, res) => {
    try {
        let family = await Family.findOne({ name: req.params.name });
        res.send(family);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post('/family', async(req, res) => {
    const family = new Family({
       name: req.body.name,
       members: req.body.members
    });
    try {
        await family.save();
        res.send(`Successfully added the ${family.name} family to the database`);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});



app.listen(PORT_NUMBER, function() {
    console.log('Listening on port ' + PORT_NUMBER + '!');
});
