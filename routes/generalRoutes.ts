import express from 'express';
import { getTeachers } from '../controllers/generalController';

const router = express.Router();

router.get('/teachers', getTeachers);


export default router;