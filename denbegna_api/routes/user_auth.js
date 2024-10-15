import express from 'express';
import AccountCont from '../controllers/AccountCont';

const router = express.Router();

/* have '/auth' url on before each routes */
router.post('/signup', AccountCont.createacc); // controllers/AccountCont
router.post('/login', AccountCont.loginacc); // controllers/AccountCont
router.post('/logout', AccountCont.logoutacc);

export default router;
