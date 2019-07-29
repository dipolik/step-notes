const express = require('express');
const router = require('express').Router();
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://admin:admin@clustertest-mse2m.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

const fs = require ('fs');

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


app.get('/notes/:id',async (req,res) =>{
    let card;
    await app.db.find(ObjectId(req.params.id)).forEach(elem =>{
        card = elem;
    });
    res.render('card',{card: card})
});


app.post('/api/notes', async (req,res) =>{
    await app.db.insertOne(req.body);
    res.send('ok')
});

app.put('/api/notes/:id', async (req, res) => {
    await app.db.updateOne({"_id":ObjectId(req.params.id)}, {
        $set: {
            title: req.body.title,
            text: req.body.text
        }
    });
    res.send('ok')
});

app.delete('/api/notes/:id', async (req, res) => {
    await app.db.deleteOne({"_id":ObjectId(req.params.id)});
    res.send('ok')
});




app.listen(port, ()=>{
    console.log('server start');
});


