import express from 'express';
import Review from '../controllers/review_cont';

const routes = express.Router();
routes.post('/add', Review.add_review);
routes.delete("/del", Review.del_review);

export default routes
