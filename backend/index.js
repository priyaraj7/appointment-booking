const express = require("express");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

const port = process.env.PORT || "5000";

app.listen(port, () => {
  console.log(`Server Running at ${port} 🚀`);
});
