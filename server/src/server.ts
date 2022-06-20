import net from "net";
import fs from "fs";

class Server {
  private socket: net.Server;
  private database: { [key: string]: string };
  private address: string;
  private port: number;

  constructor({
    address,
    port,
    databasePath,
  }: {
    address: string;
    port: number;
    databasePath: string;
  }) {
    if (!address) {
      throw new Error("Address required!");
    }

    if (!port) {
      throw new Error("Port required!");
    }

    if (!databasePath) {
      throw new Error("Database path required!");
    }

    this.address = address;
    this.port = port;

    this.socket = net.createServer((socket) => {
      socket.on("data", (rawData) => {
        const data = rawData.toString();
        console.log("Message received: " + data);
        const ip: string | null = this.database[data];

        if (!ip) {
          socket.write("Url not found in database!");
        } else {
          socket.write(ip);
        }
      });
    });

    const rawDatabase = fs.readFileSync(databasePath, "utf-8");
    this.database = JSON.parse(rawDatabase);
  }

  start() {
    this.socket.listen(this.port, this.address, () => {
      console.log("Server started at " + this.address + ":" + this.port);
    });
  }
}

export default Server;
