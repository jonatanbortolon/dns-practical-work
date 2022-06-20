import dotenv from "dotenv";
import chalk from "chalk";
import Client from "./client";

dotenv.config();

async function run() {
  const client = new Client({
    port: Number(process.env.SERVER_PORT),
    serverAddress: process.env.SERVER_ADDRESS ?? "",
  });

  client.start();

  while (client.running) {
    try {
      const url = await client.readMessage();

      if (!url) {
        console.log(chalk.bold.red("Url invalid!"));
      }

      await client.sendMessage(url);
    } catch (error) {
      console.log(chalk.bold.red(error));
    } finally {
      await client.readEnd();
    }
  }
}

run();
