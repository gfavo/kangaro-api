import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';


require("dotenv").config();

const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);


const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string;

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
    const salt = await bcrypt.genSalt();
    const encryptedPass = await bcrypt.hash(data.password, salt);
    const userExists =
      await sql`SELECT COUNT(*) from "admins" WHERE "email" = ${data.email}`;
    console.log(userExists[0].count);
    if (userExists[0].count > 0) {
      throw new Error("Email already registered!");
    }
    const result = await sql`insert into
  "admins" ("id", "name", "password", "email")
values
  (default, ${data.name}, ${encryptedPass}, ${data.email})`;
    res.json("Registered Sucessfully!");
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const sqlData = await sql`SELECT "email", "password" from "admins" WHERE "email" = ${data.email}`;
    const user = sqlData[0] as User;

    if(!user) {
      throw new Error("User not found!");
    }
    if(!(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Incorrect password!");
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1m" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
  });

    res.json({message: "Logged-in Sucessfully!", token});
  } catch (e) {
    res.status(401).json((e as Error).message);
  }
};
