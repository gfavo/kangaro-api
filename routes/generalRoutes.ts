import express from 'express';
import { getStudents, getTeachers } from '../controllers/generalController';

const router = express.Router();

router.get('/teachers', getTeachers);
router.post('/students', getStudents);


export default router;