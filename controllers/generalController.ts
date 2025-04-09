import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";


require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);
const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string;

export const getTeachers = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    let role;
    let email;
    console.log(cookies);

    if (!cookies.token) res.status(403).json({ user: null });

    jwt.verify(cookies.token, JWT_SECRET, (err: any, decoded: any) => {
      role = decoded.role;
      email = decoded.email;
    });

    const orgId: number = ((await sql`SELECT "organization_id" FROM "users" WHERE email = ${email}`) as {organization_id: number}[])[0].organization_id;
    const teachers: User[] = (await sql`SELECT * FROM "users" WHERE "organization_id" = ${orgId} AND "role" = 'teacher'`) as User[];

    res.status(200).send(teachers);
  } catch (e) {}
};