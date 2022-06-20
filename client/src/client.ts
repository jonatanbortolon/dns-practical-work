import prompts from "prompts";
import chalk from "chalk";
import asyncSocket from "../utils/asyncSocket";

class Client {
  running: boolean = false;
  private port: number;
  private serverAddress: string;

  constructor({
    port,
    serverAddress,
  }: {
    port: number;
    serverAddress: string;
  }) {
    if (!serverAddress) {
      throw new Error("Server address required!");
    }

    if (!port) {
      throw new Error("Port required!");
    }

    this.serverAddress = serverAddress;
    this.port = port;
  }

  start() {
    this.running = true;
  }

  async readMessage() {
    const response = await prompts({
      type: "text",
      name: "url",
      message: "Url to search",
    });

    return response.url;
  }

  async sendMessage(url: string) {
    const response = await asyncSocket(this.port, this.serverAddress, url);

    if (response === "Url not found in database!") {
      console.log(chalk.bold.red(response));
    } else {
      console.log(chalk.bold.green("Ip: " + response));
    }
  }

  async readEnd() {
    const response = await prompts({
      type: "select",
      name: "again",
      message: "Search again?",
      choices: [
        { title: "Yes", value: true },
        { title: "No", value: false },
      ],
    });

    this.running = response.again;
  }
}

export default Client;
