import Ordercls from '../controllers/order_cont';
import express from 'express';

const routes = express.Router();

routes.post('/add', Ordercls.MakeOrder);

export default routes;
