import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

const url = process.env.DATABASE_URL;
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client
  .connect()
  .then(() =>
    console.log(
      '\x1b[35m%s\x1b[0m',
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  );
const productCollection = client.db('shop').collection('products');

app.listen(PORT, () =>
  console.log('\x1b[36m%s\x1b[0m', `App is running on ${PORT} port...`)
);

app.get('/api/products', async (req, res) => {
  const products = await productCollection.find({}, { limit: 5 }).toArray();
  res.json({ products });
});
