import express from 'express';
import Products from '../controllers/products_cont';

const router = express.Router();

/* have '/products' on before each route */
router.post('/add', Products.add_prod); // add one product in db
router.get('/electronics', Products.getElectronics); // fetch all electronics
router.get('/clothings', Products.getClothings);
router.get('/homeutils', Products.getHomeUtils);
router.get('/bookmedias', Products.getBookMedia);
router.get('/getproduct', Products.getProduct);
router.delete('/del', Products.delProduct);

export default router;
