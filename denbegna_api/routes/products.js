import express from 'express';
import Products from '../controllers/products_cont';

const router = express.Router();

/* have '/products' on before each route */
router.post('/add', Products.add_prod);
router.get('/electronics', Products.getElectronics);
router.get('/clothings', Products.getElectronics);
router.get('/homeutils', Products.getElectronics);
router.get('/bookmedias', Products.getElectronics);

export default router;
