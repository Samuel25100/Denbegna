import express from 'express';
import AccountCont from '../controllers/AccountCont';

const router = express.Router();

/* have '/auth' url on before each routes */
router.post('/signup', AccountCont.createacc);
router.post('/login', AccountCont.loginacc);

export default router;
