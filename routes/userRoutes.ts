import express from 'express';
import { getUsers, logIn, postUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', postUser);
router.post('/login', logIn);


export default router;