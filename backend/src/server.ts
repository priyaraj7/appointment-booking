import express, { Express, Request, Response } from "express";
import cors from "cors";
//import dotenv from "dotenv";
import "dotenv/config";
import allRouter from "./routes/routes";

//dotenv.config();

//import { db } from "../db/db-connection.js";
//backend/db/db-connection.js

import db from "./db/db-connection";

const app: Express = express();
const port = 5000;

// ----------------------------
// allow your Express server to use the cors middleware
// app.use(cors);
app.use(express.json());
// ----------------------------

app.get("/", (req: Request, res: Response) => {
  console.log("hehere");
  return res.send("Hello");
});

// get request
// app.get("/api/users", cors(), async (req: Request, res: Response) => {
//   try {
//     const { rows: users } = await db.query("SELECT * FROM users");
//     console.log("user:", users);
//     res.send(users);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ err });
//   }
// });

app.use("/api", allRouter);

app.listen(port, () => {
  //dotenv.config();
  console.log(process.env.DATABASE_URL);
  console.log(`⚡️[server]:server listening to the port ${port}`);
});
