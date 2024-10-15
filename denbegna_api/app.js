import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import product_r from './routes/products';
import user_auth from './routes/user_auth';
import cart_r from './routes/cart_r';

const app = express();
const port = process.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', user_auth); // routes/user_auth
app.use('/products', product_r); // routes/product_r
app.use('/cart', cart_r);

mongoose.connect('mongodb://localhost:27017/denbegnaDB')
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDb error:', err));

app.listen(5000, () => {
	console.log(`Server running on port ${port}`);
});
