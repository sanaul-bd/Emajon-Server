const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MDB Config
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@emajhandb.ksfqc8c.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

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
    await client.connect();

    // todo hare Make some DB Collection name for store kind of data.
    const productCollection = client.db("emajohnDB").collection("products");



    //^ 1. Get Operation
    // Product Collection Zone
    /*
      1. page = parseInt for getting pure number & limit also same. 
    */ 
    app.get("/products", async(req, res) => {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const skip = page * limit;

      const result = await productCollection.find().skip(skip).limit(limit).toArray();
      res.send(result)
      console.log(req.query);
    })

    // api for pagination
    /*
      1. estimatedDocumentCount use for counting total product number on MDB.
      2. then warrapd by object & send . becouse count is a number. 
    */ 
    app.get('/totalProducts', async(req, res) => {
      const result = await productCollection.estimatedDocumentCount();
        // wrapped by object when try to send an Number by Express
      res.send({totalProducts: result})
    })


    // & Post operation
    // get products Ids from clientSide || 

    /*
      1. ids = get ids from request body.
      2. map = use map for make id = keys for sending data fluetly.
      3. query = query is a searching method , getting similar ids data.
      4. result = then find data by using query and make it array.
      5. 
    */ 
    app.post('/productsByIds', async(req, res) => {
      const ids = req.body;
      const objectIds = ids.map(id => new ObjectId(id))
      const query = {_id: {$in: objectIds}}
      const result = await productCollection.find(query).toArray()
      res.send(result)
      console.log(ids);
    })




    //? 2. Creat Operation
    /*
      1. 
      2. 
      3. 
      4. 
      5. 
    */ 

    //* 3. Update Operation
    /*
      1. 
      2. 
      3. 
      4. 
      5. 
    */ 

    //! 4. Delete Operation
    /*
      1. 
      2. 
      3. 
      4. 
      5. 
    */ 




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('John Server is Running Good')
})

app.listen(port, () => {
  console.log(`ema john server is running on port: ${port}`);
})