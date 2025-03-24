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

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const salt = await bcrypt.genSalt();
    const encryptedPass = await bcrypt.hash(data.password, salt);
    const userExists =
      await sql`SELECT COUNT(*) from "users" WHERE "email" = ${data.email}`;
    console.log(userExists[0].count);
    if (userExists[0].count > 0) {
      throw new Error("Email already registered!");
    }
    const resultOrg = await sql`insert into "organizations" ("id", "name") values (default, ${data.organizationName}) RETURNING id`;
        
    const resultUser = await sql`insert into
  "users" ("id", "name", "password", "email", "role", "organization_id")
values
  (default, ${data.name}, ${encryptedPass}, ${data.email}, ${data.role}, ${resultOrg[0].id})`;
    res.json("Registered Sucessfully!");
  } catch (e) {
    res.status(400).json((e as Error).message);
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const data = req.body as User;
    const sqlUserData = await sql`SELECT "name", "organization_id", "email", "password" from "users" WHERE "email" = ${data.email}`;
    const user = sqlUserData[0] as User;


    if(!user) {
      throw new Error("User not found!");
    }
    if(!(await bcrypt.compare(data.password, user.password))) {
      throw new Error("Incorrect password!");
    }

    const sqlOrgData = await sql`SELECT "name" FROM "organizations" WHERE "id" = ${user.organization_id}`;
    const orgName = (sqlOrgData[0] as {name: string}).name;
    console.log(orgName);

    const token = jwt.sign({ email: user.email, role: user.role, organizationName: orgName, name: user.name }, JWT_SECRET, { expiresIn: "1h" });

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

