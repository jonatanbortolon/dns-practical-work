import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

const server = new Server({
  address: process.env.SERVER_ADDRESS ?? "",
  port: Number(process.env.SERVER_PORT),
  databasePath: process.env.DATABASE_PATH ?? "",
});

server.start();
