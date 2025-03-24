import express from 'express';
import { createOrganization, getUsers, logIn } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', createOrganization);
router.post('/login', logIn);


export default router;