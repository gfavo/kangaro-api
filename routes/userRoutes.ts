import express from 'express';
import { createOrganization, getUsers, logIn, verificateUser } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', createOrganization);
router.post('/login', logIn);
router.post('/verificateUser', verificateUser);



export default router;