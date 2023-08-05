import express from "express";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { getAllUsers } from "./db/schema";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect().then(() => console.log("connected"));
export const db: NodePgDatabase = drizzle(client);

app.listen(3002, () => {
  console.log("Server is running");
  getAllUsers().then((users) => console.log(users));
});
