import express from 'express';
import { checkSession } from '../controllers/authController';

const router = express.Router();

router.get('/', checkSession);


export default router;