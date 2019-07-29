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
    let list = [];
	await app.db.find({type:'note'}).forEach( function (elem) {
        notes.push(elem)
    });
	await app.db.find({type:'list'}).forEach( function (elem) {
        list.push(elem)
    });
    res.render('index', {notes:notes, list:list})
});

app.get('/notes', (req,res) =>{
    res.render('notes');
});

app.get('/notes/:id',async (req,res) =>{
    let card;
    await app.db.find(ObjectId(req.params.id)).forEach(elem =>{
        card = elem;
    });
    res.render('card-note',{card})
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

app.get('/lists', (req, res)=>{
	res.render('lists')
})

app.get('/lists/:id', async (req, res) =>{
	let list;
	await app.db.find(ObjectId(req.params.id)).forEach(elem =>{
		list = elem;
	});
	res.render('card-list', {list})
})

app.post('/api/lists', async (req,res) =>{
    await app.db.insertOne(req.body);
    res.send('ok')
});

app.put('/api/lists/:id', async(req, res)=>{
	await app.db.updateOne({"_id":ObjectId(req.params.id)}, {
	$set:{
		title:req.body.title,
		list:req.body.list
	}	
	});
	res.send('lol')
})

app.delete('/api/lists/:id', async (req, res) =>{
	await app.db.deleteOne({"_id":ObjectId(req.params.id)})
	res.send('deleted list')
})

app.listen(port, ()=>{
    console.log('server start');
});


