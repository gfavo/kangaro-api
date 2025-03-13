import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';


require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkSession = async (req: Request, res: Response) => {
try {
        const cookies = req.cookies;
        console.log(cookies);

        if(!cookies.token) res.status(403).json({ user: null });

        jwt.verify(cookies.token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.status(403).json({ user: null });
        res.json({ user: { email: decoded.email } }); 
    });
} catch(e) {
 }
}