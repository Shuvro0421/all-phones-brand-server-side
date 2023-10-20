const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json())


// server side data 
const brands = [
  {
    id: 1, brandName: "Apple",
    imageLink: "https://www.slashgear.com/img/gallery/the-real-meaning-behind-apples-brand-name/l-intro-1650830667.jpg"
  },

  {
    id: 2, brandName: "Samsung",
    imageLink: "https://www.simplilearn.com/ice9/free_resources_article_thumb/How_Samsung_Marketing_Strategy_Solidifies_Its_Brand_Value.jpg"
  },

  {
    id: 3, brandName: "Sony",
    imageLink: "https://variety.com/wp-content/uploads/2016/07/sony-corp-usa-building-placeholder-logo.jpg"
  },

  {
    id: 4, brandName: "Google",
    imageLink: "https://www.verdict.co.uk/wp-content/uploads/2018/09/shutterstock_1160472559-e1536065238946.jpg"
  },

  {
    id: 5, brandName: "Intel",
    imageLink: "https://kenyanwallstreet.com/wp-content/uploads/2023/06/2J8DPRY.jpg"
  },

  {
    id: 6, brandName: "Xiaomi",
    imageLink: "https://www.smartprix.com/bytes/wp-content/uploads/2021/09/lithuania-throws-out-xiaomi-phones-heres-why-R3zUQVnx.jpg"
  }

]

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.04lxrta.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // created database and db collection
    const productCollection = client.db("productDB").collection("products")

    // posted products
    app.post('/products', async (req, res) => {
      const products = req.body
      console.log(products)
      const result = await productCollection.insertOne(products)
      res.send(result)
    })

    //get the posted products
    app.get('/products' , async (req , res) =>{
      const cursor = productCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get the products by their brand names
    app.get('/products/:brandName' , async (req , res) =>{
      const brandName = req.params.brandName
      const query = {brandName : brandName}
      const result = await productCollection.findOne(query)
      res.send(result)
    })

    // get the brands 
    app.get('/brands', (req, res) => {
      res.send(brands)
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('All phones brand server is running')

})

app.listen(port, () => {
  console.log('All phones brand server is running on port ', port)
})