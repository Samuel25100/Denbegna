import express from 'express';
import Cart from '../controllers/cart_cont';

const routes = express.Router();

routes.get('/get', Cart.getCart);
routes.post('/add', Cart.postCart);
routes.delete('/remove', Cart.delCart);
routes.delete('/clear', Cart.ClearCart);

export default routes;
