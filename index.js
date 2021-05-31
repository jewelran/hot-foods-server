const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
const { ObjectID } = require("mongodb");
const id = new ObjectID();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5lxzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const foodsOnlineCollection = client
    .db("foodsOnline")
    .collection("storeFoods");
  const UserFoodsOnlineCollection = client
    .db("foodsOnlineUser")
    .collection("UserStoreFoods");

  app.post("/addProduct", (req, res) => {
    const addProduct = req.body;
    UserFoodsOnlineCollection.insertOne(addProduct).then((res) => {
      res.send(res.insertedCount > 0);
      console.log(res);
    });
  });
  app.get("/currentUserProduct", (req, res) => {
    const quireEmail = req.query.email
    console.log("this is quire",quireEmail);
  UserFoodsOnlineCollection.find({email: req.query.email}).toArray((err, userItem) => {
      res.send(userItem);
      console.log(userItem);
    });
  });

  app.get("/food", (req, res) => {
    UserFoodsOnlineCollection.find().toArray((error, food) => {
      // console.log(food);
      res.send(food);
    });
  });

  app.post("/addFoods", (req, res) => {
    const foodsInfo = req.body;
    foodsOnlineCollection.insertOne(foodsInfo).then((res) => {
      // console.log(res);
      res.send(res.insertedCount > 0);
    });

    console.log(foodsInfo);
  });

  app.get("/allFoods", (req, res) => {
    foodsOnlineCollection.find().toArray((error, document) => {
      res.send(document);
    });
  });

  app.delete("/deleteProduct/:id", function (req, res) {
    foodsOnlineCollection.findOneAndDelete(
      { _id: req.params.id },
      function (err, product) {
        console.log("Deleting Product " + req.params.id);
        res.json(product);
      }
    );
  });

  //for authorToken........

  console.log("data connected");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
