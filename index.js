const express = require('express')
const  bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5500

app.use(bodyParser.json())
app.use(cors())


// console.log( process.env.DB_USER,process.env.DB_PASS);

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5lxzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const foodsOnlineCollection = client.db("foodsOnline").collection("storeFoods");
  
  app.post('/addFoods' , (req, res) => {
    const foodsInfo = req.body;
    foodsOnlineCollection.insertOne(foodsInfo)
    .then(res => {
      console.log(res);
    })

    console.log(foodsInfo);
  })

  app.get('/allFoods', (req, res) => {
      foodsOnlineCollection.find()
      .toArray((error, document) => {
        res.send(document)
      })
  })
  console.log("data connected");

});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

