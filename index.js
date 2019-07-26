
const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("step-notes").collection("notes");
    app.db = collection;
    console.log('base start')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/static"));

app.set('view engine', 'ejs');

app.get('/', async (req,res) =>{
    let notes = [];
    await app.db.find({type:'note'}).forEach( function (elem) {
        notes.push(elem)
    });
    res.render('index', {notes})
});

app.get('/notes', (req,res) =>{
    res.render('notes');
});

app.post('/api/notes', async (req,res) =>{
    await app.db.insertOne(req.body);
    res.send('ok')
});








app.listen(port, ()=>{
    console.log('server start');
});


