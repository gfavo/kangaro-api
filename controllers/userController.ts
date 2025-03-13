import { Request, Response } from "express";
import User from "../models/user";
import { NeonDbError } from "@neondatabase/serverless";
require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.json("Worked! - " + version);
  } catch (e) {
    res.json("Didnt work!");
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const userExists = await sql`SELECT COUNT(*) from "admins" WHERE "email" = ${data.email}`;
    console.log(userExists[0].count);
    if(userExists[0].count > 0) {
      throw new Error('Email already registered!');
    }
    const result = await sql`insert into
  "admins" ("id", "name", "password", "email")
values
  (default, ${data.name}, ${data.password}, ${data.email})`;
    res.json("Registered Sucessfully!");
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

