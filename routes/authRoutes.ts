import express from 'express';
import { checkSession } from '../controllers/authController';
import { logOut } from '../controllers/authController';

const router = express.Router();

router.get('/', checkSession);
router.get('/logout', logOut);


export default router;