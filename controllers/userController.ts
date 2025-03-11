import {Request, Response} from 'express';

export const getUsers = async (req: Request, res: Response) => {
    try {
        res.json('Worked!');
    } catch(e) {
        res.json('Didnt work!');
    }
    
};