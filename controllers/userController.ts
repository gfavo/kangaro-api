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
    const result = await sql`insert into
  "admins" ("id", "name", "password", "username")
values
  (default, ${data.name}, ${data.password}, ${data.username})`;
    res.json("Worked!");
  } catch (e) {
    res.json((e as NeonDbError).detail);
    console.log(e);
  }
};
