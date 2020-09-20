const express = require('express');
const bodyParser = require('body-parser');

const app = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + 'public'));

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
    }],
    exceptions: [{
        giver: String,
        recipient: String
    }]
});
const Family = mongoose.model('Family', familySchema);



app.get('/', async(req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/family/:name', async(req, res) => {
    try {
        let family = await getFamilyByName(req.params.name);
        res.send(family);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.post('/family', async(req, res) => {
    const family = new Family({
        name: req.body.name
    });
    try {
        await family.save();
        res.send(family);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

app.post('/family/:name/member', async(req, res) => {
    let family = await getFamilyByName(req.params.name);
    let member = req.body;

    // if (!family.hasOwnProperty('members')) {
    //     family.members = [];
    // }

    family.members.forEach(familyMember => {
        if (familyMember.name === member.name) {
            throw new Error('That name already exists in this family. Please use a nickname if necessary.');
        }
    });

    family.members.push(member);

    try {
        let familyQuery = { name: family.name };
        await Family.updateOne(familyQuery, family);
        res.send(family);
    }
    catch (err) {
        throw err;
    }
});

app.post('/family/:name/exception', async(req, res) => {
    let family = await getFamilyByName(req.params.name);
    let drawException = req.body;

    // if (!family.hasOwnProperty('exceptions')) {
    //     family.exceptions = [];
    // }
    
    family.exceptions.push(drawException);
    
    try {
        let familyQuery = { name: family.name };
        await Family.updateOne(familyQuery, family);
        res.send(family);
    }
    catch (err) {
        throw err;
    }
});




const getFamilyByName = async(name) => {
    try {
        let family = await Family.findOne({ name: name });
        return family;
    }
    catch (err) {
        throw err;
    }
};

module.exports = app;
