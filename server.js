//console.log('May Node be with you')
const express = require('express')
const bodyParser= require('body-parser')
const app = express();

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.use(express.static('/node_projects' + '/public'));

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
 // res.send('Hello World')
  res.sendFile('/node_projects' + '/signUp.html')
})


//

const MongoClient = require('mongodb').MongoClient
//const url = 'mongodb://127.0.0.1:27017'
const connectionString ="mongodb+srv://admin:pass@cluster0-9w5gl.mongodb.net/hack_jun20?retryWrites=true&w=majority"

const dbName = 'hack_jun20'
let db

//MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
MongoClient.connect(connectionString, (err, client) => {
  console.log("MongoDB Connected ...");
	 db = client.db(dbName)
  const quotesCollection = db.collection('userData')    
if (err) return console.log(err)

    //////////////////////////////////////
	app.get('/', (req, res) => {
	db.collection('userData').find().toArray()
		.then(results => {
		  console.log(results)
		})
		.catch(error => console.error(error))
	  // ...
	})
	
    //////////////////////////////////////
    app.post('/userData', (req, res) => {        
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
	  res.sendFile('/node_projects' +'/index.html')
		//res.json('Welcome!!');
		
    })
    .catch(error => console.error(error))
    })
        
    
  console.log(`Database: ${dbName}`)
})


//////////////////////////////
/*const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/hack_jun20'
mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})*/
