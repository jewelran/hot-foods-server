const express = require('express')
const  bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())


// console.log( process.env.DB_USER,process.env.DB_PASS);

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ckgfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const foodsCollection = client.db("foods").collection("allFoodsStore");
  console.log("data base connected");

  app.post('/addFoods', (req, res) => {
    const foods = req.body;
    console.log(foods);
    foodsCollection.insertOne(foods)
    .then(response => {
      console.log(response);
      // res.send(response)
    })
  })

  app.get('/foods',(req, res) => {
    res.send("data get success")
  })

});





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})