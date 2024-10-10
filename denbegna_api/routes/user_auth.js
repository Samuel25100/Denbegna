import express from 'express';
import AccountCont from '../controllers/AccountCont';

const router = express.Router();

router.post('/signup', AccountCont.createacc);
router.post('/login', AccountCont.loginacc);

export default router;
