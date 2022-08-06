import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const port = 5000;

// interface Request<
//   P = core.ParamsDictionary,
//   ResBody = any,
//   ReqBody = any,
//   ReqQuery = core.Query
// > extends core.Request<P, ResBody, ReqBody, ReqQuery> {}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`⚡️[server]:server listening to the port ${port}`);
});
