import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

const server = new Server({
  port: Number(process.env.SERVER_PORT),
  databasePath: process.env.DATABASE_PATH ?? "",
});

server.start();
