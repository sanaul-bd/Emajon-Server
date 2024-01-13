Emajhon Client and Server Information, work stepe:

CLIENT_PROJECT_NAME: Emajhan Client.
SERVER_PROJECT_NAME: Emajhan Server.
USING_EMAIL: DevConfig.bd@gmail.com
db: devconfig.bd#gmail.com
dbUserName : emajhan_db


api list:
total Products count Number : http://localhost:5000/totalProducts
All Products : http://localhost:5000/products

<!-- 
==========================
*1. assign the index value directly. 
  const ids = Object.keys(storedCart)

*2. direct make an  array and make index number. 
    [...Array(10).keys()]

    both are same.

    let pageNumber = [];
      for(i=0; i<10; i++){
          pageNumber.push(i)
        }

==========================
a. CRUD Operation.
b. JWT.
c. Pagenation.

********** IMPORTENT LOGIC IN MDB ***********

-->

1. 72-1 Module Overview And Create Ema-John Server
    a. we using DotEnv for secure Our DB. - (server - index.js)
        : how can we use DotEnv. goto dotEnv site > install Dotenv > requre to the index.js on server side.
    b. goto MongoDb atlas. make a db || user || use existing user > connect to the app and db. 
    c. make a db colection for store specific specific data. 
<!-- * dotEnv, Mdb Atlas, make DB Collection.  -->


2. 72-2 Code Refactor and fix after load data from database
    a. make db and upload all data to product Collection. (server)
    b. replace all (product.json) by product collection api. [client]
    c. find out bug and dibug thn replace where is making some issu for loading a application. ><72.2 last is the most imp: for finding bug and fix>< (client)


3. 72-3 How To Deal With Unknown Feature Using Chatgpt And Google
    *** pagenation stape:
    i. need to assume total product number.
    ii. Decide the number of items want showing per page.
    iii. calculate total number of pages u want. 
    iv. 
    v. 
    vi. 

  a. Pagenation use for: a certain amount product show an page then add an <NEXT> button (client)
  b. make a api for all products by (estimatedDocumentCount) - (Server)
  c. load thorugh API on Clint Side. shop.jsx (client)
   
   
4. 72-4 (Interesting) Pagination Concept And Create Dynamic Pagination Buttons ***
  Devolope stepe by stepe 72-3.

5. 72-5 Create Page Size Dropdown Using Chatgpt ***
  a. Most important for Pagenation and Currnet Number  <!-- todo-->


6. 72-6 Set Page Size State And Send Search Query To Server ***
  a. 


7. 72-7 (Interesting) Load Data Based On The Page Number And Size Using Chatgpt
  a. page, limit, skip (server side )


8. 72-8 (Advanced) Use Post To Load Some Products Using Keys
  a. first we find the id for loading review data from api by match id from ls.
  b. we make a api "post" for receiving data from client. [server]
  c. we send dta to server using fetch by givving methods value. (client)
  d. 


9. 72-9 (Conceptual) How Pagination Works
  a. now we find and fix the problem for viewing random value by scrolling page.
  b. 
  c. 
  d. 
10. 
  a. 
  b. 
  c. 
  d. 
11. 
  a. 
  b. 
  c. 
  d. 
12. 
  a. 
  b. 
  c. 
  d. 
13. 
  a. 
  b. 
  c. 
  d. 
14. 
  a. 
  b. 
  c. 
  d. 
15. 
  a. 
  b. 
  c. 
  d. 
16. 
  a. 
  b. 
  c. 
  d. 
17. 
  a. 
  b. 
  c. 
  d. 
18. 
  a. 
  b. 
  c. 
  d. 
19. 
  a. 
  b. 
  c. 
  d. 
20. 
  a. 
  b. 
  c. 
  d. 




-------------------------------------------------
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('emaJohnDB').collection('products');

    app.get('/products', async (req, res) => {
      console.log(req.query);
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const skip = page * limit;

      const result = await productCollection.find().skip(skip).limit(limit).toArray();
      res.send(result);
    })

    app.get('/totalProducts', async (req, res) => {
      const result = await productCollection.estimatedDocumentCount();
      res.send({ totalProducts: result })
    })

    app.post('/productsByIds', async (req, res) => {
      const ids = req.body;
      const objectIds = ids.map(id => new ObjectId(id));
      const query = { _id: { $in: objectIds } }
      console.log(ids);
      const result = await productCollection.find(query).toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
-------------------------------------------------